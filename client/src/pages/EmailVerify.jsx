import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import UserContext from "../context/UserContext";


const EmailVerify=()=>{
    axios.defaults.withCredentials = true;
    const {backendUrl , isLoggedIn,userData,getUserData} = useContext(UserContext);

    const inputRefs = React.useRef([]);
    const navigate = useNavigate();

    const handleInput=(e,index)=>{
        if(e.target.value.length>0 && index < inputRefs.current.length - 1){
            inputRefs.current[index + 1].focus();
        }
    }

    const handleKeyDown=(e,index)=>{
        if(e.key === 'Backspace' && e.target.value ==='' && index > 0 ){
            inputRefs.current[index - 1].focus();
        }
    }

    const handleSubmit=async(e)=>{
       
        
        try{
            e.preventDefault();
            const otpArray = inputRefs.current.map(e => e.value);
            const otp = otpArray.join('');

            const {data} = await axios.post(backendUrl + '/api/auth/verify-account',{otp});

            if(data.success){
                toast.success(data.message);
                getUserData();
                navigate('/');
            }else{
                toast.error(data.message);
            }

        }catch(error){
            toast.error(error.message);
        }

    }

    useEffect(()=>{
        isLoggedIn && userData && userData.isAccountVerified && navigate('/')
    },[isLoggedIn,userData]);
    
    return(
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="bg-black bg-opacity-60 p-8 rounded-lg shadow-lg lg:w-96 w-80 text-sm" >
                <h1 className="text-white text-2xl font-semibold text-center mb-4">Email Verify OTP</h1>
                <p className="text-center mb-6 text-indigo-300" >Enter the 6-digit code sent to your email id.</p>
                <div className="flex justify-between mb-8">
                    {Array(6).fill(0).map((_,index)=>(
                        <input type='text' maxLength='1' key={index} required className="lg:w-12 lg:h-12 w-10 h-10 bg-[#333A5C] text-white text-center text-xl rounded-md" 
                        ref={e=> inputRefs.current[index]=e} onInput={(e)=>handleInput(e,index)} onKeyDown={(e)=>handleKeyDown(e,index)} />
                    ))}
                </div>
                <button className="w-full py-3  bg-blue-500 hover:bg-blue-800 text-white rounded-full ">Verify Email</button>
            </form>
        </div>
    )
}

export default EmailVerify;