import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getSkills } from '../../api/index.js';
import { techIcons } from '../../utils/icons.js';
import { Loading } from '../common/index.js';

function Skills() {
  const [technicalSkills, setTechnicalSkills] = useState([]);
  // const [softSkills, setSoftSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills();

        const technicalSkills = data.filter(skill => skill.skill_type === 'Technical');
        // const softSkills = data.filter(skill => skill.skill_type === 'Soft');

        setTechnicalSkills(technicalSkills);
        // setSoftSkills(softSkills);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data.', error);
        errorAlert('Error fetching data.');
      }
    };

    fetchSkills();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='min-h-screen p-5'>
      <div className="mb-4 col-span-6">
        <h2 className="text-2xl font-bold mb-5">Technical Skills</h2>
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
          {technicalSkills.map(skill => (
            <div key={skill._id} >
              <div key={skill._id} className="flex items-center py-3">
                <FontAwesomeIcon icon={techIcons[skill.skill_icon]} className="text-4xl mr-2" />
                <span className='ms-2 text-lg'> {skill.skill_name}</span>
              </div>
              <p className="text-sm text-gray-300 mb-2">
                <strong className="text-gray-400">Proficiency : </strong>
                {skill.skill_level}
              </p>
            </div>
          ))}

        </div>
      </div >

      {/* <div className="mb-4 col-span-6">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-500 mb-4">Soft Skills</h2>
        <div className="grid grid-cols-2 gap-4">
          {softSkills.map(skill => (
            <div key={skill._id} className="flex items-center">
              <span className='text-lg ms-2'>{skill.skill_name}</span>
            </div>
          ))}
        </div>
      </div> */}
    </div >
  );

}

export default Skills;
