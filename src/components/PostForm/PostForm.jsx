import { fetchPositions, postUser } from '../../services';
import SuccessSignup from './SuccessSignup';
import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import s from './PostForm.module.scss';

const phoneRegExp = /^[+]{1}380([0-9]{9})$/;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg'];

const SignupSchema = Yup.object().shape({
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

export default function PostForm() {
  const [positions, setPositions] = useState();
  const [isUserSignupSuccess, setIsUserSignupSuccess] = useState(false);

  useEffect(() => {
    const asyncFetch = async () => {
      const {
        data: { positions },
      } = await fetchPositions();
      setPositions(positions);
    };
    asyncFetch();
  }, []);

  const handleSubmit = user => {
    postUser(user).then(({ data }) => {
      if (data.success) setIsUserSignupSuccess(true);
    });
  };

  return (
    <>
      {!isUserSignupSuccess && (
        <section id="post_form" className={s.section}>
          <h2 className={s.title}>Working with POST request</h2>
          <Formik
            initialValues={{
              name: '',
              email: '',
              phone: '',
              position_id: '',
              photo: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              values,
              setFieldValue,
              errors,
              dirty,
              isValid,
            }) => (
              <Form className={s.form}>
                <div className={s.input_wrapper}>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={handleChange}
                    value={values.name}
                    autoComplete="off"
                    className={errors.name ? s.input_invalid : s.input}
                  />
                  <label htmlFor="name" className={s.custom_placeholder}>
                    Your name
                  </label>
                  {errors.name && (
                    <div className={s.error_msg}>{errors.name}</div>
                  )}
                </div>
                <div className={s.input_wrapper}>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    onChange={handleChange}
                    value={values.email}
                    className={errors.email ? s.input_invalid : s.input}
                    autoComplete="off"
                  />
                  <label htmlFor="email" className={s.custom_placeholder}>
                    Email
                  </label>
                  {errors.email && (
                    <div className={s.error_msg}>{errors.email}</div>
                  )}
                </div>
                <div className={s.input_wrapper}>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    onChange={handleChange}
                    value={values.phone}
                    className={errors.phone ? s.input_invalid : s.input}
                    autoComplete="off"
                  />
                  <label htmlFor="phone" className={s.custom_placeholder}>
                    Phone
                  </label>
                  {errors.phone ? (
                    <div className={s.error_msg}>{errors.phone}</div>
                  ) : (
                    !dirty && (
                      <div className={s.phone_example}>
                        +38 (XXX) XXX-XX-XX{' '}
                      </div>
                    )
                  )}
                </div>
                <h3 className={s.position_title}>Select your position</h3>
                <div className={s.position_wrapper}>
                  {positions &&
                    positions.map(({ id, name }) => (
                      <label key={id} className={s.position_label}>
                        <input
                          type="radio"
                          name="position_id"
                          value={id}
                          onChange={handleChange}
                          className={s.position_input}
                        />
                        <span>{name}</span>
                      </label>
                    ))}
                  {errors.position_id && (
                    <div className={s.error_msg}>{errors.position_id}</div>
                  )}
                </div>
                <label className={s.file_label}>
                  <input
                    id="photo"
                    name="photo"
                    onChange={e => {
                      setFieldValue('photo', e.target.files[0]);
                    }}
                    type="file"
                    className={s.file_input}
                  />
                  <div className={s.download_wrapper}>
                    <span className={s.download_btn}>Upload</span>
                    <span className={s.download_txt}>
                      {values.photo ? values.photo.name : 'Upload your photo'}
                    </span>
                  </div>
                  {errors.photo && (
                    <div className={s.photo_error_msg}>{errors.photo}</div>
                  )}
                </label>
                <div className={s.button_wrapper}>
                  <button
                    type="submit"
                    className={s.button}
                    disabled={!dirty || !isValid}
                  >
                    Sign up
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </section>
      )}
      {isUserSignupSuccess && <SuccessSignup />}
    </>
  );
}
