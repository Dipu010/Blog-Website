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
import { AuthContext } from "../Context/Authcontex";
const Navbar = () => {
    const {data}=useContext(AuthContext);
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
//   const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const fullName = `${data.firstName} ${data.lastName}`;

  return (
    <FlexBetween padding="1rem 6%" >
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
            <InputBase placeholder="Search..."  />
            <IconButton>
              <Search />
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
          <FormControl variant="standard" value={fullName}>
           <Button onClick={()=>navigate("/register")} className=" bg-slate-400 rounded-sm"> Sign-Up</Button>
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
  );
};

export default Navbar;
