import { useContext, useState,useEffect } from "react";
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
const Nav = ({data}) => {
    console.log(data)
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
 
  const navigate = useNavigate();

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const fullName = `${data.firstName} ${data.lastName}`;
  console.log(fullName)

  const [userData,setUserData]=useState({});
  const [loginData,setLoginData]=useState({});
  // For google Login
  console.log(userData);
   const getUser=async()=>{
    try {
      const response=await axios.get('http://localhost:4000/api/v1/login/success',{withCredentials:true});
      console.log(response);
      setUserData(response.data.user);
    } catch (error) {
      console.log("error", error);
    }
   }
   const logout = ()=>{
    window.open("http://localhost:4000/api/v1/logout","_self")
}
useEffect(()=>
{getUser()}
,[]);
  return (
   <div className="w-screen  z-30 fixed ">
        <FlexBetween padding="1rem 6%"  className=" bg-fixed bg-slate-800">
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
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
          >
            <input type="text" placeholder="Search..." className="  border-white px-10 py-3 rounded-full ml-5"  />
            <IconButton>
              <Search className=" text-yellow-50"/>
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton >
              <LightMode sx={{ fontSize: "25px" }} className=" text-yellow-50"/>
          </IconButton>
          <Message sx={{ fontSize: "25px" }} className=" text-yellow-50" />
          <Notifications sx={{ fontSize: "25px" }} className=" text-yellow-50"/>
          <Help sx={{ fontSize: "25px" }} className=" text-yellow-50"/>
          <FormControl variant="standard" value={fullName || userData?.displayName}>
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
                "& .MuiSelect-select:focus": {
                },
              }}
              input={<InputBase className=" text-yellow-50"/>}
            >
              <MenuItem value={fullName || userData?.displayName} className="text-yellow-50 px-4 rounded-full">
                <Typography className="text-yellow-50 [&>*:nth-child(2)]:bg-black">{fullName || userData?.displayName} </Typography>
              </MenuItem>
              <MenuItem onClick={logout} >Log Out</MenuItem>
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

      {/* MOBILE NAV */}
      {/* {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
        > */}
          {/* CLOSE ICON */}
          {/* <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box> */}

          {/* MENU ITEMS */}
          {/* <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              sx={{ fontSize: "25px" }}
            >
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
           
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem >
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )} */}
    </FlexBetween>
   </div>
  );
};

export default Nav;
