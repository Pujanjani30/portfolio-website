import CodingSvg from '../assets/person-coding.svg';
import DownloadButton from './DownloadButton';
import * as Constants from '../Constants';

const Hero = () => {
  const lines = Array.from({ length: 27 }, (_, i) => i + 1);

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
            <h1 className="text-4xl lg:text-6xl font-bold">Pujan Jani</h1>
            <p className="text-2xl mt-2">I am a <span className="text-blue-400">Backend Developer</span></p>

            <DownloadButton fileUrl="/Pujan_Jani_Resume.pdf" fileName="PujanJaniResume.pdf" />

            <div className="flex gap-4 text-2xl mt-4">
              <button onClick={() => window.location = `mailto:${Constants.EMAIL_URL}`}><i className="fa-solid fa-envelope"></i></button>
              <a href={Constants.LINKEDIN_URL}><i className="fa-brands fa-linkedin"></i></a>
              <a href={Constants.GITHUB_URL}><i className="fa-brands fa-github"></i></a>
            </div>

          </div>

          <img src={CodingSvg} alt="CodingSvg" className="w-64 h-96 md:w-80 lg:w-96" />
        </div>
      </div>
    </div>
  );
};

export default Hero;