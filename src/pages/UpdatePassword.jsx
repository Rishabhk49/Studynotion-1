import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../Service/Operation/authapi';
import {  AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

const UpdatePassword = () => {

    const dispatch=useDispatch(); 
    const location=useLocation();
    const navigate=useNavigate();

    const [formData,setFormdata]=useState({
        password:"",
        confirmPassword:"",
    })
    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword,setshowConfirmPassword]=useState(false)
    const {loading}=useSelector((state)=> state.auth);
    
    const {password,confirmPassword}=formData;

    const handleOnChange=(e)=>{
        setFormdata((prevData)=>(
            {
                ...prevData,
                [e.target.name]:e.target.value,
            
            }
        ))
    }
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        const token= location.pathname.split('/').at(-1); 
        dispatch(resetPassword(password,confirmPassword,token,navigate))

    }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">

        {
            loading ? (
                <div>
                Loading .....
                </div>
            ):(
                <div className="max-w-[500px] p-4 lg:p-8">
                    <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Choose new Password</h1>
                    <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100"> Almost done. Enter your new password and you are all set.</p>
                    <form onSubmit={handleOnSubmit}>
                    <label className='relative mt-4'>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        New Password<sup className="text-pink-200">*</sup></p>
                        <input
                        required
                        type={showPassword ? "text":"password"}
                        name='password'
                        value={password}
                        onChange={handleOnChange}
                        placeholder='Password'
                        style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                         }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"

                        />
                        <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-9 right-3 cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
                    </label>

            
            
            <label className="relative mt-3 block">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Confirm New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                 className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
              />
              <span
                onClick={() => setshowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

                    <button type='submit'  
                    className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                        Reset Password
                    </button>
                    <div className="mt-6 flex items-center justify-between">
                        <Link to="/login">
                        <p className="flex items-center gap-x-2 text-richblack-5">
                        <BiArrowBack />
                            Back to Login
                            </p>
                        </Link>
                    </div>


                    </form>
                </div>
                
            )
        }
    </div>
  )
}

export default UpdatePassword