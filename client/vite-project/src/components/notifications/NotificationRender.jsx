import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import NotificationStructure from "./NotificationStructure";
import { AuthContext } from "../../context/Authcontex";
export default function NotificationRender(props) {
  const{reloadNotifications, setReloadNotifications} = useContext(AuthContext);
  const [seenNotificationArray, setSeenNotificationArray] = useState([]);
  const [unseenNotificationArray, setUnseenNotificationArray] = useState([]);
  console.log("seen");
  console.log(seenNotificationArray);
  console.log("unseen");
  console.log(unseenNotificationArray);
  const [loading, setLoading] = useState(1);
  const fetchNotification = async () => {
    const userNotifications = await axios.post(
      `http://localhost:4000/api/v1/getnotification`,
      { userName: props.userName },
      { withCredentials: true }
    );
    console.log(userNotifications);
    setLoading(0);
    var arr1 = [];
    var arr2 = [];
    userNotifications.data.message.notifications.map((val) => {
      val.view ? arr2.push(val) : arr1.push(val);
    });
    setSeenNotificationArray(arr2);
    setUnseenNotificationArray(arr1);
  };
  useEffect(() => {
    fetchNotification();
  }, [reloadNotifications]);
  return (
    <div>
      {loading ? (
        <div class="flex flex-row gap-2">
          <div class="w-2 h-2 rounded-full bg-slate-500  animate-bounce [animation-delay:.7s]"></div>
          <div class="w-2 h-2 rounded-full bg-slate-500 animate-bounce [animation-delay:.3s]"></div>
          <div class="w-2 h-2 rounded-full bg-slate-500 animate-bounce [animation-delay:.7s]"></div>
        </div>
      ) : (
        <div className=" flex flex-col ">
          {unseenNotificationArray.length > 0 ? (
            <div className=" text-white flex flex-col justify-center pt-1  max-h-[250px]  items-center mb-[20px]">
              <div className=" pr-[200px] text-orange-300">
                Unseen Notifications
              </div>
              <div className=" box-border bg-white h-[2px] w-[350px] mt-1"></div>
              <div className=" overflow-y-auto no-scrollbar">
                {unseenNotificationArray.map((val) => {
                  console.log(val);
                  return (
                    <NotificationStructure
                      key={val._id}
                      message={val.message}
                      _id={val._id}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            ""
          )}
          {seenNotificationArray.length > 0 ? (
            <div className=" text-white flex flex-col justify-center items-center max-h-[300px]  pt-1">
              <div className=" pr-[200px] text-orange-300">
                Seen Notifications
              </div>
              <div className=" box-border bg-white h-[2px] w-[350px] mt-1"></div>
              <div className=" overflow-y-auto no-scrollbar">
                {seenNotificationArray.map((val) => {
                  return (
                    <NotificationStructure
                      key={val._id}
                      message={val.message}
                      _id={val._id}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}
