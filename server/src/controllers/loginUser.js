import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";

export const loginUser=async(req, res)=>{
  const { email, password } = req.body;

  try {

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password",
        success: false,
        error: true,
      });
    }


    const token = jwt.sign({id: user._id,}, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.status(200).json({
      message: "Login successful!",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal server error",
      error: true,
    });
  }
}


export const sendVerifyOtp = async(req,res)=>{
  try{
    const {userId} =req.body;
    const user = await userModel.findById(userId);

    if(user.isAccountVerified){
      return res.json({success:false, message:"User already verified"});
    }

    const otp = String(Math.floor (100000 + Math.random()*900000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24*60*60*1000;

    await user.save();
    const mailOptions ={
      from : process.env.SENDER_EMAIL,
      to : user.email,
      subject : "Account Verification OTP",
      text : `Your OTP is ${otp}. Verify your account using this OTP.`,

    }

    await transporter.sendMail(mailOptions);

    res.json({success:true, message:"Verification OTP sent on your Email"});

  }catch(error){
    res.json({success:false,message:error.message});
  }
}

export const verifyEmail = async(req,res)=>{
  const {userId,otp} = req.body;

  if(!userId || !otp){
    return res.json({success:false, message:"Missing Details"});
  }

  try{
    const user = await userModel.findById(userId);

    if(!user){
      return res.json({success:false, message:"User not found"});
    }

    if(user.verifyOtp==='' || user.verifyOtp !==otp){
      return res.json({success:false, message:"Invalid OTP"});
    }

    if(user.verifyOtpExpireAt < Date.now()){
      return res.json({success:false, message:"OTP expired"});
    }

    user.isAccountVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpireAt = 0;

    await user.save();

    return res.json({success:true,message:"Email verified successfully"});

  }catch(error){
    return res.json({success:false,message:error.message});
  }
}

export const isAuthenticated=async(req,res)=>{
  try{
      return res.json({success:true});
  }catch(error){
      res.json({
          success:false,
          message:error.message
      });  
  }
}

//pass reset otp

export const sendResetotp = async(req,res)=>{
  const {email} =req.body;

  if(!email){
    return res.json({success:false, message:"Email if required"});
  }

  try{
    const user = await userModel.findOne({email});
    if(!user){
      return res.json({success:false, message:"User not found"});
    }

    const otp = String(Math.floor (100000 + Math.random()*900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15*60*60*1000;

    await user.save();

    const mailOptions ={
      from : process.env.SENDER_EMAIL,
      to : user.email,
      subject : "Password Reset OTP",
      text : `Your OTP for resetting your password is ${otp}. Use this OTP to proceed with resetting your password.`,

    }

    await transporter.sendMail(mailOptions);

    return res.json({success:true, message:"OTP sent to your Email"});

  }catch(error){
    return res.json({success:false,message:error.message});
  }
}

//reset password

export const resetPassword = async(req,res)=>{
  const {email, otp, newPassword} = req.body;

  if(!email || !otp || !newPassword){
    return res.json({success:false, message:"All fields are required"});
  }

  try{
    const user = await userModel.findOne({email});
    if(!user){
      return res.json({success:false, message:"User not found"});
    }

    if(user.resetOtp === '' || user.resetOtp != otp){
      return res.json({success:false, message:"Invalid OTP"});
    }

    if(user.resetOtpExpireAt < Date.now()){
      return res.json({success:false, message:"OTP expired"});
    }

    const hashedPassword = await bcrypt.hash(newPassword,10);

    user.password = hashedPassword;
    user.resetOtp = '';
    user.resetOtpExpireAt = 0;

    await user.save();

    res.json({success:true,message:'Password has been reset successfully!'});
    

  }catch(error){
    return res.json({success:false, message:error.message});
  }
}


