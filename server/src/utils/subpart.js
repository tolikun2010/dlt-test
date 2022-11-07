export function generateSubpart() {
  let subpart = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 7; i++) {
    subpart += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return subpart;
}

export async function generateUniqueSubpart(Model) {
  let isSubPartUnique = false;
  let subpart;
  while (!isSubPartUnique) {
    subpart = generateSubpart();
    // eslint-disable-next-line no-await-in-loop
    const link = await Model.findOne({
      subpart,
    });
    if (!link) isSubPartUnique = true;
  }
  return subpart;
}
