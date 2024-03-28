import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/Authcontex";
export default function (props) {
  const{reloadNotifications, setReloadNotifications} = useContext(AuthContext);
  const handleClick = async () => {
    const seen = await axios.post(
      `http://localhost:4000/api/v1/viewnotification`,
      { _id: props._id },
      { withCredentials: true }
    );
    reloadNotifications ? setReloadNotifications(0) : setReloadNotifications(1)
  };
  return (
    <div className=" box-border rounded-md w-[320px] p-[15px] mt-[5px] mb-[5px] text-white  hover:bg-slate-600 cursor-pointer"
       onClick={()=>{handleClick()}}>
      <div className=" text-white">{props.message}</div>
    </div>
  );
}
