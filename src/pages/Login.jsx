import {Link, useNavigate} from "react-router-dom";
import { assets } from "../assets/assets.js";
import {useContext, useState} from "react";
import axios from "axios";
import {AppContext} from "../context/AppContext.jsx";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [isCreateAccount, setIsCreateAccount] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { backendURL, setIsLoggedIn, getUserData } = useContext(AppContext);
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isCreateAccount) {
                const response = await axios.post(`${backendURL}/register`, { name, email, password });
                if (response.status === 201) {
                    toast.success("Account created successfully!");
                    navigate("/");
                } else {
                    toast.error("Email already exist!");
                }
            } else {
                const response = await axios.post(`${backendURL}/login`, { email, password });
                if(response.status === 200) {
                    const token = response.data.token; // AuthResponse me jo field ho
                    localStorage.setItem('jwtToken', token); // store token
                    setIsLoggedIn(true);
                    getUserData();
                    navigate("/");
                }
                else {
                    toast.error("Email / Password incorrect!");
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
    className="position-relative min-vh-100 d-flex justify-content-center align-items-center"
    style={{ background: "linear-gradient(90deg, #6a5af9, #8268f9)" }}
>
    {/* Logo top-left */}
    <div
        className="position-absolute d-flex align-items-start"
        style={{ top: "10px", left: "10px" }}
    >
        <Link
            to="/"
            className="d-flex align-items-start text-decoration-none"
            style={{ fontWeight: "bold", fontSize: "24px" }}
        >
            <img src={assets.padlock} alt="logo" height={42} width={42} />
            <span className="fw-bold fs-4 text-light ms-0" style={{ marginTop: "7px" }}>
                Lockify
            </span>
        </Link>
    </div>

    {/* Login / Signup Card */}
    <div
        className="card p-4"
        style={{
            width: "90%",
            maxWidth: "400px",
            minWidth: "280px",
            boxSizing: "border-box",
        }}
    >
        <h2 className="text-center mb-4">{isCreateAccount ? "Create Account" : "Login"}</h2>
        <form onSubmit={onSubmitHandler}>
            {isCreateAccount && (
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        className="form-control"
                        placeholder="Enter Fullname"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>
            )}

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Id</label>
                <input
                    type="text"
                    id="email"
                    className="form-control"
                    placeholder="Enter email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="**********"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </div>

            <div className="d-flex justify-content-between mb-3">
                <Link to="/reset-password" className="text-decoration-none">
                    Forgot Password?
                </Link>
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? "Loading..." : isCreateAccount ? "Sign Up" : "Login"}
            </button>
        </form>

        <div className="text-center mt-3">
            <p className="mb-0">
                {isCreateAccount ? (
                    <>
                        Already have an account?{" "}
                        <span
                            onClick={() => setIsCreateAccount(false)}
                            className="text-decoration-underline"
                            style={{ cursor: "pointer" }}
                        >
                            Login here
                        </span>
                    </>
                ) : (
                    <>
                        Don't have an account?{" "}
                        <span
                            onClick={() => setIsCreateAccount(true)}
                            className="text-decoration-underline"
                            style={{ cursor: "pointer" }}
                        >
                            Sign Up
                        </span>
                    </>
                )}
            </p>
        </div>
    </div>
</div>

    );
};

export default Login;
