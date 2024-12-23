import React, { useEffect, useState, useMemo } from 'react';
import { Formik, Form, Field } from 'formik';
import Select from 'react-select';
import { FormInput } from '../common/index.js';
import {
  getExperiences, addExperience, updateExperience, deleteExperience
} from '../../../api/index.js';
import { successAlert, errorAlert, confirmAlert } from '../../../utils/alert.js';

function AdminExperience() {
  const [Experiences, setExperiences] = useState([]);
  const [editingExperience, setEditingExperience] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExperiences();
        setExperiences(data);
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
    const skills = values?.skills.split(',').map(skill => skill.trim());

    try {
      const formData = {
        company: values.company,
        position: values.position,
        location: values.location,
        location_type: values.location_type,
        startMY: values.startMY,
        endMY: values?.endMY,
        desc: values?.desc,
        skills: skills,
        isCurrent: values.isCurrent
      };

      if (editingExperience) {
        await updateExperience(editingExperience._id, formData);
        successAlert("Experience updated successfully.");
        setShowModal(false);
        document.body.style.overflow = 'auto';
        setRefresh(!refresh);
      } else {
        await addExperience(formData);
        successAlert("Experience added successfully.");
      }
      setShowModal(false);
      document.body.style.overflow = 'auto';
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error adding/updating Experience:", error);
      errorAlert(error || "Error adding/updating Experience.");
    }
  };

  const handleEdit = (Experience) => {
    setEditingExperience(Experience);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleDelete = async (_id) => {
    try {
      const confirm = await confirmAlert("Are you sure you want to delete this Experience?");
      if (confirm.isConfirmed) {
        await deleteExperience(_id);
        successAlert("Experience deleted successfully.");
        setRefresh(!refresh);
      }
    } catch (error) {
      console.error("Error deleting Experience:", error);
      errorAlert("Error deleting Experience.");
    }
  };

  const handleAddExperience = () => {
    setEditingExperience(null);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl text-gray-600">Loading...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 bg-zinc-900 text-white rounded-lg shadow-lg min-h-screen flex flex-col">
      <h1 className="lg:text-3xl text-xl font-semibold mb-6">Experiences</h1>

      {/* Add Experience Button */}
      <button
        onClick={handleAddExperience}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md mb-6"
      >
        Add Experience
      </button>

      {/* Experience List */}
      <div>
        <div className='flex'>
          <h2 className="text-2xl font-semibold mb-4">Existing Experiences</h2>
        </div>
        <ul>
          {Experiences.map((Experience) => (
            <li
              key={Experience._id}
              className="flex flex-wrap md:flex-row justify-between items-center px-6 py-3 mb-4 bg-zinc-800 rounded-md shadow-sm"
            >
              <div className="bg-zinc-800">
                <h3 className="text-xl font-semibold text-white mb-2">{Experience.company}</h3>

                <div className="text-sm text-gray-400 mb-2 space-x-2">
                  <span>
                    {new Date(Experience.startMY).toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </span>
                  <span>-</span>
                  <span>
                    {Experience.isCurrent ?
                      'Present' :
                      new Date(Experience.endMY).toLocaleString('default', { month: 'long', year: 'numeric' })
                    }
                  </span>
                </div>

                <p className="text-sm text-gray-300 mb-2">
                  {Experience.position}
                </p>

                <div className="flex items-center space-x-3 mb-2">
                  <p className="text-sm text-gray-300">
                    {Experience.location}
                  </p>
                  <span className="text-gray-400">|</span>
                  <p className="text-sm text-gray-300">
                    {Experience.location_type}
                  </p>
                </div>

                <p className="text-sm text-gray-300 mb-2">
                  <strong className="text-gray-400">Skills :</strong> {Experience?.skills.join(', ') || '-'}
                </p>

                <p className="text-sm text-gray-300 mb-2 max-w-4xl">
                  <strong className="text-gray-400">Description :</strong> {Experience?.desc || '-'}
                </p>

              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(Experience)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(Experience._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for Adding/Editing Experience */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
            <div className='flex justify-between items-center mb-6'>
              <h2 className="text-2xl font-bold text-gray-800">
                {editingExperience ? 'Update Experience' : 'Add Experience'}
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
                company: editingExperience?.company || '',
                position: editingExperience?.position || '',
                location: editingExperience?.location || '',
                location_type: editingExperience?.location_type || 'On-site',
                startMY: editingExperience?.startMY || '',
                endMY: editingExperience?.endMY || '',
                desc: editingExperience?.desc || '',
                skills: editingExperience?.skills.join(', ') || [],
                isCurrent: editingExperience?.isCurrent || false
              }}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ values, handleChange }) => (
                <Form className="space-y-4">
                  <div className='px-2 max-h-96 overflow-auto space-y-2'>
                    <FormInput
                      label="Company"
                      name="company"
                      value={values.company}
                      onChange={handleChange}
                      className="col-span-1"
                      labelStyle='text-black'
                    />

                    <FormInput
                      label="Position"
                      name="position"
                      type="text"
                      value={values.position}
                      onChange={handleChange}
                      className="col-span-1"
                      labelStyle='text-black'
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput
                        label="Location"
                        name="location"
                        type="text"
                        value={values.location}
                        onChange={handleChange}
                        className="col-span-1"
                        labelStyle='text-black'
                      />
                      <div className="col-span-1">
                        <label className="block text-sm font-medium text-black">Location Type</label>
                        <Field
                          as="select"
                          name="location_type"
                          className="mt-1 block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        >
                          <option value="In Progress">On-site</option>
                          <option value="On Hold">Remote</option>
                          <option value="Completed">Hybrid</option>
                        </Field>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput
                        label="Start Month/Year"
                        name="startMY"
                        type="month"
                        value={values.startMY}
                        onChange={handleChange}
                        className="col-span-1"
                        labelStyle='text-black'
                      />

                      {!values.isCurrent &&
                        <FormInput
                          label="End Month/Year"
                          name="endMY"
                          type="month"
                          value={values?.endMY}
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
                          <span className='text-black'>Currently working</span>
                        </label>
                      )}
                    </Field>

                    <FormInput
                      label="Skills"
                      name="skills"
                      type="text"
                      value={values?.skills}
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
                      {editingExperience ? 'Update' : 'Add'}
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

export default AdminExperience;
