import React, { useEffect, useState } from "react";
import axios from "axios";
import NotificationStructure from "./NotificationStructure";
export default function NotificationRender(props) {
  const [notificationArray, setNotificationArray] = useState([]);
  console.log(notificationArray);
  const [loading, setLoading] = useState(1);
  const fetchNotification = async () => {
    const userNotifications = await axios.post(
      `http://localhost:4000/api/v1/getnotification`,
      { userName: props.userName },
      { withCredentials: true }
    );
    console.log(userNotifications);
    setLoading(0);
    setNotificationArray(userNotifications.data.message.notifications);
  };
  useEffect(() => {
    fetchNotification();
  }, []);
  return (
    <div>
      {loading ? (
        <div class="flex flex-row gap-2">
          <div class="w-2 h-2 rounded-full bg-slate-500  animate-bounce [animation-delay:.7s]"></div>
          <div class="w-2 h-2 rounded-full bg-slate-500 animate-bounce [animation-delay:.3s]"></div>
          <div class="w-2 h-2 rounded-full bg-slate-500 animate-bounce [animation-delay:.7s]"></div>
        </div>
      ) : (
        
           <div className=" flex flex-col justify-center items-center">
            {
                notificationArray.map((val)=>{
                    return(<NotificationStructure message={val.message} id={val.id}/>)
                })
            }
           </div>
        
      )}
    </div>
  );
}
