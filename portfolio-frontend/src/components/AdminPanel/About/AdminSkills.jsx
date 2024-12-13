import React, { useEffect, useState, useMemo } from 'react';
import { Formik, Form, Field } from 'formik';
import { FormInput, ReorderModal } from '../common/index.js';
import {
  getSkills, addSkill, updateSkill, deleteSkill, reorderSkills
} from '../../../api/index.js';
import { successAlert, errorAlert, confirmAlert } from '../../../utils/alert.js';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { techIcons } from '../../../utils/icons.js';

function AdminSkills() {
  const [technicalSkills, setTechnicalSkills] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const [editingSkill, setEditingSkill] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [showReorderModal, setShowReorderModal] = useState(false);
  const [skillType, setSkillType] = useState('Technical');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSkills();

        const technicalSkills = data.filter(skill => skill.skill_type === 'Technical');
        const softSkills = data.filter(skill => skill.skill_type === 'Soft');

        setTechnicalSkills(technicalSkills);
        setSoftSkills(softSkills);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        errorAlert("Error fetching data.");
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh]);

  const sortedSkills = useMemo(() => {
    return (skillType === 'Technical' ? technicalSkills : softSkills)
      .sort((a, b) => a.skill_sort_order - b.skill_sort_order);
  }, [skillType, technicalSkills, softSkills]);

  const iconOptions = Object.keys(techIcons).map(iconKey => ({
    value: iconKey,
    label: (
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={techIcons[iconKey]} className="mr-2" />
        {iconKey.replace('fa', '')}
      </div>
    )
  }));

  const handleSubmit = async (values) => {
    try {
      const formData = {
        skill_name: values.skill_name,
        skill_icon: values.skill_icon,
        skill_type: values.skill_type,
        skill_level: values.skill_level,
        skill_associated_with: values.skill_associated_with
      };

      if (editingSkill) {
        await updateSkill(editingSkill._id, formData);
        successAlert("Skill updated successfully.");
        setShowModal(false);
        document.body.style.overflow = 'auto';
        setRefresh(!refresh);
      } else {
        await addSkill(formData);
        successAlert("Skill added successfully.");
      }
      setShowModal(false);
      document.body.style.overflow = 'auto';
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error adding/updating skill:", error);
      errorAlert(error || "Error adding/updating skill.");
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleDelete = async (_id) => {
    try {
      const confirm = await confirmAlert("Are you sure you want to delete this skill?");
      if (confirm.isConfirmed) {
        await deleteSkill(_id);
        successAlert("Skill deleted successfully.");
        setRefresh(!refresh);
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      errorAlert("Error deleting skill.");
    }
  };

  const handleAddSkill = () => {
    setEditingSkill(null);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  const handleReorderSkills = async () => {
    setShowReorderModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleSaveReorder = async (reorderedSkills) => {
    try {
      reorderedSkills = reorderedSkills.map((skill, index) => {
        return { id: skill._id, skill_sort_order: index + 1 };
      })
      await reorderSkills({ skills: reorderedSkills });
      setShowReorderModal(false);
      setRefresh(!refresh);
      document.body.style.overflow = 'auto';
      successAlert('Skills reordered successfully.');
    } catch (error) {
      console.error("Error reordering skills:", error);
      errorAlert("Error reordering skills.");
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl text-gray-600">Loading...</span>
      </div>
    );
  }

  const renderSkillList = (skills, type) => (
    <div>
      <div className="flex">
        <h2 className="text-2xl font-semibold mb-4">{type} Skills</h2>
        <button
          className="ml-auto"
          onClick={() => {
            handleReorderSkills();
            setSkillType(type);
          }}
        >
          Reorder
        </button>
      </div>
      <ul>
        {skills.map((skill) => (
          <li
            key={skill._id}
            className="flex flex-wrap md:flex-row justify-between items-center px-6 py-3 mb-4 bg-zinc-800 rounded-md shadow-sm"
          >
            <div className="flex items-center bg-zinc-800">
              <FontAwesomeIcon icon={techIcons[skill.skill_icon]} className="text-4xl me-4" />
              <div>
                <div className="flex items-center">
                  <h3 className="text-xl font-semibold text-white">{skill.skill_name}</h3>
                  <div className="flex space-x-2 ms-5 bg-green-700 px-2 rounded-md">
                    <p className="text-sm"> {skill?.skill_level}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-2">
                  <strong className="text-gray-400">Associated With : </strong>
                  {skill?.skill_associated_with || 'N/A'}
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleEdit(skill)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(skill._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 bg-zinc-900 text-white rounded-lg shadow-lg min-h-screen flex flex-col">
      <h1 className="lg:text-3xl text-xl font-semibold mb-6">Skills</h1>

      {/* Add Project Button */}
      <button
        onClick={handleAddSkill}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md mb-6"
      >
        Add Skill
      </button>

      {/* Technical Skills */}
      {renderSkillList(technicalSkills, 'Technical')}

      {/* Soft Skills */}
      {renderSkillList(softSkills, 'Soft')}

      {/* Modal for Adding/Editing Projects */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
            <div className='flex justify-between items-center mb-6'>
              <h2 className="text-2xl font-bold text-gray-800">
                {editingSkill ? 'Update Skill' : 'Add Skill'}
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
              enableReinitialize={true} // Ensures the form is reinitialized when `editingProject` changes
              initialValues={{
                skill_name: editingSkill?.skill_name || '',
                skill_icon: editingSkill?.skill_icon || '',
                skill_type: editingSkill?.skill_type || 'Technical',
                skill_level: editingSkill?.skill_level || 'Beginner',
                skill_associated_with: editingSkill?.skill_associated_with || ''
              }}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ values, handleChange }) => (
                <Form className="space-y-4">
                  <div className='px-2 max-h-96 overflow-auto space-y-2'>
                    <div className="flex-1 w-full">
                      {/* Icon Selector using react-select */}
                      <label className="block text-sm font-medium text-black">Select Icon</label>
                      <Select
                        options={iconOptions}
                        value={iconOptions.find(option => option.value === values.skill_icon)}
                        onChange={selectedOption => {
                          handleChange({ target: { name: 'skill_icon', value: selectedOption.value } });
                        }}
                        getOptionLabel={e => (
                          <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={techIcons[e.value]} className="mr-2" />
                            {e.value.replace('fa', '')}
                          </div>
                        )}
                        className="text-black mt-1"
                      />
                    </div>

                    <FormInput
                      label="Name"
                      name="skill_name"
                      value={values.skill_name}
                      onChange={handleChange}
                      className="col-span-1"
                      labelStyle='text-black'
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-1">
                        <label className="block text-sm font-medium text-black">Type</label>
                        <Field
                          as="select"
                          name="skill_type"
                          value={values.skill_type}
                          onChange={handleChange}
                          className="mt-1 block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        >
                          <option value="Technical">Technical</option>
                          <option value="Soft">Soft</option>
                        </Field>
                      </div>

                      <div className="col-span-1">
                        <label className="block text-sm font-medium text-black">Level</label>
                        <Field
                          as="select"
                          name="skill_level"
                          value={values.skill_level}
                          onChange={handleChange}
                          className="mt-1 block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </Field>
                      </div>
                    </div>

                    <FormInput
                      label="Associated With"
                      name="skill_associated_with"
                      value={values.skill_associated_with}
                      onChange={handleChange}
                      className="col-span-1"
                      labelStyle='text-black'
                    />
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                    >
                      {editingSkill ? 'Update Skill' : 'Add Skill'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {showReorderModal && (
        <ReorderModal
          items={sortedSkills}
          title='Reorder Skills'
          onClose={() => {
            setShowReorderModal(false);
            document.body.style.overflow = 'auto';
          }}
          onSave={handleSaveReorder}
          renderItem={(skill) => (
            <>
              <span className="text-black">{skill.skill_name}</span>
              <span className="text-sm text-gray-500">Drag to reorder</span>
            </>
          )}
        />
      )}
    </div >
  );
}

export default AdminSkills;
