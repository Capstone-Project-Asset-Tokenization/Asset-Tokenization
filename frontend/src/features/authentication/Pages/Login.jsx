import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import signInImage from '../../../assets/sign_in_image.png'

const LoginSchema = Yup.object().shape({
  usernameOrEmail: Yup.string()
    .required('Username or Email is required'),
  password: Yup.string()
    .required('Password is required')
});

const Login = () => {

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
    //   const response = await axios.post('http://localhost:3000/login', values);
      console.log(values);
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
    <div className="flex h-screen bg-[#2B2B2B]">
		{/* Image Section */}
		<div className="w-1/2 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${signInImage})` }}></div>

		{/* Form Section */}
		<div className="flex items-center justify-center w-1/2">
			<div className="w-full max-w-xs">
			<h2 className="font-sans font-semibold text-white text-6xl mb-8">Sign In</h2>
			<p className="font-sans text-white text-xl">Welcome back!</p>
			<Formik
				initialValues={{ usernameOrEmail: '', password: '' }}
				validationSchema={LoginSchema}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting }) => (
				<Form className="bg-transparent pt-6 pb-8 mb-4">
					<div className="mb-4">
					<Field 
						type="text" 
						name="usernameOrEmail" 
						placeholder="Username / Email" 
						className="appearance-none bg-transparent border border-[#494949] rounded-2xl w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-blue-500"
					/>
					<ErrorMessage name="usernameOrEmail" component="div" className="text-red-500 text-xs italic" />
					</div>
					<div className="mb-6">
					<Field 
						type="password" 
						name="password" 
						placeholder="Password" 
						className="appearance-none bg-transparent border border-[#494949] rounded-2xl w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-blue-500"
					/>
					<ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
					</div>
					<div className="flex items-center justify-between">
					<button 
						type="submit" 
						disabled={isSubmitting}
						className="w-full bg-[#A259FF] hover:bg-[#b06af9] text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
					>
						Login
					</button>
					</div>
				</Form>
				)}
			</Formik>
			</div>
		</div>
	</div>

  );
};

export default Login;