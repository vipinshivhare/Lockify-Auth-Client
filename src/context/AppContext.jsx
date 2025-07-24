import { createContext, useEffect, useState } from "react";
import { AppConstants } from "../util/constants.js";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendURL = AppConstants.BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(false);

    // ✅ Helper to add Authorization header
    const authHeaders = () => {
        const token = localStorage.getItem("jwtToken");
        return token ? { Authorization: `Bearer ${token}` } : {};
    };


    const getUserData = async () => {
        try {
            const response = await axios.get(`${backendURL}/profile`, {
                headers: authHeaders() // direct helper use karo
            });
            if (response.status === 200) {
                setUserData(response.data);
            } else {
                toast.error("Unable to retrieve user profile!");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };



    const getAuthState = async () => {
        try {
            const response = await axios.get(`${backendURL}/is-authenticated`, {
                headers: authHeaders()
            });
            if (response.status === 200) {
                setIsLoggedIn(true);
                await getUserData();
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAuthState();
    }, []);

    const contextValue = {
        backendURL,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};
