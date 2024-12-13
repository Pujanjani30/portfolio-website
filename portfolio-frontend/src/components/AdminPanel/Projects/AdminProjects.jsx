import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { FormInput, ReorderModal } from '../common/index.js';
import {
  getAllProjects, getProjects, addProject, updateProject, deleteProject, reorderProjects
} from '../../../api/index.js';
import { successAlert, errorAlert, confirmAlert } from '../../../utils/alert.js';


function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [showReorderModal, setShowReorderModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
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
      const techStack = values?.tech_stack.split(',').map((item) => item.trim());

      const formData = {
        name: values?.name,
        desc: values?.desc,
        start_date: values?.start_date,
        end_date: values?.end_date,
        tech_stack: techStack,
        project_link: values?.project_link,
        status: values?.status,
        associated_with: values?.associated_with,
        isVisible: values?.isVisible,
      };

      if (editingProject) {
        await updateProject(editingProject._id, formData);
        successAlert("Project updated successfully.");
        setShowModal(false);
        document.body.style.overflow = 'auto';
        setRefresh(!refresh);
      } else {
        await addProject(formData);
        successAlert("Project added successfully.");
      }
      setShowModal(false);
      document.body.style.overflow = 'auto';
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error adding/updating project:", error);
      errorAlert("Error adding/updating project.");
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleDelete = async (_id) => {
    try {
      const confirm = await confirmAlert("Are you sure you want to delete this project?");
      if (confirm.isConfirmed) {
        await deleteProject(_id);
        successAlert("Project deleted successfully.");
        setRefresh(!refresh);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      errorAlert("Error deleting project.");
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  const handleReorderProjects = async () => {
    setShowReorderModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleSaveReorder = async (reorderedProjects) => {
    try {
      reorderedProjects = reorderedProjects.map((project, index) => {
        return { id: project._id, sort_order: index + 1 };
      })
      await reorderProjects({ projects: reorderedProjects });
      setShowReorderModal(false);
      setRefresh(!refresh);
      document.body.style.overflow = 'auto';
      successAlert('Projects reordered successfully.');
    } catch (error) {
      console.error("Error reordering projects:", error);
      errorAlert("Error reordering projects.");
    }
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
      <h1 className="lg:text-3xl text-xl font-semibold mb-6">Projects</h1>

      {/* Add Project Button */}
      <button
        onClick={handleAddProject}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md mb-6"
      >
        Add Project
      </button>

      {/* Project List */}
      <div>
        <div className='flex'>
          <h2 className="text-2xl font-semibold mb-4">Existing Projects</h2>
          <button className='ml-auto' onClick={handleReorderProjects}>
            Reorder
          </button>
        </div>
        <ul>
          {projects.map((project) => (
            <li
              key={project.id}
              className="flex flex-wrap md:flex-row justify-between items-center px-6 py-3 mb-4 bg-zinc-800 rounded-md shadow-sm"
            >
              <div className="bg-zinc-800">
                <h3 className="text-xl font-semibold text-white mb-2">{project.name}</h3>

                <div className="text-sm text-gray-400 mb-2">
                  <span>{project?.start_date?.split('T')[0]} - {project?.end_date?.split('T')[0]}</span>
                </div>

                <p className="text-sm text-gray-300 mb-2">
                  <strong className="text-gray-400">Tech Stack:</strong> {project.tech_stack.join(', ')}
                </p>

                <p className="text-sm text-gray-300 mb-2">
                  <strong className="text-gray-400">Associated With:</strong> {project?.associated_with}
                </p>

                <p className="text-sm text-gray-300 mb-2 max-w-4xl">
                  <strong className="text-gray-400">Description:</strong> {project.desc}
                </p>

                <p className="text-sm text-gray-300 mb-2">
                  <strong className="text-gray-400">Status:</strong> {project.status}
                </p>

                <p className="text-sm text-gray-300 mb-2">
                  <strong className="text-gray-400">Visible:</strong> {project.isVisible ? 'Yes' : 'No'}
                </p>

                <p className="text-sm text-gray-300 mb-4">
                  <strong className="text-gray-400">Project Link:</strong> <a href={project?.project_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {project?.project_link}
                  </a>
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(project)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for Adding/Editing Projects */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
            <div className='flex justify-between items-center mb-6'>
              <h2 className="text-2xl font-bold text-gray-800">
                {editingProject ? 'Update Project' : 'Add Project'}
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
                name: editingProject ? editingProject.name : '',
                start_date: editingProject ? editingProject.start_date : null,
                end_date: editingProject ? editingProject.end_date : null,
                tech_stack: editingProject ? editingProject.tech_stack.join(', ') : [],
                associated_with: editingProject ? editingProject.associated_with : '',
                status: editingProject ? editingProject.status : 'In Progress',
                desc: editingProject ? editingProject.desc : '',
                project_link: editingProject ? editingProject.project_link : '',
                isVisible: editingProject ? editingProject.isVisible : true,
              }}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ values, handleChange }) => (
                <Form className="space-y-4">
                  <div className='px-2 max-h-96 overflow-auto space-y-2'>
                    <FormInput
                      label="Project Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      className="col-span-1"
                      labelStyle='text-black'
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput
                        label="Start Date"
                        name="start_date"
                        type="date"
                        value={values?.start_date?.split('T')[0]}
                        onChange={handleChange}
                        className="col-span-1"
                        labelStyle='text-black'
                      />
                      <FormInput
                        label="End Date"
                        name="end_date"
                        type="date"
                        value={values?.end_date?.split('T')[0]}
                        onChange={handleChange}
                        className="col-span-1"
                        labelStyle='text-black'
                      />
                    </div>

                    <FormInput
                      label="Tech Stack"
                      name="tech_stack"
                      type="text"
                      value={values.tech_stack}
                      onChange={handleChange}
                      className=""
                      labelStyle='text-black'
                    />

                    <FormInput
                      label="Project Link"
                      name="project_link"
                      value={values.project_link}
                      onChange={handleChange}
                      type="text"
                      className="col-span-1"
                      labelStyle='text-black'
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* visibliity */}
                      <div>
                        <label className="block text-sm font-medium text-black">Visibility</label>

                        <div className="flex items-center mt-4">
                          <Field
                            type="checkbox"
                            name="isVisible"
                            id="isVisible"
                            className="mr-2"
                          />
                          <label htmlFor="isVisible" className="text-sm text-black font-medium">
                            Visible to public
                          </label>
                        </div>
                      </div>

                      <div className="col-span-1">
                        <label className="block text-sm font-medium text-black">Status</label>
                        <Field
                          as="select"
                          name="status"
                          className="mt-1 block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        >
                          <option value="In Progress">In Progress</option>
                          <option value="On Hold">On Hold</option>
                          <option value="Completed">Completed</option>
                        </Field>
                      </div>
                    </div>

                    <FormInput
                      label="desc"
                      name="desc"
                      value={values.desc}
                      onChange={handleChange}
                      type="textarea"
                      className="col-span-1"
                      labelStyle='text-black'
                      component='textarea'
                      rows='4'
                    />

                    <FormInput
                      label="Associated With"
                      name="associated_with"
                      value={values.associated_with}
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
                      {editingProject ? 'Update Project' : 'Add Project'}
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
          items={projects
            .filter((project) => project.isVisible)
            .sort((a, b) => a.sort_order - b.sort_order)
          }
          title='Reorder Projects'
          onClose={() => {
            setShowReorderModal(false);
            document.body.style.overflow = 'auto';
          }}
          onSave={handleSaveReorder}
          renderItem={(project) => (
            <>
              <span className="text-black">{project.name}</span>
              <span className="text-sm text-gray-500">Drag to reorder</span>
            </>
          )}
        />
      )}
    </div >
  );
}

export default AdminProjects;
