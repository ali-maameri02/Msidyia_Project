import { useContext } from "react";
import { authContext } from "../contet/AuthContext";


export const useAuth = () => useContext(authContext)
