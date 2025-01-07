import { useState, useContext,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import UserContext from "../context/UserContext";

const Register = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    branch: "",
    rollNo: "",
  });

  const [errors, setErrors] = useState({});
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(UserContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Name is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      formErrors.email = "Valid email is required.";
    if (!formData.password) formErrors.password = "Password is required.";
    if (!formData.branch) formErrors.branch = "Branch is required.";
    if (!formData.rollNo) formErrors.rollNo = "Roll number is required.";
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const URL = `${backendUrl}/api/auth/register`;
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.post(URL, formData);

      if (response.data.success) {
        setIsLoggedIn(true);
        getUserData();
        toast.success(response.data.message);

        setFormData({
          name: "",
          email: "",
          password: "",
          branch: "",
          rollNo: "",
        });

        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred");
        setErrors({ email: error.response.data.message });
      } else {
        toast.error("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-black bg-opacity-60  p-8 rounded-lg shadow-lg lg:w-96 w-80 mt-16 text-sm"
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-14">
          Sign Up
        </h1>
        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            placeholder="Full Name"
            onChange={handleChange}
            className="bg-transparent outline-none text-white"
            required
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            placeholder="Email address"
            onChange={handleChange}
            className="bg-transparent outline-none text-white"
            required
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="bg-transparent outline-none text-white"
            required
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <div className=" w-full mb-4 flex items-center gap-3  px-5 py-2.5 rounded-full bg-[#333A5C]">
          <input
            id="branch"
            name="branch"
            type="text"
            value={formData.branch}
            placeholder="Branch"
            onChange={handleChange}
            className="bg-transparent outline-none text-white"
            required
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.branch}</p>
          )}
        </div>

        <div className=" w-full mb-4 flex items-center gap-3  px-5 py-2.5 rounded-full bg-[#333A5C]">
          <input
            id="rollNo"
            name="rollNo"
            type="text"
            value={formData.rollNo}
            placeholder="Roll No."
            onChange={handleChange}
            className="bg-transparent outline-none text-white"
            required
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.rollNo}</p>
          )}
        </div>

        <p className="text-sm px-5 py-2.5 text-gray-400">
          Have an account? Click{" "}
          <Link to="/user/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>

        <button className="w-full py-2.5 bg-blue-500 hover:bg-blue-800 text-white rounded-full mt-5 mb-5">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
