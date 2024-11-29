import React, { useState, useEffect } from 'react';
import CodingSvg from '../../assets/person-coding.svg';
import { getHomeDetails } from '../../api/api.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { icons } from '../../utils/icons.js';
// import { DownloadButton } from '../index.js';

const Home = () => {
  const [homeDetails, setHomeDetails] = useState({});

  const lines = Array.from({ length: 27 }, (_, i) => i + 1);

  useEffect(() => {
    const fetchHomeDetails = async () => {
      try {
        const data = await getHomeDetails();
        setHomeDetails(data);
      }
      catch (error) {
        console.error('Error fetching home details:', error);
      }
    };

    fetchHomeDetails();
  }, []);

  return (
    <div className="bg-zinc-900 text-white min-h-[90.5vh]">
      <div className="grid grid-cols-12">

        <div className="col-span-1 w-1/3 md:col-span-1 p-3 text-gray-500 text-right">
          {lines.map((line) => (
            <p key={line} className="font-mono">
              {line}
            </p>
          ))}
        </div>

        {/* <div className="md:col-span-3 md:flex items-center gap-10 hidden">
          <div className="w-[1px] bg-zinc-500 h-[550px]"></div>
          <div className="w-[1px] bg-zinc-500 h-[450px]"></div>
          <div className="w-[1px] bg-zinc-500 h-[350px]"></div>
          <div className="w-[1px] bg-zinc-500 h-[250px]"></div>
          <div className="w-[1px] bg-zinc-500 h-[150px]"></div>
        </div> */}

        <div className="grid col-span-11 justify-center items-center md:col-span-11 md:grid-cols-2 md:items-center">
          <div className="text-left md:pt-2">
            <h2 className="text-xl">Hello! I am</h2>
            <h1 className="text-4xl lg:text-6xl font-bold">{homeDetails.name}</h1>
            <p className="text-2xl mt-3">I am a <span className="text-blue-400">{homeDetails.position}</span></p>

            {/* <DownloadButton fileUrl={homeDetails.resume} fileName="PujanJaniResume.pdf" /> */}

            <button
              className={`bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600 transition ${!homeDetails.resume ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              onClick={() => window.open(homeDetails.resume, '_blank')}
            >
              Resume
            </button>

            <div className="flex gap-4 text-2xl mt-4">
              <button onClick={() => window.location = `mailto:${homeDetails.email}`}><i className="fa-solid fa-envelope"></i></button>

              {homeDetails.socials?.map((social, index) => (
                <a
                  key={social._id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label} // Tooltip for clarity
                >
                  {/* Dynamically render the icon */}
                  {social.icon && (
                    <FontAwesomeIcon icon={icons[social.icon]} />
                  )}
                  {/* Optional fallback for missing icons */}
                  {!social.icon && <FontAwesomeIcon icon={faLink} />}
                </a>
              ))}
            </div>

          </div>

          <img src={CodingSvg} alt="CodingSvg" className="w-64 h-96 md:w-80 lg:w-96" />
        </div>
      </div>
    </div>
  );
};

export default Home;