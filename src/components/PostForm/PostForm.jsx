import { fetchPositions, postUser } from '../../services';
import SuccessSignup from './SuccessSignup';
import Input from './Input';
import RadioButtons from './RadioButtons/';
import { SignupSchema } from './Yup.schema';
import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import s from './PostForm.module.scss';
import { toast } from 'react-toastify';

export default function PostForm({
  onSubmitSuccess,
  setIsLoading,
  isDisabled,
}) {
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

  const handleSubmit = async user => {
    setIsLoading(true);
    try {
      const { data } = await postUser(user);
      if (data.success) {
        setIsUserSignupSuccess(true);
        onSubmitSuccess();
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
    setIsLoading(false);
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
                <Input
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                  error={errors.name}
                  labelText="Your name"
                />
                <Input
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  error={errors.email}
                  labelText="Email"
                />
                <Input
                  name="phone"
                  onChange={handleChange}
                  value={values.phone}
                  error={errors.phone}
                  labelText="Phone"
                />
                {!dirty && !errors.phone && (
                  <div className={s.phone_example}>+38 (XXX) XXX-XX-XX</div>
                )}
                <h3 className={s.position_title}>Select your position</h3>
                {positions && (
                  <RadioButtons
                    positions={positions}
                    onChange={handleChange}
                    error={errors.position_id}
                  />
                )}
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
                    disabled={!dirty || !isValid || isDisabled}
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
