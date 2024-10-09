import { useState, useEffect } from "react";
import "../../index.css";
import loginimage from "../../assets/4957136_Mobile login.svg"
import ball from "../../assets/ball.svg"
import { Slide } from "react-awesome-reveal";
import { Select, Option } from "@material-tailwind/react";

interface SignupProps {
    onClose: () => void;
    onSwitchToLogin: () => void;}

const Signup: React.FC<SignupProps> = ({ onSwitchToLogin }) => {

    
  return (
    <div className="font-[sans-serif] p-5 ">
      
      <div className="relative pb-0 p-8 flex fle-col items-center justify-center py-6 px-4">
      <Slide direction="left" className="absolute " style={{top:"-0.8rem" , right:"-1.71rem",}}>

        <img src={ball} alt="" className=" rounded-br-lg "  />
        </Slide>
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full pb-0">
       
         <div>
         <Slide direction="right" >

            <img src={loginimage} alt=""  />
            </Slide>

            <p className="text-sm mt-12 text-gray-800">
            Already have an account?{" "}
              <a href="javascript:void(0);" onClick={onSwitchToLogin} className="text-blue-600 font-semibold hover:underline ml-1">
              Sign in here
              </a>
            </p>
          </div>
          <form className="max-w-md md:ml-auto w-full">
          <Slide direction="left" >

            <h3 className="text-gray-800 text-3xl font-extrabold mb-8">
              Sign up
            </h3>

            <div className="space-y-4">
              <div>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                  placeholder="Email address"
                />
              </div>
            <div className="">
            <select id="role" name="role" className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent">
    <option selected>Choose Role</option>
    <option value="Tutor">Tutor</option>
    <option value="Student">Student</option>
  </select>

            </div>
              <div>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                  placeholder="Password"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
              <input
                  name="confirmpassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                  placeholder="Confirme Password"
                />
              
              </div>
            </div>

            <div className="!mt-8">
            <button
  type="button"
  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
>
  Sign up
</button>

            </div>

            <div className="space-x-6 flex justify-center mt-8">
              <button
                type="button"
                className="border-none outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32px"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#fbbd00"
                    d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                  />
                  <path
                    fill="#0f9d58"
                    d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                  />
                  <path
                    fill="#31aa52"
                    d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                  />
                  <path
                    fill="#3c79e6"
                    d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                  />
                  <path
                    fill="#cf2d48"
                    d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                  />
                  <path
                    fill="#eb4132"
                    d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="border-none outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32px"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#1877f2"
                    d="M512 256c0 127.78-93.62 233.69-216 252.89V330h59.65L367 256h-71v-48.02c0-20.25 9.92-39.98 41.72-39.98H370v-63s-29.3-5-57.31-5c-58.47 0-96.69 35.44-96.69 99.6V256h-65v74h65v178.89C93.62 489.69 0 383.78 0 256 0 114.62 114.62 0 256 0s256 114.62 256 256z"
                  />
                  <path
                    fill="#fff"
                    d="M355.65 330 367 256h-71v-48.021c0-20.245 9.918-39.979 41.719-39.979H370v-63s-29.296-5-57.305-5C254.219 100 216 135.44 216 199.6V256h-65v74h65v178.889c13.034 2.045 26.392 3.111 40 3.111s26.966-1.066 40-3.111V330z"
                  />
                </svg>
              </button>
          
            </div>
            </Slide>
          </form>
       
        </div>
      </div>
    </div>
  );
};

export default Signup;
