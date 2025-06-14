import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu, X, Home, CalendarClock, Landmark, Users,
  GaugeCircle, Trophy, LogIn, LogOut, UserCircle, AlertTriangle
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import UserContext from "../context/UserContext";
import FinStreet_logo from "../assets/Finstreet-logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { userData, backendUrl, setUserData, isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(null);
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`);
      if (data.success) {
        toast.success(data.message);
        navigate("/user/email-verify");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const renderMenuItems = () => (
    <>
      <li>
        <Link to="/" className="flex items-center gap-2 text-yellow-100 hover:text-yellow-400" onClick={() => setIsMenuOpen(false)}>
          <Home size={18} /> Home
        </Link>
      </li>
      <li>
        <Link to="/calendar" className="flex items-center gap-2 text-yellow-100 hover:text-yellow-400" onClick={() => setIsMenuOpen(false)}>
          <CalendarClock size={18} /> Calendar
        </Link>
      </li>
      <li>
        <Link to="/events" className="flex items-center gap-2 text-yellow-100 hover:text-yellow-400" onClick={() => setIsMenuOpen(false)}>
          <Landmark size={18} /> Events
        </Link>
      </li>
      <li>
        <Link to="/admin" className="flex items-center gap-2 text-yellow-100 hover:text-yellow-400" onClick={() => setIsMenuOpen(false)}>
          <UserCircle size={18} /> Admin
        </Link>
      </li>
      <li>
        <Link to="/team" className="flex items-center gap-2 text-yellow-100 hover:text-yellow-400" onClick={() => setIsMenuOpen(false)}>
          <Users size={18} /> Team
        </Link>
      </li>
      <li>
        <Link to="/leaderboard" className="flex items-center gap-2 text-yellow-100 hover:text-yellow-400" onClick={() => setIsMenuOpen(false)}>
          <Trophy size={18} /> Leaderboard
        </Link>
      </li>

      {userData ? (
        <>
          {userData.isAccountVerified && (
            <li>
              <Link
                to="/user/dashboard"
                className="flex items-center gap-2 text-yellow-100 hover:text-yellow-400"
                onClick={() => setIsMenuOpen(false)}
              >
                <GaugeCircle size={18} /> Dashboard
              </Link>
            </li>
          )}

          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-yellow-100 hover:text-yellow-400"
            >
              <LogOut size={18} /> Logout
            </button>
          </li>
        </>
      ) : (
        <li>
          <Link
            to="/user/login"
            className="flex items-center gap-2 text-yellow-100 hover:text-yellow-400"
            onClick={() => setIsMenuOpen(false)}
          >
            <LogIn size={18} /> Login
          </Link>
        </li>
      )}
    </>
  );

  return (
    <>
      {/* 🔔 Top verification bar */}
      {userData && !userData.isAccountVerified && (
        <div className="w-full bg-yellow-100 text-black text-sm px-4 py-2 flex items-center justify-center gap-4 font-medium z-[60] fixed top-0 left-0 shadow-md">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 " />
            <span>Your account is not verified.</span>
          </div>
          <button
            onClick={sendVerificationOtp}
            className="bg-black text-yellow-100 px-3 py-1 rounded hover:bg-gray-800 transition-all text-sm flex items-center gap-2"
          >
            Verify Now
          </button>
        </div>
      )}

      {/* Adjust navbar position */}
      <nav className={`fixed ${userData && !userData.isAccountVerified ? "top-10" : "top-0"} left-0 w-full z-50 bg-black/70 backdrop-blur-md shadow-md text-white py-3 transition-all`}>
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <Link to="/">
              <img src={FinStreet_logo} alt="Finstreet Logo" className="w-12" />
            </Link>
            <h1 className="text-3xl font-bold flex items-center gap-1">
              <span className="text-yellow-400">Fin</span>
              <span className="font-street">Street</span>
            </h1>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white text-3xl"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-8 text-lg font-medium">
            {renderMenuItems()}
          </ul>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden px-6 py-6 bg-black/90 backdrop-blur-md animate-fade-in">
            <ul className="flex flex-col gap-4 items-start text-left text-lg font-medium">
              {renderMenuItems()}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
