import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { getHomeDetails, updateHomeDetails } from '../../../api/api.js';

function HomeAdmin() {
  const [initialData, setInitialData] = useState({
    name: "",
    position: "",
    email: "",
    profilePic: null,
    resume: null,
    socials: [{ label: "GitHub", url: "" }, { label: "LinkedIn", url: "" }],
  });

  const [isChanged, setIsChanged] = useState(false);

  // Fetch initial data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHomeDetails();
        setInitialData({
          ...data,
          socials: data.socials || [{ label: "GitHub", url: "" }, { label: "LinkedIn", url: "" }],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    position: Yup.string().required("Position is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    profilePic: Yup.mixed().nullable(),
    resume: Yup.mixed().nullable().required("Resume is required"),
    socials: Yup.array().of(
      Yup.object().shape({
        label: Yup.string().required("Label is required"),
        url: Yup.string().url("Invalid URL").required("URL is required"),
      })
    ),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("position", values.position);
      formData.append("email", values.email);
      if (values.profilePic)
        formData.append("profilePic", values.profilePic);
      if (values.resume)
        formData.append("resume", values.resume);
      formData.append("socials", JSON.stringify(values.socials));

      await updateHomeDetails(formData); // Update home details using the provided API function
      setIsChanged(false); // Reset form change status after successful submit
    } catch (error) {
      console.error("Error updating home details:", error);
    } finally {
      setSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-zinc-900 text-white rounded-lg shadow-lg min-h-screen flex flex-col">
      <h1 className="text-3xl font-semibold mb-6">Edit Home Page Details</h1>

      <Formik
        enableReinitialize
        initialValues={initialData}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting, dirty, resetForm }) => {
          useEffect(() => {
            setIsChanged(dirty); // Update isChanged state based on dirty
          }, [dirty]);

          const cancelChanges = () => {
            resetForm({ values: initialData });
          };

          return (
            <Form className="space-y-6 flex-grow">
              {/* Name and Position */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <Field
                    name="name"
                    type="text"
                    className="mt-1 block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex-1">
                  <label htmlFor="position" className="block text-sm font-medium">
                    Position
                  </label>
                  <Field
                    name="position"
                    type="text"
                    className="mt-1 block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                  <ErrorMessage name="position" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="mt-1 block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Profile Picture and Resume in One Row */}
              <div className="flex gap-6">
                {/* Profile Picture */}
                <div className="flex-1">
                  <label htmlFor="profilePic" className="block text-sm font-medium">
                    Profile Picture
                  </label>
                  {values.profilePic ? (
                    <div className="mt-1">
                      <img
                        src={values.profilePic}
                        alt="Profile Preview"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <p className="text-blue-500 mt-2">
                        <a href={values.profilePic} target="_blank" rel="noopener noreferrer">
                          View Profile Picture
                        </a>
                      </p>
                      <div className="flex gap-4 mt-2">
                        <button
                          type="button"
                          onClick={() => setFieldValue("profilePic", null)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          Remove
                        </button>
                        <button
                          type="button"
                          // onClick={() => }
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  ) : (
                    <input
                      id="profilePic"
                      name="profilePic"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setFieldValue("profilePic", file);
                      }}
                      className="mt-1 block w-full text-sm border border-gray-300 rounded-lg file:border-0 file:px-4 file:py-2 file:bg-blue-500 file:text-white focus:outline-none"
                    />
                  )}
                </div>

                {/* Resume */}
                <div className="flex-1">
                  <label htmlFor="resume" className="block text-sm font-medium">
                    Resume (PDF)
                  </label>
                  {values.resume ? (
                    <div className="mt-1">
                      <p className="text-blue-500 mt-2">
                        <a href={values.resume} target="_blank" rel="noopener noreferrer">
                          View Resume
                        </a>
                      </p>
                      <div className="flex gap-4 mt-2">
                        {/* <button
                          type="button"
                          onClick={() => setFieldValue("resume", null)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          Remove
                        </button> */}
                        <button
                          type="button"
                          onClick={() => document.getElementById("resume").click()}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  ) : (
                    <input
                      id="resume"
                      name="resume"
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setFieldValue("resume", file);
                      }}
                      className="mt-1 block w-full text-sm border border-gray-300 rounded-lg file:border-0 file:px-4 file:py-2 file:bg-blue-500 file:text-white focus:outline-none"
                    />
                  )}
                  <ErrorMessage name="resume" component="div" className="text-red-500 text-sm" />
                </div>
              </div>


              {/* Social Links */}
              <div>
                <h3 className="text-xl font-semibold pb-3">Social Links</h3>
                <FieldArray name="socials">
                  {({ remove, push }) => (
                    <div>
                      {values.socials.map((social, index) => (
                        <div key={index} className="flex items-center gap-4 mb-4">
                          <Field
                            name={`socials[${index}].label`}
                            placeholder="Label (e.g., GitHub)"
                            className="px-4 py-2 text-sm border border-gray-300 rounded-lg flex-1 text-black"
                          />
                          <Field
                            name={`socials[${index}].url`}
                            placeholder="URL"
                            className="px-4 py-2 text-sm border border-gray-300 rounded-lg flex-1 text-black"
                          />
                          <button
                            type="button"
                            onClick={() => setFieldValue("profilePic", null)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push({ label: "", url: "" })}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        + Add Link
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                {isChanged && <button
                  type="button"
                  onClick={() => cancelChanges()}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 mr-4"
                >
                  Cancel
                </button>}
                <button
                  type="submit"
                  className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isChanged || isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={!isChanged || isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default HomeAdmin;
