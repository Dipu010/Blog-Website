import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Authcontex";

export const Reroute = () => {
  const navigate = useNavigate();
   const {LoggedIn,setLoggedIn}=useContext(AuthContext)
  const dataLocal = JSON.parse(localStorage.getItem("ResPonse"));

  const authenticate = async () => {
    console.log("In Reroute");
    const response = await axios.get(
      `http://localhost:4000/api/v1/reauthenticate`,
      { withCredentials: true }
    );
    console.log(response);
    if (response.data.statusCode === 200) {
      console.log("Status code 200");
      setLoggedIn(true)
      navigate(`/${dataLocal.userName}/home`);
    }
    if (response.data.statusCode === 201) {
      console.log("Status code 201");
      setLoggedIn(true)
      navigate(`/${dataLocal.userName}/home`);
    }
    if(response.data.statusCode===203){
      console.log('Status code 203')
      localStorage.clear()
      navigate(`home`)
    }
  };

  authenticate();

  return (
    <div className="absolute top-0 left-0 h-screen w-screen  justify-center items-center flex  bg-black">
    <div className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]">
      <span className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"></span>
    </div>
  </div>
  );
};
