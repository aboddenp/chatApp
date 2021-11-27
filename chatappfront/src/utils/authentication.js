import {createContext,useState,useContext} from 'react';
import Api from '../helper/api';
import {useLocation, Navigate} from 'react-router-dom';

let AuthContext = createContext(null);
const api = new Api();

function AuthProvider(props){
  let [user,setUser] = useState(null);

  let signin = (userData,callback) => {
    api.login(userData).then((response)=>{
        setToken(response.data.token);
        setUser(userData.get('username'));
        callback();
  
      }).catch((error)=>{
        alert("invalid credentials")
        console.log(error);
      })
  }

  let signup = (userData,callback) => {
    api.register(userData).then((response)=>{
        setToken(response.data.token);
        setUser(userData.get('username'));
        callback();
  
      }).catch((error)=>{
        alert("invalid credentials")
        console.log(error);
      })
  }

  let signout = (callback) => {
    setUser(null);
    sessionStorage.setItem('token',null);
    callback();
  }

  let value = {user,signin,signout,signup}

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}

function useAuth(){
    return useContext(AuthContext);
}

function RequireAuth({children}){
    let auth = useAuth();
    let location = useLocation();

    if(!auth.user){
        //redirect to login page and remember current wanted resource
        return <Navigate to="/login" state={{from:location}}/>;
    }
    // user is signed in 
    return children;
}

function setToken(userToken){
    sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken(){
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
}

export { AuthProvider, useAuth, RequireAuth, getToken}