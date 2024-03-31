import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import signInImage from '../../../assets/sign_in_image.png'
import { useLoginMutation } from '../../../stores/auth/authAPI';

const LoginSchema = Yup.object().shape({
  usernameOrEmail: Yup.string()
    .required('Username or Email is required'),
  password: Yup.string()
    .required('Password is required')
});

const Login = () => {

	const [login, { isLoading: loginLoading, isSuccess: loginSuccessful, isError: loginError }] = useLoginMutation();


  const handleSubmit = async (values, { setSubmitting }) => {

	login(values);
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#2B2B2B]">
		{/* Image Section - hidden on small screens */}
		<div className="hidden md:block md:w-1/2 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${signInImage})` }}></div>

		{/* Form Section */}
		<div className="flex p-5 md:p-0 w-full h-full md:w-1/2 justify-center">
			<div className="w-full max-w-xs my-auto">
			{
				loginError && (
					<div className="w-full max-w-md px-6 py-8 my-auto">
						<div class="px-3 py-1 text-xs font-medium leading-none text-center text-red-800 bg-red-200 rounded-full animate-pulse dark:bg-red-900 dark:text-red-200">Error!</div>
						<h2 className="font-sans font-semibold text-white text-4xl md:text-5xl mb-4 md:mb-8">Login Failed</h2>
						<p className="font-sans text-white text-xl mb-6">
							There was an error logging you in. Please try again later.
						</p>
					</div>
				)
			}
			{
				loginLoading && (
					<div className="w-full max-w-md px-6 py-8 my-auto">
						<div class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">Loading!</div>
						<h2 className="font-sans font-semibold text-white text-4xl md:text-5xl mb-4 md:mb-8">Logging In</h2>
						<p className="font-sans text-white text-xl mb-6">
							Please wait while we log you in.
						</p>
					</div>
				)
			}
			<h2 className="font-sans font-semibold text-white text-4xl mb-4 md:mb-8 md:text-6xl">Sign In</h2>
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