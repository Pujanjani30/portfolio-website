import CodingSvg from '../assets/person-coding.svg';

const Hero = () => {
  const lines = Array.from({ length: 27 }, (_, i) => i + 1);

  return (
    <section className="flex items-center lg:gap-x-10 h-full bg-zinc-900 text-white">
      <div className="p-4 text-gray-500 text-right">
        {lines.map((line) => (
          <p key={line} className="font-mono">
            {line}
          </p>
        ))}
      </div>

      <div className='md:flex items-center justify-center gap-10 hidden'>
        <div className='w-[1px] bg-zinc-500 h-[550px]'></div>
        <div className='w-[1px] bg-zinc-500 h-[450px]'></div>
        <div className='w-[1px] bg-zinc-500 h-[350px]'></div>
        <div className='w-[1px] bg-zinc-500 h-[250px]'></div>
        <div className='w-[1px] bg-zinc-500 h-[150px]'></div>
      </div>

      <div className='flex flex-col lg:flex-row items-center justify-between w-full max-w-[900px] gap-6'>
        <div className="text-left">
          <h2 className="text-xl">Hello! I am</h2>
          <h1 className="text-6xl font-bold">Pujan Jani</h1>
          <p className="text-2xl mt-2">I am a <span className="text-blue-400">Backend Developer</span></p>
        </div>
        <img src={CodingSvg} alt="CodingSvg" className="w-96 h-96 ml-8 " />
      </div>
    </section>
  );
};

export default Hero;