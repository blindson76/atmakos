import React, {createContext, useContext, useState, useEffect} from 'react';
import * as AuthSvc from '../services/authSvc'


const AuthProvider = ({children}) => {
  const [user, setUser] = useState(AuthSvc.getRealmApp().currentUser);

  useEffect(() => {
    if (!user) {
      return;
    }
  }, [user]);

  const signIn = async (email, pass) => {
    const user = await AuthSvc.loginEmailPassword(email, pass);
    if(user){
      setUser(user)
    }
    return user;
  }
  const signUp = async (newuser) => {
    const user = await AuthSvc.registerUser(newuser);
    if(user){
      setUser(user)
    }
    return user;
  };

  const signOut = async () => {
    console.log("signout")
    if (user == null) {
      console.warn("Not logged in, can't log out!");
      return;
    }
    user.logOut();
    setUser(null);
  };
  return (
    <Context.Provider value={{user, signIn, signUp, signOut}}>{children}</Context.Provider>
  );
};

const Context = createContext();
export const useAuth = () => {
    return useContext(Context)
}
export default AuthProvider;