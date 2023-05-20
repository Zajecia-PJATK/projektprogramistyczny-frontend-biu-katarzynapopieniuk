import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

export const SignupForm = () => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .min(2, 'Must be at least 2 characters')
                .max(15, 'Must be at most 15 characters')
                .required('Required'),
            lastName: Yup.string()
                .min(2, 'Must be at least 2 characters')
                .max(20, 'Must be at most 20 characters')
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .max(20, 'Must be at most 20 characters')
                .required('Password is required'),
            passwordConfirmation: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="firstName">First Name</label>
                            <input
                                id="firstName"
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                {...formik.getFieldProps('firstName')}
                                placeholder="First Name"
                            />
                            {formik.touched.firstName && formik.errors.firstName ? (
                                <div>{formik.errors.firstName}</div>
                            ) : null}
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <input id="lastName"
                                   type="text"
                                   className="block border border-grey-light w-full p-3 rounded mb-4"
                                   {...formik.getFieldProps('lastName')}
                                   placeholder="Last Name"/>
                            {formik.touched.lastName && formik.errors.lastName ? (
                                <div>{formik.errors.lastName}</div>
                            ) : null}
                        </div>
                        <div>
                            <label htmlFor="email">Email Address</label>
                            <input id="email"
                                   type="email"
                                   className="block border border-grey-light w-full p-3 rounded mb-4"
                                   {...formik.getFieldProps('email')}
                                   placeholder="Email"/>
                            {formik.touched.email && formik.errors.email ? (
                                <div>{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input id="password"
                                   type="password"
                                   className="block border border-grey-light w-full p-3 rounded mb-4"
                                   {...formik.getFieldProps('password')}
                                   placeholder="Password"/>
                            {formik.touched.password && formik.errors.password ? (
                                <div>{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <div>
                            <label htmlFor="passwordConfirmation">Confirm password</label>
                            <input id="passwordConfirmation"
                                   type="password"
                                   className="block border border-grey-light w-full p-3 rounded mb-4"
                                   {...formik.getFieldProps('passwordConfirmation')}
                                   placeholder="Confirm Password"/>
                            {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
                                <div>{formik.errors.passwordConfirmation}</div>
                            ) : null}
                        </div>

                        <button type="submit"
                                className="w-full text-center py-3 rounded bg-violet-600 text-white hover:bg-violet-800 focus:outline-none my-1">
                            Submit
                        </button>
                    </form>

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>

                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account?
                    <a className="no-underline border-b border-blue text-blue" href="../login/">
                        Log in
                    </a>.
                </div>
            </div>
        </div>
    );
};