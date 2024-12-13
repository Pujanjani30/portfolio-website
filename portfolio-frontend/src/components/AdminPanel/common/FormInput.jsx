import React from "react";
import { Field, ErrorMessage } from "formik";

const FormInput = ({
  label,
  name,
  type = "text",
  value,
  labelStyle = "",
  className = "",
  ...rest
}) => {
  return (
    <div className="flex-1">
      <label htmlFor={name} className={`block text-sm font-medium ${labelStyle}`}>
        {label}
      </label>
      <Field
        name={name}
        type={type}
        value={value}
        className={`mt-1 block w-full px-4 py-2 text-sm border border-gray-300 
          rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
           text-black ${className}`}
        {...rest}
      />
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
};

export default FormInput;
