import { useEffect, useState } from 'react';
import { fetchPositions, postUser } from '../../services';
import { Formik, Form } from 'formik';
import './PostForm.scss';

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
    <section className="post-form-section">
      <h2>Working with POST request</h2>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          position_id: '',
          photo: '',
        }}
        onSubmit={(user, { resetForm }) => {
          // postUser(user);
        }}
      >
        {formik => (
          <Form>
            <input
              id="name"
              name="name"
              placeholder="Name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <input
              id="email"
              name="email"
              placeholder="Email"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <input
              id="phone"
              name="phone"
              placeholder="Phone"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            <h3>Select your position</h3>
            {positions &&
              positions.map(({ id, name }) => (
                <label key={id}>
                  <input
                    type="radio"
                    name="position_id"
                    value={(formik.values.position_id = id)}
                    onChange={formik.handleChange}
                  />
                  {name}
                </label>
              ))}
            <label>
              <input
                id="photo"
                name="photo"
                onChange={e => (formik.values.photo = e.target.files[0])}
                type="file"
              />
            </label>
            <button type="submit"> Sign up </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}
