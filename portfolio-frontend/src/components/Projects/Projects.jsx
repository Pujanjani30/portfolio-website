// React
import React, { useState, useEffect } from "react";

// External packages
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// API Calls
import { getProjects } from '../../api/index.js';

const Projects = () => {
  const [projects, setProjects] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeDetails = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
        setLoading(false);
      }
      catch (error) {
        console.error('Error fetching data.', error);
        errorAlert('Error fetching data.');
      }
    };

    fetchHomeDetails();
  }, []);



  return (
    <div className="bg-zinc-900 text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-8" > Projects</h1 >
      {/* Main Content */}
      {
        loading ? (
          <div className="flex justify-center items-center h-screen">
            <span className="text-xl text-gray-600">Loading...</span>
          </div>
        ) : (
          <main className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4 md:pl-9">
            {/* Example Project Section */}
            {projects.map((project, index) => (
              <div
                key={index}
                className="relative pl-12 border-l-2 border-zinc-600 md:pr-20 mb-4"
              >
                {/* Timeline Icon */}
                <div className="absolute -left-6 top-0 w-12 h-12 bg-zinc-800 border border-zinc-700 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faGithub}
                    className="text-4xl"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{project.name}</h3>

                  {project?.start_date && project?.end_date
                    ? (
                      <div className="text-sm text-gray-400 mb-2">
                        <span>{project?.start_date.split('T')[0]} - {project?.end_date.split('T')[0]}</span>
                      </div>
                    ) : null}

                  <p className="text-sm text-gray-300 mb-2">
                    <strong className="text-gray-400">Tech Stack:</strong> {project.tech_stack.join(', ')}
                  </p>

                  {project?.associated_with
                    ? (<p className="text-sm text-gray-300 mb-2">
                      <strong className="text-gray-400">Associated With:</strong> {project?.associated_with}
                    </p>) : null}

                  <p className="text-sm text-gray-300 mb-2">
                    <strong className="text-gray-400">Description:</strong> {project.desc}
                  </p>

                  <p className="text-sm text-gray-300 mb-2">
                    <strong className="text-gray-400">Status:</strong> {project.status}
                  </p>

                  {project?.project_link
                    ? (<button
                      className="mt-4 px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
                      onClick={() => window.open(project.project_link, '_blank')}
                    >
                      Show project
                    </button>) : null}
                </div>


              </div>
            ))}
          </main>
        )
      }
    </div >
  );
};

export default Projects;
