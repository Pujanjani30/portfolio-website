// import * as Constants from '../Constants';

const Footer = () => {
  return (
    <footer className="bg-zinc-800 text-white">
      {/* <div className="container flex items-center ps-3 py-1">
        <p>Connect with me :</p>
        <div className="flex gap-4 ms-2">
          <button onClick={() => window.location = `mailto:${Constants.EMAIL_URL}`}><i className="fa-solid fa-envelope"></i></button>
          <a href={Constants.LINKEDIN_URL}><i className="fa-brands fa-linkedin"></i></a>
          <a href={Constants.GITHUB_URL}><i className="fa-brands fa-github"></i></a>
        </div>
      </div> */}
      <p className="text-center py-2">© 2024 Made by Pujan Jani</p>
    </footer>
  );
}

export default Footer;