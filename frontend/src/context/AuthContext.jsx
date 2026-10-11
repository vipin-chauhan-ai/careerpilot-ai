import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, refreshAccessToken } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({children}){
    const [isAuthenticated, SetIsAuthenticated] = useState(false);
    const[loading,setLoading] = useState(true);

    useEffect(()=>{
        async function restoreSession(){
            const refreshToken  =localStorage.getItem("refresh_token");
            if(!refreshToken){
                setLoading(false);
                return
            }
            try{
                const data = await refreshAccessToken(refreshToken);
                localStorage.setItem("access_token",data.access_token);
                SetIsAuthenticated(true)
            }catch{
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                 SetIsAuthenticated(false)
            } finally{
                setLoading(false)
            }
        }
          restoreSession();
},[])
        
    
  

async function login(email, password){
    const data = await loginUser({email,password});
    localStorage.setItem("access_token",data.access_token);
    localStorage.setItem("refresh_token",data.refresh_token);
    SetIsAuthenticated(true);
}

function logout(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    SetIsAuthenticated(false);
}

const value = {
    isAuthenticated,
    loading,
    login,
    logout

}

return (
    <AuthContext.Provider value={value} >{children}</AuthContext.Provider>
);
}


export function useAuth(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used inside AuthProvider")
    }
    return context;
}