import { useState, useEffect } from "react";
import { Image } from "../atoms/Image";
import "../../index.css";
import { Button } from "../atoms/Button";
import Logo from "../../assets/logo1.png";
import { NavButtons, NavLinks } from "../particles/DataLists";
import { List } from "../atoms/List";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowCircleRight, CirclesFour } from "@phosphor-icons/react";
import { Slide } from "react-awesome-reveal";
import Select from "react-select";
import USA from "../../assets/icons8-usa-48.png";
import FR from "../../assets/icons8-france-48.png";
import AR from "../../assets/icons8-saudi-arabia-48.png";
import Login from "./Login";
import Signup from "./Signup"; // Import Signup component

const NavBar: React.FC = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [navBarColor, setNavBarColor] = useState(false);
    const [showLogin, setShowLogin] = useState(false); // State to manage login popup visibility
    const [showSignup, setShowSignup] = useState(false); // State to manage signup popup visibility

    const switchToSignup = () => {
        setShowLogin(false); // Hide the login popup
        setShowSignup(true); // Show the signup popup
    };

    const switchToLogin = () => {
        setShowSignup(false); // Hide the signup popup
        setShowLogin(true); // Show the login popup
    };

    const handleToggle = () => {
        setOpen(!open);
    };

    const listenScrollEvent = () => {
        window.scrollY > 10 ? setNavBarColor(true) : setNavBarColor(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => {
            window.removeEventListener("scroll", listenScrollEvent);
        };
    }, []);

    const languageOptions = [
        {
            value: "EN",
            label: (
                <>
                    <img src={USA} alt="US Flag" className="inline mr-2 w-8" /> EN
                </>
            ),
        },
        {
            value: "FR",
            label: (
                <>
                    <img src={FR} alt="FR Flag" className="inline mr-2 w-8" /> FR
                </>
            ),
        },
        {
            value: "AR",
            label: (
                <>
                    <img src={AR} alt="AR Flag" className="inline mr-2 w-8" /> AR
                </>
            ),
        },
    ];

    const handleLanguageChange = (selectedOption: any) => {
        navigate(`/#${selectedOption.value.toLowerCase()}`);
    };

    const toggleLoginPopup = () => {
        setShowLogin(!showLogin); // Toggle login popup visibility
        // setShowSignup(!showSignup); // Toggle login popup visibility
    };

    const toggleSignupPopup = () => {
        setShowSignup(!showSignup);
        // setShowLogin(!showLogin); // Toggle login popup visibility
    };

    return (
        <header className="w-full h-auto bg-transparent overflow-visible fixed z-50 top-0 left-0">
            <Slide direction="down">
                <nav className={`w-full md:h-16 h-14 ${navBarColor ? "bg-white shadow_nav" : "bg-transparent"} lg:px-24 md:px-12 px-8 flex justify-between items-center`}>
                    <a href="/" className="text-cyan-400 bold" style={{ fontSize: "2rem" }}>Msidiya</a>
                    <div className="lg:flex hidden items-center gap-6">
                        <ul className="flex items-center justify-center gap-10">
                            {NavLinks.map((navlink, index) => (
                                <List className="w-full text-base" key={index}>
                                    <NavLink
                                        to={navlink.url}
                                        className="relative inline-block overflow-hidden pt-2 pl-2 before:w-2 before:h-2 before:bg-color2 before:absolute before:top-2 before:-left-10 before:rounded-full before:transition-all before:duration-200 before:ease-in hover:before:left-0.5 after:w-0.5 after:h-3 after:bg-color2 after:absolute after:left-1 after:-top-10 hover:after:top-3.5 after:transition-all after:duration-200 after:ease-in whitespace-nowrap overflow-hidden text-ellipsis"
                                    >
                                        {navlink.name}
                                    </NavLink>
                                </List>
                            ))}
                        </ul>
                        <ul className="flex items-center justify-center gap-6">
                            {NavButtons.map((navbutton, index) => (
                                <List className="w-full" key={index}>
                                    <Button
                                        onClick={navbutton.name === 'Login' ? toggleLoginPopup : navbutton.name === 'Signup' ? toggleSignupPopup : () => navigate(navbutton.url)} // Toggle popup for login or signup
                                        type="button"
                                        className={`py-2 px-8 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full 
                                          before:h-0 before:bg-color2 before:-z-10 hover:before:h-full before:rounded-xl before:transition-all before:duration-300 
                                          before:ease-in text-base ${navBarColor ? 'text-black' : 'text-white'} ${navbutton.name === 'Signup' ? 
                                          'border-0 border-gray-200 before:top-0 rounded-xl' : 'border-0 border-gray-200 before:top-0 rounded-xl'}
                                          ${navBarColor ? 'bg-transparent' : ''}`}>
                                        {navbutton.name}
                                    </Button>
                                </List>
                            ))}
                            <List className="text-gray-950 border-none">
                                <Select
                                    options={languageOptions}
                                    onChange={handleLanguageChange}
                                    defaultValue={languageOptions[0]}
                                    className="bg-transparent border-none outline-none z-50 w-24 rounded-fullxl"
                                    menuPortalTarget={document.body} // Render the menu in the body element
                                    menuPosition="fixed" // Ensure the menu stays fixed relative to the viewport
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            backgroundColor: 'transparent', // Make the background transparent
                                            border: 'none', // Remove the border
                                            boxShadow: 'none', // Remove the default box shadow
                                            cursor: 'pointer', // Change cursor to pointer
                                            '&:hover': {
                                                backgroundColor: '#0AA2A4', // Ensure it stays transparent on hover
                                            },
                                            zIndex: 99999, // Ensure the control stays above other elements
                                        }),
                                        singleValue: (provided) => ({
                                            ...provided,
                                            color: 'black', // Set default text color
                                        }),
                                        menu: (provided) => ({
                                            ...provided,
                                            backgroundColor: 'white',
                                            maxHeight: '200px', // Adjust the max height to prevent overflow
                                            overflowY: 'auto',
                                            zIndex: 99999999, // Ensure it appears above other elements
                                        }),
                                        placeholder: (provided) => ({
                                            ...provided,
                                            color: 'black', // Set placeholder color
                                        }),
                                    }}
                                />
                            </List>
                        </ul>
                    </div>
                    <div className="lg:hidden flex gap-4 items-center">
                        <Select
                            options={languageOptions}
                            onChange={handleLanguageChange}
                            defaultValue={languageOptions[0]}
                            className="bg-white border border-gray-300 z-50 w-48"
                            menuPortalTarget={document.body} // Render the menu in the body element
                            menuPosition="fixed" // Ensure the menu stays fixed in the viewport
                            styles={{
                                menu: (provided) => ({
                                    ...provided,
                                    maxHeight: '200px',
                                    overflowY: 'auto',
                                    zIndex: 9999,
                                }),
                            }}
                        />
                        <div className="hamburger text-gray-950 cursor-pointer" onClick={handleToggle}>
                            <CirclesFour size={30} color="currentColor" weight="fill" />
                        </div>
                    </div>
                </nav>
            </Slide>

            {/* Mobile Nav */}
            <nav className={`flex justify-end lg:hidden h-screen w-full bg-gray-950/90 fixed top-0 ${open ? "right-0" : "-right-[120vw]"} transition-all duration-500 ease-out`}>
                <div className={`w-[70%] h-screen bg-white flex flex-col justify-between items-center relative ${open ? "right-0" : "-right-[120vw]"} transition-all duration-500 ease-out delay-300`}>
                    <section className="w-full px-4 py-6 flex flex-col gap-16">
                        <div className="w-full flex justify-between items-center">
                            <Image as="a" href="/" className="md:h-10 h-8" image={Logo} alt="Logo" />
                            <div className="hamburger text-gray-950 cursor-pointer" onClick={handleToggle}>
                                <ArrowCircleRight size={25} color="currentColor" weight="fill" />
                            </div>
                        </div>
                        <ul className="flex flex-col gap-3 pl-2">
                            {NavLinks.map((navlink, index) => (
                                <List className="w-full text-base" key={index}>
                                    <NavLink to={navlink.url} onClick={handleToggle} className="w-full inline-block text-gray-950 hover:text-cyan-500 transition-all duration-300 ease-in whitespace-nowrap overflow-hidden text-ellipsis">
                                        {navlink.name}
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
                                        onClick={navbutton.name === 'Login' ? toggleLoginPopup : navbutton.name === 'Signup' ? toggleSignupPopup : () => navigate(navbutton.url)} // Toggle popup for login or signup
                                        type="button"
                                        className={`py-2 px-8 w-full relative z-10 before:content-[''] before:absolute before:left-0 before:w-full 
                                          before:h-0 before:bg-color2 before:-z-10 hover:before:h-full before:rounded-xl before:transition-all before:duration-300 
                                          before:ease-in text-base ${navBarColor ? 'text-black' : 'text-white'} ${navbutton.name === 'Signup' ? 
                                          'border-0 border-gray-200 before:top-0 rounded-xl' : 'border-0 border-gray-200 before:top-0 rounded-xl'}
                                          ${navBarColor ? 'bg-transparent' : ''}`}>
                                        {navbutton.name}
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
                                        <div className="relative bg-white p-2 pt-0 pb-0 rounded-lg shadow-lg" style={{width:'60vw'}}>
                                        <button onClick={toggleLoginPopup} className="absolute top-2 right-5 text-color1 text-2xl hover:text-color1">
                            <i className="fa fa-close" aria-hidden="true"></i>
                        </button>

                    <Login onClose={toggleLoginPopup} onSwitchToSignup={switchToSignup} />
                    </div>
                </div>
            )}

            {/* Signup Popup */}
            {showSignup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">

                                                            <div className="relative bg-white p-2 pt-0 pb-0 rounded-lg shadow-lg" style={{width:'60vw'}}>
 <button onClick={toggleSignupPopup} className="absolute top-2 right-5 text-color1 text-2xl hover:text-color1 z-50">
                            <i className="fa fa-close" aria-hidden="true"></i>
                        </button>
                    <Signup onClose={toggleSignupPopup} onSwitchToLogin={switchToLogin} />
                    </div>

                </div>
            )}
        </header>
    );
};

export default NavBar;
