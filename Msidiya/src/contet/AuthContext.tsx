
import { createContext, ReactNode } from "react";
import { IUser } from "../interfaces/IUser";
import { queryManager } from "../services/query.manager";
import { useProfileQuery, usersQueryKeys } from "../services/users/users.queries";

interface AuthContextInterface {
  user: IUser | undefined,
  logout: () => void,
  isLoading: boolean,
  isError: boolean,
  refresh: () => void,
  isStudent: () => boolean,
  isSeller: () => boolean,
  isTeacher: () => boolean,
}

const initialState: AuthContextInterface = {
  user: undefined,
  isLoading: true,
  isError: false,
  logout: () => { },
  refresh: () => { },
  isStudent: () => false,
  isSeller: () => false,
  isTeacher: () => false,
}

export const authContext = createContext<AuthContextInterface>(initialState)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const { isLoading, data: user, isError } = useProfileQuery()

  const refresh = () => {
    queryManager.invalidate(usersQueryKeys.profile)
  }

  const isStudent = () => {
    return user != null && user.Role == "Student"
  }

  const isSeller = () => {
    return user != null && user.Role == "Ms_seller"
  }

  const isTeacher = () => {
    return user != null && user.Role == "Tutor"
  }
  const logout = () => {
    localStorage.removeItem("token")
  }

  const value: AuthContextInterface = {
    isLoading, // Pass the raw isLoading value
    isError,   // Add isError to the context
    user,
    refresh,
    logout,
    isStudent,
    isTeacher,
    isSeller
  }

  return (
    <authContext.Provider value={value}>
      {children}
    </authContext.Provider>
  )
}
