import { useEffect, useState } from 'react';
import { fetchPositions, postUser } from '../../services';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import 'yup-phone';
import s from './PostForm.module.scss';

const phoneSchema = Yup.string().phone().required();
phoneSchema.isValid('+380123456789');

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(60, 'Too Long!')
    .required('Name is required'),
  phone: Yup.string()
    .phone(
      'UA',
      true,
      'Phone number should be like in this example : +38-XXX-XXX-XX-XX ',
    )
    .required('Phone is required'),
  email: Yup.string()
    .email('Invalid email')
    .max(100, 'Too Long!')
    .required('Email is required'),
  position_id: Yup.string().required('Position is required'),
  // photo: Yup.mixed().required('A file is required'),
  // .test('fileFormat', 'jpg/jpeg only', value => {
  //   console.log(value);
  //   return value && ['jpg/jpeg'].includes(value.type);
  // }),
});

export default function PostForm() {
  const [positions, setPositions] = useState();

  useEffect(() => {
    const asyncFetch = async () => {
      const {
        data: { positions },
      } = await fetchPositions();
      setPositions(positions);
    };
    asyncFetch();
  }, []);

  return (
    <section className={s.section}>
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
        onSubmit={(user, { resetForm }) => {
          // postUser(user);
        }}
      >
        {formik => (
          <Form>
            {/* {console.log(formik)} */}
            <div className={s.input_wrapper}>
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                className={s.input}
                // example how to customize
                // className={formik.errors.name ? s.input_invalid : s.input_valid}
                // example how to customize
              />
              <label htmlFor="name" className={s.custom_placeholder}>
                Your name
              </label>
              {formik.errors.name && (
                <div className={s.error_msg}>{formik.errors.name}</div>
              )}
            </div>
            <div className={s.input_wrapper}>
              <input
                id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.email}
                className={s.input}
              />
              <label htmlFor="email" className={s.custom_placeholder}>
                Email
              </label>
              {formik.errors.email && (
                <div className={s.error_msg}>{formik.errors.email}</div>
              )}
            </div>
            <div className={s.input_wrapper}>
              <input
                id="phone"
                name="phone"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.phone}
                className={s.input}
              />
              <label htmlFor="phone" className={s.custom_placeholder}>
                Phone
              </label>
              {formik.errors.phone ? (
                <div className={s.error_msg}>{formik.errors.phone}</div>
              ) : (
                <div className={s.phone_example}>+38 (XXX) XXX-XX-XX </div>
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
                      onChange={formik.handleChange}
                      className={s.position_input}
                    />
                    <span>{name}</span>
                  </label>
                ))}
              {formik.errors.position_id && (
                <div className={s.error_msg}>{formik.errors.position_id}</div>
              )}
            </div>
            <label className={s.file_label}>
              <input
                id="photo"
                name="photo"
                onChange={e => (formik.values.photo = e.target.files[0])}
                type="file"
                className={s.file_input}
              />
              <span className={s.file_custom}></span>
              {formik.errors.photo && (
                <div className={s.error_msg}>{formik.errors.photo}</div>
              )}
              {formik.values.photo && (
                <div className={s.error_msg}>{formik.values.photo.name}</div>
              )}
            </label>
            <div className={s.button_wrapper}>
              <button
                type="submit"
                className={s.button}
                disabled={!formik.isValid}
              >
                Sign up
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}
