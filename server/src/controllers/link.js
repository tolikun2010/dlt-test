import { BadRequest } from 'http-errors';
import { ErrorMessages, TimeConstants } from '../constants';
import { doesUrlExist, generateUniqueSubpart } from '../utils';
import { Redis as redisClient } from '../services';
import Link from '../schemas/link';

async function getLinks(userId, isChanged) {
  let links;
  // get links from db and set it to hash
  if (isChanged) {
    links = await Link.find({ userId });
    // and set list to hash
    // expiration is set to 10 min
    await redisClient.set(
      `links of ${userId}`,
      JSON.stringify(links),
      { EX: TimeConstants.redisExp },
    );
  } else if (isChanged === false) {
  // or get cashed links from redis by userId
    links = JSON.parse(await redisClient.get(`links of ${userId}`));
  }
  return links;
}

async function redirectByLink(subpart) {
  const link = await Link.findOne({
    subpart,
  });
  return link.fullUrl;
}

async function createLink({ fullUrl, subpart }, userId) {
  // check if entered url exists
  const exists = await doesUrlExist(fullUrl);
  if (!exists) throw new BadRequest(ErrorMessages.no_response_from_url);
  // check if entered subpart is unique
  if (subpart) {
    const link = await Link.findOne({
      subpart,
    });
    if (link) throw new BadRequest(ErrorMessages.subpart_already_exists);
  } else {
    // generate unique subpart (if not entered)
    subpart = await generateUniqueSubpart(Link);
  }
  // create new link
  const newLink = new Link({
    userId,
    fullUrl,
    subpart,
    createdAt: new Date(),
  });
  newLink.save();

  return newLink;
}

async function deleteLink(subpart, userId) {
  // delete link by subpart
  const link = Link.deleteOne({ subpart, userId });
  return link;
}

export {
  getLinks,
  redirectByLink,
  createLink,
  deleteLink,
};
