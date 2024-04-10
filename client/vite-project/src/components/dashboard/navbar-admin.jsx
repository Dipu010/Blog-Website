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
  Button,
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
import { AuthContext } from "../../context/Authcontex";
const NavbarAdmin = () => {
  return (
    <div className=" top-0 w-screen bg-[#1e293b] h-[100px] flex justify-center items-center shadow-gray-700 shadow-lg">
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
        BlogPedia
      </Typography>
    </div>
  );
};

export default NavbarAdmin;
