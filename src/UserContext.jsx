import React, {createContext, useContext, useState} from 'react';
let UserContext = createContext()
export let UserProvider = ({children}) => {
 let [user, setUser] = useState(null)

 return (
    <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
 )
}
export let useUser = () => useContext(UserContext)