// React
import React, { useState, useEffect } from "react";

// External packages
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool } from "@fortawesome/free-solid-svg-icons";

// API Calls
import { getEducations } from '../../api/index.js';

const Education = () => {
  const [educations, setEducations] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeDetails = async () => {
      try {
        const data = await getEducations();
        setEducations(data);
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
      <h1 className="text-2xl font-bold mb-8">Educations</h1>
      {/* Main Content */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="text-xl text-gray-600">Loading...</span>
        </div>
      ) : (
        <main className="grid grid-cols-1 gap-6 pl-4 md:pl-9">
          {/* Example Project Section */}
          {educations.map((education, index) => (
            <div
              key={index}
              className="relative pl-12 border-l-2 border-zinc-600 md:pr-20 mb-4"
            >
              {/* Timeline Icon */}
              <div className="absolute -left-6 top-0 w-12 h-12 bg-zinc-800 border border-zinc-700 rounded-full flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faSchool}
                  className="text-xl"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{education.school}</h3>

                <div className="text-sm text-gray-400 mb-2">
                  <span>{education.startYear} - {education.isCurrent ? 'Present' : education.endYear}</span>
                </div>


                <p className="text-sm text-gray-300 mb-2">
                  {education.degree} in {education.field}
                </p>

                {education?.grade
                  ? (<p className="text-sm text-gray-300 mb-2">
                    <strong className="text-gray-400">Grade</strong> {education?.grade}
                  </p>) : null}

                {education?.desc
                  ? (<p className="text-sm text-gray-300 mb-2">
                    <strong className="text-gray-400">Description:</strong> {education?.desc}
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

export default Education;
