import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useContext, useRef, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const inputRef = useRef([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
    const { backendURL } = useContext(AppContext);

    axios.defaults.withCredentials = true;

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/\D/, "");
        e.target.value = value;
        if (value && index < 5) {
            inputRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputRef.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const paste = e.clipboardData.getData("text").slice(0, 6).split("");
        paste.forEach((digit, i) => {
            if (inputRef.current[i]) {
                inputRef.current[i].value = digit;
            }
        });
        const next = paste.length < 6 ? paste.length : 5;
        inputRef.current[next].focus();
    };

    const onSubmitEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${backendURL}/send-reset-otp?email=${email}`);
            if (response.status === 200) {
                toast.success("Reset OTP sent successfully.");
                setIsEmailSent(true);
            } else {
                toast.error("Something went wrong, Please try again later.");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = () => {
        const otpValue = inputRef.current.map((input) => input.value).join("");
        if (otpValue.length !== 6) {
            toast.error("Please enter all 6 digits of the OTP.");
            return;
        }
        setOtp(otpValue);
        setIsOtpSubmitted(true);
    };

    const onSubmitNewPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${backendURL}/reset-password`, { email, otp, newPassword });
            if (response.status === 200) {
                toast.success("Password reset successfully.");
                navigate("/login");
            } else {
                toast.error("Something went wrong, Please try again later.");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="d-flex align-items-center justify-content-center min-vh-100 position-relative"
            style={{ background: "linear-gradient(90deg, #6a5af9, #8268f9)" }}
        >
            {/* Logo top-left */}
            <Link
                to="/"
                className="position-absolute d-flex align-items-start text-decoration-none"
                style={{ top: "10px", left: "10px", color: "inherit" }}
            >
                <img src={assets.padlock} alt="logo" height={42} width={42} />
                <span className="fw-bold fs-4 text-light ms-0" style={{ marginTop: "7px" }}>
                    Lockify
                </span>
            </Link>


            {/* Card */}
            <div
                className="rounded-4 p-4 p-md-5 bg-white text-center"
                style={{ width: "90%", maxWidth: "400px", minWidth: "280px", boxSizing: "border-box" }}
            >
                {/* Step 1: Enter Email */}
                {!isEmailSent && (
                    <>
                        <h4 className="mb-2">Reset Password</h4>
                        <p className="mb-4">Enter your registered email address</p>
                        <form onSubmit={onSubmitEmail}>
                            <div className="input-group mb-4 bg-secondary bg-opacity-10 rounded-pill">
                                <span className="input-group-text bg-transparent border-0 ps-4">
                                    <i className="bi bi-envelope"></i>
                                </span>
                                <input
                                    type="email"
                                    className="form-control bg-transparent border-0 ps-1 pe-4 rounded-end"
                                    placeholder="Enter email address"
                                    style={{ height: "50px" }}
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                />
                            </div>
                            <button className="btn btn-primary w-100 py-2" type="submit" disabled={loading}>
                                {loading ? "Loading..." : "Submit"}
                            </button>
                        </form>
                    </>
                )}

                {/* Step 2: Enter OTP */}
                {isEmailSent && !isOtpSubmitted && (
                    <>
                        <h4 className="fw-bold mb-2">Email Verify OTP</h4>
                        <p className="mb-4">Enter the 6-digit code sent to your email.</p>
                        <div className="d-flex justify-content-between gap-2 mb-3">
                            {[...Array(6)].map((_, i) => (
                                <input
                                    key={i}
                                    type="text"
                                    maxLength={1}
                                    className="form-control text-center fs-4 otp-input"
                                    ref={(el) => (inputRef.current[i] = el)}
                                    onChange={(e) => handleChange(e, i)}
                                    onKeyDown={(e) => handleKeyDown(e, i)}
                                    onPaste={handlePaste}
                                    style={{ flex: "1 1 14%" }}
                                />
                            ))}
                        </div>
                        <button
                            className="btn btn-primary w-100 fw-semibold"
                            onClick={handleVerify}
                            disabled={loading}
                        >
                            {loading ? "Verifying..." : "Verify Email"}
                        </button>
                    </>
                )}

                {/* Step 3: New Password */}
                {isOtpSubmitted && (
                    <>
                        <h4 className="mb-2">New Password</h4>
                        <p className="mb-4">Enter the new password below</p>
                        <form onSubmit={onSubmitNewPassword}>
                            <div className="input-group mb-4 bg-secondary bg-opacity-10 rounded-pill">
                                <span className="input-group-text bg-transparent border-0 ps-4">
                                    <i className="bi bi-person-fill-lock"></i>
                                </span>
                                <input
                                    type="password"
                                    className="form-control bg-transparent border-0 ps-1 pe-4 rounded-end"
                                    placeholder="*******"
                                    style={{ height: "50px" }}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    value={newPassword}
                                    required
                                />
                            </div>
                            <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                                {loading ? "Loading..." : "Submit"}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;