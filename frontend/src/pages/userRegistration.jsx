import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const RegistrationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
  legalIdNo: Yup.string()
    .required('Legal ID No. is required')
});

const Registration = () => {

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:3000/register', values);
      console.log(response.data);
      // TODO:
      // handle success
      // Redirect to login or another page
      // this.props.history.push('/login'); // If using React Router
    } catch (error) {
      console.error('Registration error', error);
      // handle error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert('Error: ' + error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        alert('Network error, please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        alert('Error:', error.message);
      }
    }

    setSubmitting(false);
  };

  return (
    <div>
      <h2>Registration</h2>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          legalIdNo: ''
        }}
        validationSchema={RegistrationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              {/* <label>Full Name:</label> */}
              <Field type="text" name="fullName" placeholder="Full Name" />
              <ErrorMessage name="fullName" component="div" />
            </div>
            <div>
              {/* <label>Email:</label> */}
              <Field type="email" name="email" placeholder="Email Address" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              {/* <label>Password:</label> */}
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <div>
              {/* <label>Confirm Password:</label> */}
              <Field type="password" name="confirmPassword" placeholder="Confirm Password" />
              <ErrorMessage name="confirmPassword" component="div" />
            </div>
            <div>
              {/* <label>Legal ID No.:</label> */}
              <Field type="text" name="legalIdNo" placeholder="Legal ID No" />
              <ErrorMessage name="legalIdNo" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registration;