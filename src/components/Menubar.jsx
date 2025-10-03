import {assets} from "../assets/assets.js";
import {useNavigate} from "react-router-dom";
import {use, useContext, useEffect, useRef, useState} from "react";
import {AppContext} from "../context/AppContext.jsx";
import axios from "axios";
import {toast} from "react-toastify";


const Menubar = () => {
    const navigate = useNavigate()
    const {userData, backendURL, setUserData, setIsLoggedIn} = useContext(AppContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target) ){
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown" , handleClickOutside)
    }, []);


    const handleLogout = async () => {
        try{
            const response = await axios.post(backendURL+ "/logout", );
            if(response.status === 200) {
                setIsLoggedIn(false);
                setUserData(false);
                navigate("/");
            }
        } catch (error){
            toast.error(error.response.data.message);
        }
    }

    const sendVerificationOtp = async () => {
        try {
            const response = await axios.post(
                backendURL + "/send-otp",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                    }
                }
            );
            if (response.status === 200) {
                navigate("/email-verify");
                toast.success("OTP has been sent successfully.");
            } else {
                toast.error("Unable to send OTP!");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };



    return (
        <nav className="navbar bg-white d-flex justify-content-between" style={{ padding: 0 }}>
        {/* Left side: logo + name */}
        <div className="d-flex align-items-start" style={{ paddingLeft: "10px", paddingTop: "10px" }}>
            <img src={assets.padlock} alt="logo" width={42} height={42} />
            <span className="fw-bold fs-4 text-dark ms-0" style={{ marginTop: "7px" }}>Lockify</span>
        </div>

        {/* Right side: login button or user dropdown */}
        <div className="d-flex align-items-center" style={{ paddingRight: "10px", paddingTop: "10px"}}>
            {userData ? (
                <div className="position-relative" ref={dropdownRef}>
                    <div
                        className="bg-dark text-white rounded-circle d-flex justify-content-center align-items-center"
                        style={{
                            width: "40px",
                            height: "40px",
                            cursor: "pointer",
                            userSelect: "none",
                        }}
                        onClick={() => setDropdownOpen((prev) => !prev)}
                    >
                        {userData.name[0].toUpperCase()}
                    </div>
                    {dropdownOpen && (
                        <div
                            className="position-absolute shadow bg-white rounded p-2"
                            style={{
                                top: "50px",
                                right: 0,
                                zIndex: 100,
                            }}
                        >
                            {!userData.isAccountVerified && (
                                <button
                                    type="button"
                                    className="dropdown-item py-1 px-2"
                                    style={{ cursor: "pointer", background: "transparent", border: "none", width: "100%", textAlign: "left" }}
                                    onClick={sendVerificationOtp}
                                >
                                    Verify email
                                </button>
                            )}
                            <button
                                type="button"
                                className="dropdown-item py-1 px-2 text-danger"
                                style={{ cursor: "pointer", background: "transparent", border: "none", width: "100%", textAlign: "left" }}
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    )}

                </div>
            ) : (
                <button
                    type="button"
                    className="btn btn-outline-dark rounded-pill px-3"
                    onClick={() => navigate("/login")}
                >
                    Login <i className="bi bi-arrow-right ms-2"></i>
                </button>

            )}
        </div>
    </nav>

    )
}

export default Menubar;