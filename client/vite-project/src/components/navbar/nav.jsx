import { useContext, useState, useEffect } from "react";

import axios from "axios";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { AuthContext } from "../../context/Authcontex";
const Nav = ({ data }) => {
  //function and states for notification
  const [showNotification, setShowNotification] = useState(0);
  const [notificationArray, setNotificationArray] = useState([]);
  const fetchNotification = async () => {
    showNotification ? setShowNotification(0) : setShowNotification(1)
    const userNotifications = await axios.post(
      `http://localhost:4000/api/v1/getnotification`,
      { userName: data.userName },
      { withCredentials: true }
    );
    console.log(userNotifications);
  };
  const [unreadNotifications, setUnreadNotifications] = useState(-1);

  const getUnreadNotificationCount = async () => {
    const notificationCount = await axios.post(
      `http://localhost:4000/api/v1/notificationcount`,
      { userName: data.userName },
      { withCredentials: true }
    );
    console.log(notificationCount);
    setUnreadNotifications(notificationCount.data.message.notificationCount);
  };
  useEffect(() => {
    getUnreadNotificationCount();
  }, []);

  //Function for logout
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(AuthContext);

  const logout = async () => {
    console.log("Logout");

    await axios.post(
      `http://localhost:4000/api/v1/logout`,
      { userName: data.userName },
      { withCredentials: true }
    );
    localStorage.clear();
    setLoggedIn(false);

    navigate(`/`);
    window.location.reload();
  };
  // console.log(data)

  // console.log(data)
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const fullName = `${data.firstName} ${data.lastName}`;
  // console.log(fullName)

  const [userData, setUserData] = useState({});
  // For google Login
  // console.log(userData);
  const getUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/login/success",
        { withCredentials: true }
      );
      // console.log(response);
      setUserData(response.data.user);
    } catch (error) {
      console.log("error", error);
    }
  };

  // useEffect(()=>
  // {getUser()}
  // ,[]);

  // Search Name
  const handleClick = (event) => {
    setIsDropdownVisible(false);
    setDataArray([]);
    event.preventDefault();
    setName({ ...name, [event.target.name]: event.target.value });
    searchName();
  };
  // for(let i=0;i<dataArray.length)
  const [name, setName] = useState({ nameToSearch: "" });
  const [dataArray, setDataArray] = useState([]);
  console.log(dataArray);
  const searchName = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/searchname",
        { ...name },
        { withCredentials: true }
      );
      console.log(response);
      setDataArray([...response.data.message.data]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    searchName();
  }, [name]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  return (
    <div className=" w-screen  z-30 fixed mb-8">
      <FlexBetween padding="1rem 6%" className=" bg-fixed bg-slate-800">
        <FlexBetween gap="1.75rem">
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
            onClick={() => navigate(`/${data.userName}/home`)}
            sx={{
              "&:hover": {
                // color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            BlogoPedia
          </Typography>
          {isNonMobileScreens && (
            <FlexBetween
              borderRadius="9px"
              gap="3rem"
              padding="0.1rem 1.5rem"
              className=" relative"
            >
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Search..."
                  className="  border-white px-10 py-3 rounded-full ml-5"
                  name="nameToSearch"
                  onChange={(event) => {
                    handleClick(event);
                    setIsDropdownVisible(event.target.value.length > 0);
                  }}
                  value={name.nameToSearch}
                />
                {isDropdownVisible && (
                  <div className="absolute top-full left-0 right-0 z-10 border border-gray-200 bg-gray-800 max-h-60 overflow-auto mt-1 rounded-lg shadow">
                    {dataArray.length > 0 ? (
                      dataArray.map((item, index) => (
                        <div
                          key={index}
                          className="p-2 hover:bg-gray-600 cursor-pointer"
                          onClick={() => {
                            navigate(`/${item.userName}/profile`);
                            setIsDropdownVisible(false);
                          }}
                        >
                          <div className="flex justify-between">
                            <div className=" text-yellow-100 ml-6 mt-2 text-[16px]">
                              {" "}
                              {item.firstName} {item.lastName}
                            </div>
                            <div className=" text-yellow-400 ml-6 mt-2 text-[16px]">
                              {" "}
                              {item.userName}{" "}
                            </div>
                            <img
                              src={item.profilePicture}
                              className="w-[40px] rounded-full"
                              alt=""
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">No results found.</div>
                    )}
                  </div>
                )}
              </div>
              <IconButton>
                <Search className=" text-yellow-50" />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>

        {/* DESKTOP NAV */}
        {isNonMobileScreens ? (
          <FlexBetween gap="2rem">
            <IconButton>
              <LightMode
                sx={{ fontSize: "25px" }}
                className=" text-yellow-50"
              />
            </IconButton>
            <Message sx={{ fontSize: "25px" }} className=" text-yellow-50" />

            {/* Notification is here */}
            <div className=" relative" onClick={()=>{fetchNotification()}}>
              <Notifications
                sx={{ fontSize: "25px" }}
                className=" text-yellow-50"
              />
              {unreadNotifications === -1 ? (
                <div className="absolute right-[0px] bottom-[20px] box-border rounded-full bg-red-600 h-[10px] w-[10px] animate-ping"></div>
              ) : unreadNotifications ? (
                <div className="absolute right-[0px] bottom-[20px] box-border rounded-full bg-red-600 h-[10px] w-[10px] text-white  flex justify-center items-center text-[10px]">
                  {unreadNotifications}
                </div>
              ) : (
                ""
              )}
              {
                showNotification ? <div className="absolute box-border h-[400px] w-[200px] bg-slate-800 border-white border-2 z-40 rounded-md ">
                    
                </div>:""
              }
            </div>
            {/* Notification ends here */}

            <Help sx={{ fontSize: "25px" }} className=" text-yellow-50" />
            <FormControl
              variant="standard"
              value={fullName || userData?.displayName}
            >
              <Select
                value={fullName || userData?.displayName}
                sx={{
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {},
                }}
                input={<InputBase className=" text-yellow-50" />}
              >
                <MenuItem
                  value={fullName || userData?.displayName}
                  className="text-yellow-50 px-4 rounded-full"
                >
                  <Typography className="text-yellow-50 [&>*:nth-child(2)]:bg-black">
                    {fullName || userData?.displayName}{" "}
                  </Typography>
                </MenuItem>
                <MenuItem>
                  {data.firstName == "Unknown" ? (
                    <div onClick={() => navigate("/login")}>Sign In</div>
                  ) : (
                    <div
                      onClick={() => {
                        logout();
                      }}
                    >
                      Log Out
                    </div>
                  )}
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
        )}
      </FlexBetween>
    </div>
  );
};

export default Nav;
