import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"; // Import the translation hook
import { Image } from "../atoms/Image";
import "../../index.css";
// import { Button } from "../atoms/Button";
import Logo from "../../assets/logo1.png";
import { NavButtons, NavLinks } from "../particles/DataLists";
import { List } from "../atoms/List";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { ArrowCircleRight, CirclesFour, ShoppingCart, Wallet } from "@phosphor-icons/react";
import { Slide } from "react-awesome-reveal";
import Select from "react-select";
import USA from "../../assets/icons8-usa-48.png";
import FR from "../../assets/icons8-france-48.png";
import AR from "../../assets/icons8-saudi-arabia-48.png";
import Login from "./Login";
import Signup from "./Signup";
import LOGO from "../../assets/msidiya.png";
import logom from "../../assets/msidiya-m-logo.png"
import { useCart } from "./context/CartContext";
import { User, fetchUserData } from "../../utils/userData";
import Modal from '@mui/material/Modal';
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import wallet3d from '../../assets/3d-icon-wallet-with-pockets-money-cards.png'
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CloseOutlined } from "@mui/icons-material";
import { axiosClient } from "../../assets/lib/axiosClient";
import { getUserWalletBalance } from "../../services/wallet.services";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [userBalance, setUserBalance] = useState(0)
  const location = useLocation(); // Get the current location
  const [open, setOpen] = useState(false);
  const [navBarColor, setNavBarColor] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [amount, setAmount] = useState<number>(50);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError(""); // Clear error when closing modal
  };
  const fetchUserPoints = async () => {
    try {

      const amount = await getUserWalletBalance()
      setUserBalance(parseInt(amount))
    } catch (err) {
      console.error(err)
      setUserBalance(0)
    }
  }

  useEffect(() => {
    fetchUserPoints()
  }, [])

  // Use the translation hook
  const { t, i18n } = useTranslation();

  const switchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const switchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setAmount(value >= 50 ? value : 50);
    setError(""); // Clear error when user changes amount
  };

  const handleWalletFilling = async () => {
    try {
      setLoading(true);
      setError("");

      // Validate amount
      if (!amount || amount <= 0) {
        setError("Please enter a valid amount greater than 0");
        setLoading(false);
        return;
      }

      const data = {
        amount: amount
      };

      const response = await axiosClient.post("/api/e_wallet/checkout", data);

      if (response.status === 200) {
        // Success - you might want to redirect to payment page or show success message
        console.log("Checkout successful:", response.data);

        // If the API returns a redirect URL, you can navigate there
        if (response.data.checkout_url) {
          window.location.href = response.data.checkout_url;
        } else {
          // Close modal and show success message
          handleClose();
          // You might want to show a success toast here
          alert("Wallet filling initiated successfully!");
        }
      } else {
        setError("Failed to process wallet filling. Please try again.");
      }
    } catch (err: any) {
      console.error("Wallet filling error:", err);

      // Handle different types of errors
      if (err.response) {
        // Server responded with error status
        const errorMessage = err.response.data?.message || err.response.data?.error || "Server error occurred";
        setError(errorMessage);
      } else if (err.request) {
        // Network error
        setError("Network error. Please check your connection and try again.");
      } else {
        // Other error
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const listenScrollEvent = () => {
    if (location.pathname === "/") {
      const shouldChangeColor = window.scrollY > 10;
      if (shouldChangeColor !== navBarColor) {
        setNavBarColor(shouldChangeColor);
      }
    } else {
      if (!navBarColor) {
        setNavBarColor(true);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(listenScrollEvent);
    };
    window.addEventListener("scroll", handleScroll);
    listenScrollEvent();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname, navBarColor]);

  const languageOptions = [
    {
      value: "en",
      label: (
        <>
          <img src={USA} alt="US Flag" className="inline mr-2 w-8" /> EN
        </>
      ),
    },
    {
      value: "fr",
      label: (
        <>
          <img src={FR} alt="FR Flag" className="inline mr-2 w-8" /> FR
        </>
      ),
    },
    {
      value: "ar",
      label: (
        <>
          <img src={AR} alt="AR Flag" className="inline mr-2 w-8" /> AR
        </>
      ),
    },
  ];

  const handleLanguageChange = (selectedOption: any) => {
    i18n.changeLanguage(selectedOption.value); // Change the language
    document.documentElement.dir = selectedOption.value === "ar" ? "rtl" : "ltr"; // Adjust text direction for RTL languages
  };

  const toggleLoginPopup = () => {
    setShowLogin(!showLogin);
  };

  const toggleSignupPopup = () => {
    setShowSignup(!showSignup);
  };

  // Retrieve user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch user data from API (optional if you want to refresh periodically)
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUserData();
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUserData();

  }, []);

  // Callback to update user state on login success
  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowProfileDropdown(false);
    navigate("/"); // Redirect after logout
  };

  // Dashboard navigation based on user role
  const handleDashboard = () => {
    if (user) {
      if (user.Role === "Tutor") {
        navigate("/dashboard/teacher");
      } else if (user.Role === "Student") {
        navigate("/dashboardstudent/student");
      } else if (user.Role === "Ms_seller") {
        navigate("/dashboardseller/seller");
      } else {
        navigate("/");
      }
      setShowProfileDropdown(false);
    }
  };

  return (
    <header className="w-full h-auto bg-transparent overflow-visible fixed z-50 top-0 left-0">
      <Slide direction="down">
        <nav
          className={`w-full md:h-16 h-14 ${navBarColor ? "bg-white shadow_nav" : "bg-transparent"
            } lg:px-24 md:px-12 px-8 flex justify-between items-center`}
        >
          <a
            href="/"
            className="text-cyan-400 bold p-2 pt-2 m-2 mr-5"
            style={{ fontSize: "1rem" }}
          >
            <img src={LOGO} alt="Logo" width={200} />
          </a>
          <div className="lg:flex hidden items-center gap-6">
            <ul className="flex items-center justify-center gap-10">
              {NavLinks.map((navlink, index) => (
                <List className="w-full text-base" key={index}>
                  <NavLink
                    to={navlink.url}
                    className="relative inline-block overflow-hidden pt-2 pl-2 before:w-2 before:h-2 before:bg-color2 before:absolute before:top-2 before:-left-10 before:rounded-full before:transition-all before:duration-200 before:ease-in hover:before:left-0.5 after:w-0.5 after:h-3 after:bg-color2 after:absolute after:left-1 after:-top-10 hover:after:top-3.5 after:transition-all after:duration-200 after:ease-in whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    {t(navlink.name)} {/* Translate navigation links */}
                  </NavLink>
                </List>
              ))}
            </ul>
            <ul className="flex items-center justify-center gap-6">
              {/* Shopping Cart Icon */}
              <List className="relative flex flex-row justify-between items-center ">
                <button
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
                  onClick={() => navigate("/cart")}
                >
                  <ShoppingCart
                    size={24}
                    weight="fill"
                    className={`${navBarColor ? "text-gray-700" : "text-white"}`}
                  />

                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </button>
                {user ? (
                  <button onClick={handleOpen} className="border-black border-solid flex flex-row items-center  p-1 h-8 shadow-gray-400 shadow-sm bg-gray-200 rounded-md">
                    <img src={logom} className=" border-solid border-black" width={20} style={{ height: '1rem' }} alt="" />
                    {userBalance}
                  </button>
                ) : (
                  <div className="none hidden"></div>)}
              </List>
              {user ? (
                <div className="relative">
                  <img
                    src={user.Picture || "/default-avatar.png"}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full cursor-pointer object-cover"
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  />
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 z-50">
                      <button
                        onClick={handleDashboard}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        {t("dashboard")} {/* Translate dashboard button */}
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        {t("logout")} {/* Translate logout button */}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {NavButtons.map((navbutton, index) => (
                    <List className="w-full" key={index}>
                      <Button
                        onClick={
                          navbutton.name === "Login"
                            ? toggleLoginPopup
                            : navbutton.name === "Signup"
                              ? toggleSignupPopup
                              : () => navigate(navbutton.url)
                        }
                        type="button"
                        className={`py-2 px-8 text-base ${navBarColor ? "text-black" : "text-white"
                          } border-0 before:top-0 rounded-xl hover:bg-color2 transition-all`}
                      >
                        {t(navbutton.name)} {/* Translate buttons */}
                      </Button>
                    </List>
                  ))}
                </>
              )}
              <List className="text-gray-950 border-none">
                <Select
                  options={languageOptions}
                  onChange={handleLanguageChange}
                  defaultValue={languageOptions[0]}
                  className="bg-transparent border-none outline-none z-50 w-24 rounded-fullxl"
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: "transparent",
                      border: "none",
                      boxShadow: "none",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#0AA2A4",
                      },
                      zIndex: 99999,
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: navBarColor ? "black" : "white",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: "white",
                      maxHeight: "200px",
                      overflowY: "auto",
                      zIndex: 99999999,
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "black",
                    }),
                  }}
                />
              </List>
            </ul>
          </div>
          <div className="lg:hidden flex gap-4 items-center">
            {/* Mobile Shopping Cart Icon */}
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart
                size={24}
                weight="fill"
                className={`${navBarColor ? "text-gray-700" : "text-white"}`}
              />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
            {user && (
              <button onClick={handleOpen}>
                <Wallet />
              </button>
            )}
            <Select
              options={languageOptions}
              onChange={handleLanguageChange}
              defaultValue={languageOptions[0]}
              className="bg-white border border-gray-300 z-50 w-48"
              menuPortalTarget={document.body}
              menuPosition="fixed"
              styles={{
                menu: (provided) => ({
                  ...provided,
                  maxHeight: "200px",
                  overflowY: "auto",
                  zIndex: 9999,
                }),
              }}
            />
            <div
              className="hamburger text-gray-950 cursor-pointer"
              onClick={handleToggle}
            >
              <CirclesFour size={30} color="currentColor" weight="fill" />
            </div>
          </div>
        </nav>
      </Slide>
      {/* Mobile Nav */}
      <nav
        className={`flex justify-end lg:hidden h-screen w-full bg-gray-950/90 fixed top-0 ${open ? "right-0" : "-right-[120vw]"
          } transition-all duration-500 ease-out`}
      >
        <div
          className={`w-[70%] h-screen bg-white flex flex-col justify-between items-center relative ${open ? "right-0" : "-right-[120vw]"
            } transition-all duration-500 ease-out delay-300`}
        >
          <section className="w-full px-4 py-6 flex flex-col gap-16">
            <div className="w-full flex justify-between items-center">
              <Image
                as="a"
                href="/"
                className="md:h-10 h-8"
                image={Logo}
                alt="Logo"
              />
              <div
                className="hamburger text-gray-950 cursor-pointer"
                onClick={handleToggle}
              >
                <ArrowCircleRight
                  size={25}
                  color="currentColor"
                  weight="fill"
                />
              </div>
            </div>
            <ul className="flex flex-col gap-3 pl-2">
              {NavLinks.map((navlink, index) => (
                <List className="w-full text-base" key={index}>
                  <NavLink
                    to={navlink.url}
                    onClick={handleToggle}
                    className="w-full inline-block text-gray-950 hover:text-cyan-500 transition-all duration-300 ease-in whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    {t(navlink.name)} {/* Translate mobile navigation links */}
                  </NavLink>
                </List>
              ))}
            </ul>
          </section>
          <section className="w-full flex flex-col items-center gap-8 px-4 pb-16">
            <ul className="w-full flex flex-col items-center gap-2">
              {NavButtons.map((navbutton, index) => (
                <List className="w-full" key={index}>
                  <Button
                    onClick={
                      navbutton.name === "Login"
                        ? toggleLoginPopup
                        : navbutton.name === "Signup"
                          ? toggleSignupPopup
                          : () => navigate(navbutton.url)
                    }
                    type="button"
                    className={`py-2 px-8 w-full relative z-10 before:content-[''] before:absolute before:left-0 before:w-full 
                      before:h-0 before:bg-color2 before:-z-10 hover:before:h-full before:rounded-xl before:transition-all before:duration-300 
                      before:ease-in text-base ${navBarColor ? "text-black" : "text-white"
                      } ${navbutton.name === "Signup"
                        ? "border-0 border-gray-200 before:top-0 rounded-xl"
                        : "border-0 border-gray-200 before:top-0 rounded-xl"
                      } ${navBarColor ? "bg-transparent" : ""}`}
                  >
                    {t(navbutton.name)} {/* Translate mobile buttons */}
                  </Button>
                </List>
              ))}
            </ul>
          </section>
        </div>
      </nav>
      {/* Login Popup */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div
            className="relative bg-white p-2 pt-0 pb-0 rounded-lg shadow-lg"
            style={{ width: "60vw" }}
          >
            <button
              onClick={toggleLoginPopup}
              className="absolute top-2 right-5 text-color1 text-2xl hover:text-color1"
            >
              <i className="fa fa-close" aria-hidden="true"></i>
            </button>
            {/* Pass the onLoginSuccess callback to Login */}
            <Login
              onClose={toggleLoginPopup}
              onSwitchToSignup={switchToSignup}
              onLoginSuccess={handleLoginSuccess}
            />
          </div>
        </div>
      )}
      {/* Signup Popup */}
      {showSignup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div
            className="relative bg-white p-2 pt-0 pb-0 rounded-lg shadow-lg"
            style={{ width: "60vw" }}
          >
            <button
              onClick={toggleSignupPopup}
              className="absolute top-2 right-5 text-color1 text-2xl hover:text-color1 z-50"
            >
              <i className="fa fa-close" aria-hidden="true"></i>
            </button>
            <Signup onClose={toggleSignupPopup} onSwitchToLogin={switchToLogin} />
          </div>
        </div>
      )}

      {/* Enhanced Wallet Modal */}
      <Modal
        open={open}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="relative bg-white p-6 pt-4 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="w-full flex justify-end items-start mb-2">
            <Button className="min-w-0 p-1" onClick={handleClose}>
              <CloseOutlined className="text-gray-500 hover:text-gray-700" />
            </Button>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-row justify-between items-center w-full">
              <Typography id="modal-modal-title" variant="h6" component="h2" className="text-gray-800">
                Fill Your MS Wallet
              </Typography>
              <img src={wallet3d} width={80} height={80} alt="Wallet" />
            </div>

            <div className="w-full space-y-4">
              <TextField
                label="Amount"
                type="number"
                value={amount}
                onChange={handleAmountChange}
                fullWidth
                variant="outlined"
                inputProps={{
                  min: 50,
                  step: 0.01
                }}
                helperText="Enter the amount you want to add to your wallet"
                error={!!error}
              />

              {error && (
                <Typography color="error" variant="body2" className="text-center">
                  {error}
                </Typography>
              )}

              <Button
                variant="contained"
                fullWidth
                onClick={handleWalletFilling}
                disabled={loading || !amount || amount <= 0}
                className="bg-cyan-500 hover:bg-cyan-600 py-3"
              >
                {loading ? "Processing..." : `Add ${amount} to Wallet`}
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </header>
  );
};

export default NavBar;
