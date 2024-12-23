// React
import React, { useState, useEffect } from "react";

// External packages
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

// API Calls
import { getExperiences } from '../../api/index.js';

const Experience = () => {
  const [Experiences, setExperiences] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeDetails = async () => {
      try {
        const data = await getExperiences();
        setExperiences(data);
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
    <div className="min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-8">Experiences</h1>
      {/* Main Content */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="text-xl text-gray-600">Loading...</span>
        </div>
      ) : (
        <main className="grid grid-cols-1 gap-6 pl-4 md:pl-9">
          {Experiences.map((Experience, index) => (
            <div
              key={index}
              className="relative pl-12 border-l-2 border-zinc-600 md:pr-20 mb-4"
            >
              {/* Timeline Icon */}
              <div className="absolute -left-6 top-0 w-12 h-12 bg-zinc-800 border border-zinc-700 rounded-full flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faBriefcase}
                  className="text-2xl"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">{Experience.company}</h3>

                <p className="text-base text-gray-100 mb-1">
                  {Experience.position}
                </p>

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

                {Experience?.desc
                  ? (<p className="text-sm text-gray-300 mb-2">
                    <strong className="text-gray-400">Description:</strong> {Experience?.desc}
                  </p>) : null}
              </div>
            </div>
          ))}
        </main>
      )
      }
    </div >
  );
};

export default Experience;
