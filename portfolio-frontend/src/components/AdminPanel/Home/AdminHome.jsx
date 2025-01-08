// React and related hooks
import React, { useState, useEffect } from "react";

// External packages
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// API calls
import { getHomeDetails, updateHomeDetails } from '../../../api/index.js';

// Validation schema
import { HomeAdminValidationSchema } from "../../../schemas/validationSchemas.js";

// utils
import { confirmAlert, successAlert, errorAlert } from '../../../utils/alert.js';
import { socialIcons } from '../../../utils/icons.js';

// Common components
import { FileUploadField, FormInput } from "../common/index.js";
import { Loading } from '../../common/index.js';

function AdminHome() {
  const [initialData, setInitialData] = useState({
    name: "",
    position: "",
    email: "",
    profilePic: null,
    resume: null,
    socials: [
      { label: "GitHub", url: "", icon: socialIcons.faGithub },
      { label: "LinkedIn", url: "", icon: socialIcons.faLinkedin }
    ],
  });
  const [loading, setLoading] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
  const [isUpdatingProfilePic, setIsUpdatingProfilePic] = useState(false);
  const [isUpdatingResume, setIsUpdatingResume] = useState(false);

  const iconOptions = Object.keys(socialIcons).map(iconKey => ({
    value: iconKey,
    label: (
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={socialIcons[iconKey]} className="mr-2" />
        {iconKey.replace('fa', '')}
      </div>
    )
  }));

  // Fetch initial data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHomeDetails();
        setInitialData({
          ...data,
          socials: data.socials || [
            { label: "GitHub", url: "", icon: socialIcons.faGithub },
            { label: "LinkedIn", url: "", icon: socialIcons.faLinkedin }
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        errorAlert("Error fetching data.");
        setLoading(false);
      }
    };
    fetchData();
  }, [initialData.profilePic, initialData.resume]);

  if (loading) {
    return <Loading />;
  }

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const filteredSocials = values.socials.filter(
        social => social.label.trim() !== '' && social.url.trim() !== ''
      );

      const confirm = await confirmAlert("Are you sure you want to save changes?");
      if (!confirm.isConfirmed) return;

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("position", values.position);
      formData.append("email", values.email);

      // Handling profile picture
      if (values.profilePic instanceof File) {
        formData.append("profilePic", values.profilePic);
      } else if (values.profilePic) {
        formData.append("profilePic", values.profilePic); // Existing URL
      } else {
        formData.append("profilePic", ""); // Explicitly indicate removal
      }

      // Handling resume
      if (values.resume instanceof File) {
        formData.append("resume", values.resume);
      } else if (values.resume) {
        formData.append("resume", values.resume); // Existing URL
      }
      formData.append("socials", JSON.stringify(values.socials));

      const updatedData = await updateHomeDetails(formData); // Update home details using the provided API function

      setInitialData(updatedData); // Update initialData with the updated values
      setIsChanged(false); // Reset form change status after successful submit
      setIsUpdatingProfilePic(false); // Reset profile picture update status
      setIsUpdatingResume(false); // Reset resume update status

      // Update initialData with the submitted values
      setInitialData(prevData => ({
        ...values,
        socials: filteredSocials
      }));

      successAlert("Saved changes successfully!");
    } catch (error) {
      errorAlert("An error occurred! Please try again.");
    } finally {
      setSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-zinc-900 text-white rounded-lg shadow-lg min-h-screen flex flex-col">
      <h1 className="lg:text-3xl text-xl font-semibold mb-6">Home Page</h1>

      <Formik
        enableReinitialize
        initialValues={initialData}
        validationSchema={HomeAdminValidationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={true}
      >
        {({ values, setFieldValue, isSubmitting, dirty, resetForm }) => {
          useEffect(() => {
            // Check if form data has changed
            const isFormChanged = Object.keys(initialData).some(key => {
              if (key === 'socials') {
                return JSON.stringify(initialData[key]) !== JSON.stringify(values[key]);
              }
              return initialData[key] !== values[key];
            });

            setIsChanged(isFormChanged);
          }, [values, initialData, dirty]);

          const cancelChanges = () => {
            resetForm({ values: initialData });
            setIsChanged(false);
          };

          return (
            <Form className="space-y-6 flex-grow">
              {/* Name, Position and Email */}
              <div className="flex flex-col md:flex-row gap-4">
                <FormInput label="Name" name="name" type="text" value={values.name} />
                <FormInput label="Position" name="position" type="text" value={values.position} />
                <FormInput label="Email" name="email" type="email" value={values.email} />
              </div>

              <div className="flex gap-6 sm:flex-row flex-col">

                {/* Profile Picture */}
                <FileUploadField
                  label="Profile Picture"
                  name="profilePic"
                  value={values.profilePic}
                  initialValue={initialData.profilePic}
                  isUpdating={isUpdatingProfilePic}
                  setIsUpdating={setIsUpdatingProfilePic}
                  setFieldValue={setFieldValue}
                  accept="image/*"
                  showRemoveButton={true}
                />

                {/* Resume */}
                <FileUploadField
                  label="Resume (PDF)"
                  name="resume"
                  value={values.resume}
                  initialValue={initialData.resume}
                  isUpdating={isUpdatingResume}
                  setIsUpdating={setIsUpdatingResume}
                  setFieldValue={setFieldValue}
                  accept="application/pdf"
                  showRemoveButton={false}
                />
              </div>


              {/* Social Links */}
              <div>
                <h3 className="text-xl font-semibold pb-3">Social Links</h3>
                <FieldArray name="socials">
                  {({ remove, push }) => (
                    <div>
                      {values.socials.map((social, index) => (
                        <div key={index} className="flex md:items-center items-start gap-4 mb-4 flex-col md:flex-row flex-wrap">
                          <div className="flex-1 w-full">
                            <label className="block text-sm font-medium">Name</label>
                            <Field
                              name={`socials[${index}].label`}
                              placeholder="Label (e.g., GitHub)"
                              className="px-4 py-2 text-sm border border-gray-300 rounded-lg w-full text-black"
                            />
                            <ErrorMessage
                              name={`socials[${index}].label`}
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                          <div className="flex-1 w-full">
                            <label className="block text-sm font-medium">URL</label>
                            <Field
                              name={`socials[${index}].url`}
                              placeholder="URL"
                              className="px-4 py-2 text-sm border border-gray-300 rounded-lg w-full text-black"
                            />
                            <ErrorMessage
                              name={`socials[${index}].url`}
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                          <div className="flex-1 w-full">
                            {/* Icon Selector using react-select */}
                            <label className="block text-sm font-medium">Select Icon</label>
                            <Select
                              options={iconOptions}
                              value={iconOptions.find(option => option.value === values.socials[index].icon)}
                              onChange={selectedOption => {
                                setFieldValue(`socials[${index}].icon`, selectedOption.value);
                              }}
                              getOptionLabel={e => (
                                <div className="flex items-center gap-2">
                                  <FontAwesomeIcon icon={socialIcons[e.value]} className="mr-2" />
                                  {e.value.replace('fa', '')}
                                </div>
                              )}
                              className="text-black"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push({ label: "", url: "", icon: "" })} // Default icon can be set
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
                  onClick={cancelChanges}
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

export default AdminHome;
