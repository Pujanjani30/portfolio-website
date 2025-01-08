import React, { useEffect, useState, useMemo } from 'react';
import { Formik, Form, Field } from 'formik';
import { FormInput } from '../common/index.js';
import {
  getEducations, addEducation, updateEducation, deleteEducation
} from '../../../api/index.js';
import { successAlert, errorAlert, confirmAlert } from '../../../utils/alert.js';
import { Loading } from '../../common/index.js';

function AdminEducation() {
  const [educations, setEducations] = useState([]);
  const [editingEducation, setEditingEducation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEducations();
        setEducations(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        errorAlert("Error fetching data.");
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh]);

  const handleSubmit = async (values) => {
    try {
      const formData = {
        school: values.school,
        degree: values.degree,
        field: values.field,
        startYear: values.startYear,
        endYear: values?.endYear,
        grade: values?.grade,
        desc: values?.desc,
        isCurrent: values?.isCurrent
      };

      if (editingEducation) {
        await updateEducation(editingEducation._id, formData);
        successAlert("Education updated successfully.");
        setShowModal(false);
        document.body.style.overflow = 'auto';
        setRefresh(!refresh);
      } else {
        await addEducation(formData);
        successAlert("Education added successfully.");
      }
      setShowModal(false);
      document.body.style.overflow = 'auto';
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error adding/updating education:", error);
      errorAlert(error || "Error adding/updating education.");
    }
  };

  const handleEdit = (education) => {
    setEditingEducation(education);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleDelete = async (_id) => {
    try {
      const confirm = await confirmAlert("Are you sure you want to delete this education?");
      if (confirm.isConfirmed) {
        await deleteEducation(_id);
        successAlert("Education deleted successfully.");
        setRefresh(!refresh);
      }
    } catch (error) {
      console.error("Error deleting education:", error);
      errorAlert("Error deleting education.");
    }
  };

  const handleAddEducation = () => {
    setEditingEducation(null);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 bg-zinc-900 text-white rounded-lg shadow-lg min-h-screen flex flex-col">
      <h1 className="lg:text-3xl text-xl font-semibold mb-6">Educations</h1>

      {/* Add Education Button */}
      <button
        onClick={handleAddEducation}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md mb-6"
      >
        Add Education
      </button>

      {/* Education List */}
      <div>
        <div className='flex'>
          <h2 className="text-2xl font-semibold mb-4">Existing Educations</h2>
        </div>
        <ul>
          {educations.map((education) => (
            <li
              key={education._id}
              className="flex flex-wrap md:flex-row justify-between items-center px-6 py-3 mb-4 bg-zinc-800 rounded-md shadow-sm"
            >
              <div className="bg-zinc-800">
                <h3 className="text-xl font-semibold text-white mb-2">{education.school}</h3>

                <div className="text-sm text-gray-400 mb-2">
                  <span>{education.startYear} - {education.isCurrent ? 'Present' : education.endYear}</span>
                </div>

                <p className="text-sm text-gray-300 mb-2">
                  {education.degree} in {education.field}
                </p>

                <p className="text-sm text-gray-300 mb-2">
                  <strong className="text-gray-400">Grad:</strong> {education?.grade || '-'}
                </p>

                <p className="text-sm text-gray-300 mb-2 max-w-4xl">
                  <strong className="text-gray-400">Description:</strong> {education?.desc || '-'}
                </p>

                <p className="text-sm text-gray-300 mb-2">
                  {education?.desc || ''}
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(education)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(education._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for Adding/Editing Education */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
            <div className='flex justify-between items-center mb-6'>
              <h2 className="text-2xl font-bold text-gray-800">
                {editingEducation ? 'Update Education' : 'Add Education'}
              </h2>
              <button onClick={closeModal} className="text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>


            <Formik
              enableReinitialize={true}
              initialValues={{
                school: editingEducation?.school || '',
                degree: editingEducation?.degree || '',
                field: editingEducation?.field || '',
                startYear: editingEducation?.startYear || null,
                endYear: editingEducation?.endYear || null,
                grade: editingEducation?.grade || '',
                desc: editingEducation?.desc || '',
                isCurrent: editingEducation?.isCurrent || false
              }}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ values, handleChange }) => (
                <Form className="space-y-4">
                  <div className='px-2 max-h-96 overflow-auto space-y-2'>
                    <FormInput
                      label="School"
                      name="school"
                      value={values.school}
                      onChange={handleChange}
                      className="col-span-1"
                      labelStyle='text-black'
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput
                        label="Degree"
                        name="degree"
                        type="text"
                        value={values.degree}
                        onChange={handleChange}
                        className="col-span-1"
                        labelStyle='text-black'
                      />
                      <FormInput
                        label="Field"
                        name="field"
                        type="text"
                        value={values.field}
                        onChange={handleChange}
                        className="col-span-1"
                        labelStyle='text-black'
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput
                        label="Start Year"
                        name="startYear"
                        type="number"
                        value={values.startYear}
                        onChange={handleChange}
                        className="col-span-1"
                        labelStyle='text-black'
                      />

                      {!values.isCurrent &&
                        <FormInput
                          label="End Year"
                          name="endYear"
                          type="number"
                          value={values?.endYear}
                          onChange={handleChange}
                          className="col-span-1"
                          labelStyle='text-black'
                        />
                      }
                    </div>

                    <Field
                      name="isCurrent"
                      type="checkbox"
                      className="text-black"
                    >
                      {({ field }) => (
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            {...field}
                            className="mr-2"
                            checked={values.isCurrent}
                            onChange={handleChange}
                          />
                          <span className='text-black'>Currently studying</span>
                        </label>
                      )}
                    </Field>

                    <FormInput
                      label="Grade"
                      name="grade"
                      type="text"
                      value={values?.grade}
                      onChange={handleChange}
                      className="col-span-1"
                      labelStyle='text-black'
                    />

                    <FormInput
                      label="desc"
                      name="desc"
                      value={values?.desc}
                      onChange={handleChange}
                      type="textarea"
                      className="col-span-1"
                      labelStyle='text-black'
                      component='textarea'
                      rows='4'
                    />

                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                    >
                      {editingEducation ? 'Update' : 'Add'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

    </div >
  );
}

export default AdminEducation;
