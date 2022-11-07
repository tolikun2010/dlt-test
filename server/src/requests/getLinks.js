/* eslint-disable no-useless-escape */
import * as yup from 'yup';

export const GetLinksParams = yup.object().shape({
  userId: yup.string().required("User's id is required"),
  isChanged: yup.boolean(),
});
