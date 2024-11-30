import React from "react";

const Introduction = () => {
  return (
    <section className="bg-zinc-900 text-white flex min-h-full items-center justify-center">
      <div className="max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          Hi, I’m <span className="text-blue-500">Pujan Jani</span> 👋
        </h1>
        <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-4">
          Welcome to my portfolio! I am a passionate and driven{" "}
          <span className="text-blue-500 font-semibold">backend developer</span> with a strong foundation in web
          technologies and a growing expertise in building scalable, efficient, and secure web applications. Currently,
          I am in my third year of{" "}
          <span className="text-blue-500 font-semibold">
            B.Tech in Computer Science and Engineering
          </span>{" "}
          at <span className="text-blue-500 font-semibold">Silver Oak University</span>, where I have been honing my
          skills and exploring diverse areas of technology.
        </p>
        <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-4">
          My journey in development started with an interest in{" "}
          <span className="text-blue-500 font-semibold">frontend technologies</span>, where I learned to create
          interactive and visually appealing web interfaces using{" "}
          <span className="text-blue-500 font-semibold">HTML, CSS</span>, and{" "}
          <span className="text-blue-500 font-semibold">JavaScript</span>. However, as I delved deeper into the world
          of coding, my curiosity led me to explore{" "}
          <span className="text-blue-500 font-semibold">backend development</span>, where I discovered my true
          passion. Working with{" "}
          <span className="text-blue-500 font-semibold">Node.js</span>,{" "}
          <span className="text-blue-500 font-semibold">Express.js</span>, and databases like{" "}
          <span className="text-blue-500 font-semibold">MongoDB</span> and{" "}
          <span className="text-blue-500 font-semibold">MySQL</span>, I enjoy solving complex problems and bringing
          dynamic functionality to web applications.
        </p>
      </div>
    </section>
  );
};

export default Introduction;
