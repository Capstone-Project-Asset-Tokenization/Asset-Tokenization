import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LoginSchema = Yup.object().shape({
  usernameOrEmail: Yup.string()
    .required('Username or Email is required'),
  password: Yup.string()
    .required('Password is required')
});

const Login = () => {

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:3000/login', values);
      console.log(response.data);
      // TODO:
      // handle success redirect
    } catch (error) {
      console.error('Login error', error);
      if (error.response && error.response.status === 401) {
        // Handle invalid credentials
        alert('Invalid username or password');
      } else {
        // Handle other kinds of errors
        alert('An error occurred. Please try again later.');
      }
    }

    setSubmitting(false);
  };

  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={{
          usernameOrEmail: '',
          password: ''
        }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Username/Email:</label>
              <Field type="text" name="usernameOrEmail" placeholder="Enter your username or email" />
              <ErrorMessage name="usernameOrEmail" component="div" />
            </div>
            <div>
              <label>Password:</label>
              <Field type="password" name="password" placeholder="Enter your password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;