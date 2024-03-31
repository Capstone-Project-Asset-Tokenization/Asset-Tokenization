import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import signUpImage from '../../../assets/sign_in_image.png'
import { useRegisterMutation } from '../../../stores/auth/authAPI';

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


	const [register, { isLoading: registerationLoading, isSuccess: registerationSucess, isError: registerationError }] = useRegisterMutation();

	const handleSubmit = async (values, { setSubmitting }) => {
		register(values);
		setSubmitting(false);
	};
	console.log(registerationSucess, registerationError, registerationLoading);

	return (
		<div className="flex flex-col md:flex-row h-screen bg-[#2B2B2B]">
			{/* Image Section */}
			<div className="hidden md:block md:w-1/2 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${signUpImage})` }}></div>

			{/* Form Section */}
			<div className="flex p-5 md:p-0 w-full h-full md:w-1/2 justify-center">

				{
					registerationSucess && (
						<div className="w-full max-w-md px-6 py-8 my-auto">
							<div class="px-3 py-1 text-xs font-medium leading-none text-center text-green-800 bg-green-200 rounded-full animate-pulse dark:bg-green-900 dark:text-green-200">Success!</div>
							<h2 className="font-sans font-semibold text-white text-4xl md:text-5xl mb-4 md:mb-8">Account Created</h2>
							<p className="font-sans text-white text-xl mb-6">
								Your account has been created successfully. Please check your email to verify your account.
							</p>
						</div>
					)
				}
				{
					registerationError && (
						<div className="w-full max-w-md px-6 py-8 my-auto">
							<div class="px-3 py-1 text-xs font-medium leading-none text-center text-red-800 bg-red-200 rounded-full animate-pulse dark:bg-red-900 dark:text-red-200">Error!</div>
							<h2 className="font-sans font-semibold text-white text-4xl md:text-5xl mb-4 md:mb-8">Account Creation Failed</h2>
							<p className="font-sans text-white text-xl mb-6">
								There was an error creating your account. Please try again later.
							</p>
						</div>
					)
				}
				{
					registerationLoading && (
						<div class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
					)
				}
				<div className="w-full max-w-md px-6 py-8 my-auto">
					<h2 className="font-sans font-semibold text-white text-4xl md:text-5xl mb-4 md:mb-8">Create Account</h2>
					<p className="font-sans text-white text-xl mb-6">
						Welcome! enter your details and start creating, collecting and selling NFTs.
					</p>
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
							<Form className="bg-transparent">
								<div className="mb-4">
									<Field
										type="text"
										name="fullName"
										placeholder="Full Name"
										className="appearance-none bg-transparent border border-[#494949] rounded-2xl w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-blue-500"
									/>
									<ErrorMessage name="fullName" component="div" className="text-red-500 text-xs italic" />
								</div>

								<div className="mb-4">
									<Field
										type="email"
										name="email"
										placeholder="Email Address"
										className="appearance-none bg-transparent border border-[#494949] rounded-2xl w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-blue-500"
									/>
									<ErrorMessage name="email" component="div" className="text-red-500 text-xs italic" />
								</div>

								<div className="mb-4">
									<Field
										type="password"
										name="password"
										placeholder="Password"
										className="appearance-none bg-transparent border border-[#494949] rounded-2xl w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-blue-500"
									/>
									<ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
								</div>

								<div className="mb-4">
									<Field
										type="password"
										name="confirmPassword"
										placeholder="Confirm Password"
										className="appearance-none bg-transparent border border-[#494949] rounded-2xl w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-blue-500"
									/>
									<ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs italic" />
								</div>

								<div className="mb-6">
									<Field
										type="text"
										name="legalIdNo"
										placeholder="Legal ID No"
										className="appearance-none bg-transparent border border-[#494949] rounded-2xl w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-blue-500"
									/>
									<ErrorMessage name="legalIdNo" component="div" className="text-red-500 text-xs italic" />
								</div>

								<button
									type="submit"
									disabled={isSubmitting}
									className="w-full bg-[#A259FF] hover:bg-[#b06af9] text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
								>
									Register
								</button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default Registration;
