import * as Yup from 'yup';

const phoneRegExp = /^[+]{1}380([0-9]{9})$/;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg'];

export const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(60, 'Too Long!')
    .required('Name is required'),
  phone: Yup.string()
    .matches(
      phoneRegExp,
      'Phone number should be like in this example : +38-XXX-XXX-XX-XX ',
    )
    .required('Phone number is required'),
  email: Yup.string()
    .email('Invalid email')
    .max(100, 'Too Long!')
    .required('Email is required'),
  position_id: Yup.string().required('Position is required'),
  photo: Yup.mixed()
    .required('Photo is required')
    .test(
      'fileSize',
      'File size dhould not exceed 5MB',
      value => value && value.size <= 5000000,
    )
    .test(
      'fileType',
      'Photo should be only .jpg or .jpeg formats',
      value => value && SUPPORTED_FORMATS.includes(value.type),
    ),
});
