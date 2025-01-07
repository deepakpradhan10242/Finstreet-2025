import { useState,useContext,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import UserContext from "../context/UserContext";

const Login = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "" 
  });

  const {backendUrl,setIsLoggedIn,getUserData} = useContext(UserContext);

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      formErrors.email = "Valid email is required.";
    if (!formData.password) formErrors.password = "Password is required.";
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    axios.defaults.withCredentials = true;
    try {
      const URL = `${backendUrl}/api/auth/login`;
      const response = await axios.post(URL, formData);

      if(response.data.success) {
        setIsLoggedIn(true);
        getUserData();
        
        toast.success("Login successful!");
        setFormData({ email: "", password: "" });

        // Redirect after login
        setTimeout(() => navigate('/'), 1000);
      } else {
        toast.error(response.data.message || "Login failed.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred.");
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };

  return (
    
    <div className="flex items-center justify-center min-h-screen ">
      <form onSubmit={handleSubmit} className="bg-black bg-opacity-60 p-8 rounded-lg shadow-lg lg:w-96 w-80 text-sm">
        <h1 className="text-white text-2xl font-semibold text-center mb-14">Login</h1>
        
        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <input id="email" name="email" type="email" value={formData.email} placeholder="Email address" onChange={handleChange} className='bg-transparent outline-none text-white' required />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
        </div>
        
        <div className=" flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder='Password' className='bg-transparent outline-none text-white' required />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
        </div>

        <p onClick={()=>navigate("/user/reset-password")} className="text-sm px-5 py-2.5 text-gray-400 cursor-pointer  hover:text-blue-800">
          Forgot Password ?
        </p>
       

        <button className="w-full py-2.5 bg-blue-500 hover:bg-blue-800 text-white rounded-full mt-5 mb-5">Submit</button>
        
        <div className="flex w-full items-center text-gray-400 flex-col mt-5 gap-3">
        <p className="text-sm px-5 py-2.5 text-gray-400">
          New User? Click{" "}
          <Link to="/user/register" className="text-blue-600 underline">
            Sign Up
          </Link>
        </p>
        </div>
      </form>
    </div>
    
  );
};

export default Login;
