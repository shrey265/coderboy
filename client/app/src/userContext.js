import { createContext } from "react";
import { useState } from "react";
export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [userInfo,setUserInfo] = useState({});
    const [loginBeforeRedirect, setLoginBeforeRedirect] = useState(false);
    return (
    // <UserContextProvider value={{userInfo,setUserInfo}}>
    <UserContext.Provider value={{userInfo,setUserInfo, loginBeforeRedirect, setLoginBeforeRedirect}}>
        {children}
    </UserContext.Provider>
         
    );
}