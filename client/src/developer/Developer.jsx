import { useEffect } from "react";
import image from "../assets/Deepak_pradhan.jpg";
import { Link } from "react-router-dom";
import githubIcon from "../assets/github.png";
import linkedin from "../assets/linkedin.png";

const Developer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="flex mt-28 mb-10">
      <div className="max-w-xs bg-black bg-opacity-60 border-2 border-yellow-500  rounded-lg shadow-lg hover:shadow-2xl m-5  p-4">
        <img
          src={image}
          alt="developer_profile_image"
          className="object-cover rounded mx-auto border-yellow-500"
        />
        <h3 className="text-lg font-semibold mt-4 text-yellow-500 mb-5">
          Deepak Pradhan
        </h3>
        <p className="flex justify-start">
          Hi, I am Deepak Pradhan a tech enthusiast, specializing in MERN stack
          and Next.js web development. I'm passionate about solving complex
          problems and staying updated with the latest trends in technology.
        </p>

        <div className="flex justify-center mt-5">
          <Link
            to="https://www.linkedin.com/in/deepakpradhan10242/"
          >
            <img src={linkedin} alt="linkedin" className="bg-white rounded h-7 w-7 mx-5"/>
          </Link>

          {/* GitHub Button */}
          <Link
            to="https://github.com/deepakpradhan10242" 
          >
            <img src={githubIcon} alt="github" className="bg-white rounded h-7 w-7 mx-5"/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Developer;
