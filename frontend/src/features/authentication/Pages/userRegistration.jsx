import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import signUpImage from '../../../assets/sign_in_image.png'
import { useRegisterMutation } from '../../../stores/auth/authAPI';
import { useNavigate } from 'react-router-dom';
import ConnectWallet from './ConnectWalet';

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

	let navigate = useNavigate();

	let [section, setSection] = React.useState(0);
	let [walletAddress, setWalletAddress] = React.useState(null);
	let [values, setValues] = React.useState(null);



	const [register, { isLoading: registerationLoading, isSuccess: registerationSucess, isError: registerationError, error: registratonErrorResponse }] = useRegisterMutation();

	const handleProfileSubmit = async (values, { setSubmitting }) => {
		setSection(1);
		setValues(values);
	};

	const handleSbumit = (wallet) => {
		delete values.confirmPassword
		register({ ...values, walletId: wallet });
	};

	const handleBack = () => {
		setSection(0);
	};

	if (registerationSucess) {
		navigate("/signin");
	}
	return (
		<div className=''>

			<div className='mx-4 md:mx-32 mt-16 '>

				<ol class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base ">
					{
						section == 0 ? (
							<li class="flex items-center md:w-full sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">

								<span class="me-2">1</span>
								Personal <span class="hidden sm:inline-flex sm:ms-2">Info</span>
							</li>) :
							<li class="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
								<span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
									<svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
										<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
									</svg>
									Personal <span class="hidden sm:inline-flex sm:ms-2">Info</span>
								</span>
							</li>
					}
					<li class="flex items-center">
						<span class="me-2">2</span>
						Wallet
					</li>
				</ol>
			</div>


			{section == 0 && <div className="flex flex-col md:flex-row h-screen bg-[#2B2B2B]">

				{/* Image Section */}
				<div className="hidden md:block md:w-1/2 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${signUpImage})` }}></div>

				{/* Form Section */}
				<div className="flex p-5 md:p-0 w-full h-full md:w-1/2 justify-center">

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
							onSubmit={handleProfileSubmit}
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
										disabled={registerationLoading}
										className="w-full bg-[#A259FF] hover:bg-[#b06af9] text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
									>
										{
											registerationLoading ? "Registering..." : "Next"
										}
									</button>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>}

			{
				section == 1 && <div>

					<ConnectWallet handleback={handleBack} handleSubmit={handleSbumit} setWallet={setWalletAddress} ></ConnectWallet>
				</div>
			}

			{
				registerationError && (
					<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center mx-4 md:mx-32" role="alert">
						<span class="font-medium">Registration Failed!</span> {registratonErrorResponse.data}.
					</div>
				)
			}

			{
				registerationLoading && (
					<div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 text-center mx-4 md:mx-32" role="alert">
						<span class="font-medium">Registering user...</span>
					</div>
				)
			}
		</div>
	);
};

export default Registration;
