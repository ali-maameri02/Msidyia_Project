import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import { Slide } from "react-awesome-reveal";
import { useLoginMutation } from "../../services/auth/auth.queries";

import loginimage from "../../assets/4957136_Mobile login.svg";
import ball from "../../assets/balleft.svg";
import { User } from "../../utils/userData";

interface LoginProps {
  onClose?: () => void;
  onSwitchToSignup: () => void;
  onLoginSuccess: (userData: User) => void;
}

const Login: React.FC<LoginProps> = ({
  onClose,
  onSwitchToSignup,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate(
      { username, password },
      {
        onSuccess: (data) => {
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("token", JSON.stringify(data));
          // window.location.reload();
          if (onLoginSuccess) {
            onLoginSuccess(data);
          }
          const { user_role } = data;
          if (user_role) {
            navigate("/");
            if (onClose) onClose();
          }
        },
        onError: (err: any) => {
          setError(err.response?.data?.message || "Something went wrong!");
        },
      }
    );
  };

  return (
    <div className="font-[sans-serif] p-5">
      <div className="relative pb-0 p-8 flex items-center justify-center py-6 px-4">
        <Slide
          direction="right"
          className="absolute"
          style={{ top: "-2.65rem", left: "-1.71rem" }}
        >
          <img src={ball} alt="" className="rounded-br-lg" />
        </Slide>
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full pb-0">
          <form className="max-w-md md:ml-auto w-full" onSubmit={handleLogin}>
            <Slide direction="right">
              <h3 className="text-gray-800 text-3xl font-extrabold mb-8">
                Sign in
              </h3>
              <div className="space-y-4">
                <div>
                  <input
                    name="username"
                    type="text"
                    autoComplete="text"
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
                    autoComplete="current-password"
                    required
                    className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <div className="!mt-8">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    Log in
                  </button>
                </div>
              </div>
            </Slide>
          </form>
          <div>
            <Slide direction="left">
              <img src={loginimage} alt="" />
            </Slide>
            <p className="text-sm mt-12 text-gray-800">
              Don't have an account
              <a
                href="javascript:void(0);"
                onClick={onSwitchToSignup}
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
