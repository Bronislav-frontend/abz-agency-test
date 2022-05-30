import { useGetPositionsQuery, useAddUserMutation } from '../../redux';
import { Formik, Form } from 'formik';
import './PostForm.scss';

export default function PostForm() {
  const { data, isLoading } = useGetPositionsQuery();
  const [addUser, { isError }] = useAddUserMutation();

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Error</h2>;

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
        onSubmit={async values => {
          if (values) {
            await addUser(values).unwrap();
          }
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
            {data.positions.map(({ id, name }) => (
              <label key={id}>
                <input
                  type="radio"
                  name="position_id"
                  value={id}
                  onChange={formik.handleChange}
                />
                {name}
              </label>
            ))}
            <label>
              <input
                id="photo"
                name="photo"
                value={formik.values.photo}
                onChange={formik.handleChange}
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
