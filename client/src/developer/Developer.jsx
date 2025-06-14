import { useEffect } from "react";
import image from "../assets/Deepak_pradhan.jpg";
import { Link } from "react-router-dom";
import githubIcon from "../assets/github.png";
import linkedin from "../assets/linkedin.png";

const Developer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex justify-center mt-28 mb-10 px-4">
      <div className="max-w-xs bg-black/10 backdrop-blur-md border-2 border-yellow-500 rounded-lg shadow-lg hover:shadow-2xl p-6 transition-shadow duration-300">
        <img
          src={image}
          alt="developer_profile_image"
          className="object-cover rounded-full mx-auto border-4 border-yellow-500 shadow-md hover:shadow-yellow-400 transition-shadow duration-300"
          style={{ width: 150, height: 150 }}
        />
        <h3 className="text-2xl font-semibold mt-6 text-yellow-400 mb-4 text-center">
          Deepak Pradhan
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed text-center">
          Hi, I am Deepak Pradhan, a tech enthusiast specializing in MERN stack
          and Next.js web development. I'm passionate about solving complex
          problems and staying updated with the latest trends in technology.
        </p>

        <div className="flex justify-center mt-6 space-x-8">
          <Link
            to="https://www.linkedin.com/in/deepakpradhan10242/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="transform hover:scale-110 transition-transform duration-300"
          >
            <img
              src={linkedin}
              alt="linkedin"
              className="bg-white rounded-full h-9 w-9 p-1 shadow-md"
            />
          </Link>

          <Link
            to="https://github.com/deepakpradhan10242"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="transform hover:scale-110 transition-transform duration-300"
          >
            <img
              src={githubIcon}
              alt="github"
              className="bg-white rounded-full h-9 w-9 p-1 shadow-md"
            />
          </Link>
        </div>

        {/* Portfolio Link Button */}
        <div className="mt-6 flex justify-center">
          <a
            href="https://portfolio-deepak-pradhans-projects-7583db17.vercel.app/"  // replace with actual portfolio URL
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-500 text-black font-semibold py-2 px-6 rounded-full hover:bg-yellow-600 transition-colors duration-300"
          >
            View Portfolio
          </a>
        </div>
      </div>
    </div>
  );
};

export default Developer;
