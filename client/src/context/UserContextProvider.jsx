import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const UserContextProvider = (props) => {
  
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);
  

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
      }
    } catch (error) {
      toast.error("Please Login to fetch your data");
      
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`);
      data.success ? setUserData(data.userData) : toast.error(data.message);

    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAuthState();
  },[]);

  const value = {
    backendUrl,
    userData,
    setUserData,
    isLoggedIn,
    setIsLoggedIn,
    getUserData,
  };

  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
