import React from "react";
import { ErrorMessage } from "formik";
import { confirmAlert } from "../../../utils/alert.js";

const FileUploadField = ({
  label,
  name,
  value,
  initialValue,
  isUpdating,
  setIsUpdating,
  setFieldValue,
  accept,
  showRemoveButton = false,
}) => {
  return (
    <div className="flex-1">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      {value && !isUpdating ? (
        <div className="mt-1">
          {accept.startsWith("image/") ? (
            <img
              src={value}
              alt={`${label} Preview`}
              className="w-32 h-32 object-cover rounded-lg mt-2"
            />
          ) : null}
          <p className="text-blue-500 mt-2">
            <a href={value} target="_blank" rel="noopener noreferrer">
              View {label}
            </a>
          </p>
          <div className="flex gap-4 mt-2">
            <button
              type="button"
              onClick={() => setIsUpdating(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Update
            </button>
            {showRemoveButton && (
              <button
                type="button"
                onClick={async () => {
                  const confirm = await confirmAlert(
                    `Are you sure you want to remove the ${label.toLowerCase()}?`
                  );
                  if (confirm.isConfirmed) {
                    setFieldValue(name, "");
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-1">
          <input
            id={name}
            name={name}
            type="file"
            accept={accept}
            onChange={(e) => {
              const file = e.target.files[0];
              setFieldValue(name, file);
            }}
            className="mt-1 block w-full text-sm border border-gray-300 rounded-lg file:border-0 file:px-4 file:py-2 file:bg-blue-500 file:text-white focus:outline-none mb-2"
          />
          {isUpdating ? (
            <button
              type="button"
              onClick={() => {
                setIsUpdating(false);
                setFieldValue(name, initialValue);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Cancel
            </button>
          ) : null}
        </div>
      )}
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
};

export default FileUploadField;
