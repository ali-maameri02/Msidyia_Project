import { useState } from "react";
import axios from "axios";
import "../../index.css";
import { Slide } from "react-awesome-reveal";

import loginimage from "../../assets/4957136_Mobile login.svg";
import ball from "../../assets/ball.svg";

interface SignupProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Role, setRole] = useState("");
  const [error] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/signup/`, { username, password, Role });
      console.log("Signup successful:", response.data);
      onSwitchToLogin();
      // Handle successful signup (e.g., redirect to login)
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="font-[sans-serif] p-5">
      <div className="relative pb-0 p-8 flex items-center justify-center py-6 px-4">
        <Slide
          direction="left"
          className="absolute"
          style={{ top: "-2.65rem", right: "-1.71rem" }}
        >
          <img src={ball} alt="" className="rounded-br-lg" />
        </Slide>
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full pb-0">
          <div>
            <Slide direction="right">
              <img src={loginimage} alt="" />
            </Slide>
            <p className="text-sm mt-12 text-gray-800">
              Already have an account?{" "}
              <a
                href="javascript:void(0);"
                onClick={onSwitchToLogin}
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                Sign in here
              </a>
            </p>
          </div>
          <form className="max-w-md md:ml-auto w-full" onSubmit={handleSignup}>
            <Slide direction="left">
              <h3 className="text-gray-800 text-3xl font-extrabold mb-8">
                Sign up
              </h3>

              <div className="space-y-4">
                <div>
                  <input
                    name="text"
                    type="text"
                    required
                    className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                    placeholder="Email address"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    name="password"
                    type="password"
                    required
                    className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <select
                    id="role"
                    name="Role"
                    required
                    className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                    value={Role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Choose Role</option>
                    <option value="Tutor">Tutor</option>
                    <option value="Ms_seller">Ms_seller</option>
                    <option value="Student">Student</option>
                  </select>
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}

                <div className="!mt-8">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </Slide>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
