import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full max-w-sm bg-black p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Login</h2>
      
      <div className="mb-4">
        <label htmlFor="username" className="block text-white font-semibold mb-2">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white ${
            formik.touched.username && formik.errors.username ? 'border-red-600 border' : ''
          }`}
          placeholder="Enter your username"
        />
        {formik.touched.username && formik.errors.username && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.username}</p>
        )}
      </div>
      
      <div className="mb-6">
        <label htmlFor="password" className="block text-white font-semibold mb-2">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white ${
            formik.touched.password && formik.errors.password ? 'border-red-600 border' : ''
          }`}
          placeholder="Enter your password"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
        )}
      </div>
      
      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transform hover:scale-105 transition duration-200"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
