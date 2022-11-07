/* eslint-disable no-useless-escape */
import * as yup from 'yup';

export const CreateLinkBody = yup.object().shape({
  fullUrl: yup.string().required('Original URL is required').matches(
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
    'Original URL field must contain only URL',
  ),
  subpart: yup.string().optional().length(7).matches(
    /^[A-Za-z0-9]+$/,
    'Subpart must contain only numbers and latin letters',
  ),
});

export const CreateLinkParams = yup.object().shape({
  userId: yup.string().required("User's id is required"),
});
