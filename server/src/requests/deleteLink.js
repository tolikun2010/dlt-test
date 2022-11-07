/* eslint-disable no-useless-escape */
import * as yup from 'yup';

export const DeleteLinkParams = yup.object().shape({
  userId: yup.string().required("User's id is required"),
});
