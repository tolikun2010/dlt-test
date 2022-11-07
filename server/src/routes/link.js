import { Router } from 'express';
import { wrap } from '../utils';
import { validateRequest } from '../middlewares';
import { linkController } from '../controllers';
import {
  GetLinksParams, CreateLinkParams,
  CreateLinkBody, DeleteLinkParams,
} from '../requests';

const linkRouter = Router();

// get all links by userId
linkRouter.get(
  '/',
  validateRequest(null, { query: GetLinksParams }),
  wrap(async (req, res) => {
    const result = await linkController.getLinks(req.query.userId, req.query.isChanged);
    res.status(200).json(result);
  }),
);

// redirect by subpart
linkRouter.get(
  '/:subpart',
  wrap(async (req, res) => {
    const result = await linkController.redirectByLink(req.params.subpart);
    res.status(200).redirect(result);
  }),
);

// create new link
linkRouter.post(
  '/',
  validateRequest(CreateLinkBody, { query: CreateLinkParams }),
  wrap(async (req, res) => {
    const result = await linkController.createLink(req.body, req.query.userId);
    res.status(201).json(result);
  }),
);

// delete link by its subpart and userId
linkRouter.delete(
  '/:subpart',
  validateRequest(null, { query: DeleteLinkParams }),
  wrap(async (req, res) => {
    await linkController.deleteLink(req.params.subpart, req.query.userId);
    res.status(200).json({ success: true });
  }),
);
export { linkRouter };
