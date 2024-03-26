import { useContext, useState } from "react";
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
  Button
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
import { useDispatch, useSelector } from "react-redux";
// import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { AuthContext } from "../../context/Authcontex";
const Navbar = () => {
    const {data}=useContext(AuthContext);
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
//   const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const fullName = `${data.firstName} ${data.lastName}`;

  return (
  <div className="w-screen  z-30 fixed mb-8">
      <FlexBetween padding="1rem 6%" className=" bg-fixed bg-slate-800" >
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
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
           <input type="text" placeholder='Seach...' className="  border-white px-10 py-3 rounded-full ml-5"  />
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
              <LightMode sx={{ fontSize: "25px" }} />
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          {/* <FormControl variant="standard" value={fullName}> */}
           <button  type='button' onClick={()=>navigate("/login")} className=" bg-blue-700 rounded-full text-yellow-200 px-5 py-2"> Sign-In</button>
         
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

export default Navbar;
