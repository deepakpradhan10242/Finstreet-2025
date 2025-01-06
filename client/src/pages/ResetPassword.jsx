import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";

const ResetPassword = ()=>{

    const {backendUrl} = useContext(UserContext);
    axios.defaults.withCredentials = true;

    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [isEmailSent,setIsEmailSent] = useState('');
    const [otp,setOtp] = useState(0);
    const [isOtpSubmitted,setIsOtpSubmitted] = useState(false);

    const inputRefs = React.useRef([]);
    

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

    const onSubmitEmail = async (e)=>{
        e.preventDefault();

        try{

            const {data} =await axios.post(backendUrl + '/api/auth/send-reset-otp',{email});
            data.success ? toast.success(data.message) : toast.error(data.message);
            data.success && setIsEmailSent(true);

        }catch(error){
            console.error(error.message);
        }
    }

    const onSubmitOtp = async (e)=>{
        e.preventDefault();
        const otpArray = inputRefs.current.map(e=>e.value);
        setOtp(otpArray.join(''));
        setIsOtpSubmitted(true);

    }

    const onSubmitNewPassword = async (e)=>{
        e.preventDefault();
        try{
            const {data} = await axios.post(backendUrl + '/api/auth/reset-password',{email,otp,newPassword});
            data.success ? toast.success(data.message) : toast.error(data.message);
            data.success && navigate('/user/login');
        }catch(error){
            toast.error(error.message);
        }
    }

    return(
        <div className="flex items-center justify-center min-h-screen">
            {/* enter email address */}
    
        {!isEmailSent &&
            <form onSubmit={onSubmitEmail}  className="bg-black bg-opacity-60  p-8 rounded-lg shadow-lg lg:w-96 w-80 text-sm">
                <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset password</h1>
                <p className="text-center mb-6 text-indigo-300" >Enter your registered email address</p>
                <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                    <input type="email" placeholder='Email Address' className='bg-transparent outline-none text-white'
                    value={email} onChange={e=>setEmail(e.target.value)} required />
                </div>

                <button className="w-full py-2.5  bg-blue-500 hover:bg-blue-800 text-white rounded-full mt-3">Submit</button>
            </form>
        }
            {/* otp input form */}
        {!isOtpSubmitted && isEmailSent &&
            <form onSubmit={onSubmitOtp}  className="bg-black bg-opacity-60 p-8 rounded-lg shadow-lg lg:w-96 w-80 text-sm" >
                <h1 className="text-white text-2xl font-semibold text-center mb-4">Password reset OTP</h1>
                <p className="text-center mb-6 text-indigo-300" >Enter the 6-digit code sent to your email Address</p>
                <div className="flex justify-between mb-8">
                    {Array(6).fill(0).map((_,index)=>(
                        <input type='text' maxLength='1' key={index} required className=" lg:w-12 lg:h-12 w-10 h-10 bg-[#333A5C] text-white text-center text-xl rounded-md" 
                        ref={e=> inputRefs.current[index]=e} onInput={(e)=>handleInput(e,index)} onKeyDown={(e)=>handleKeyDown(e,index)} />
                    ))}
                </div>
                <button className="w-full py-2.5  bg-blue-500 hover:bg-blue-800 text-white rounded-full ">Submit</button>
            </form>
        }
            {/* new pass form */}
        {isOtpSubmitted && isEmailSent &&
            <form onSubmit={onSubmitNewPassword} className="bg-black bg-opacity-60 p-8 rounded-lg shadow-lg lg:w-96 w-80 text-sm">
                <h1 className="text-white text-2xl font-semibold text-center mb-4">New password</h1>
                <p className="text-center mb-6 text-indigo-300" >Enter the new password below</p>
                <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                    <input type="password" placeholder='Password' className='bg-transparent outline-none text-white'
                    value={newPassword} onChange={e=>setNewPassword(e.target.value)} required />
                </div>

                <button className="w-full py-2.5  bg-blue-500 hover:bg-blue-800 text-white rounded-full mt-3">Submit</button>
            </form>
        }
        </div>
    )
}

export default ResetPassword;