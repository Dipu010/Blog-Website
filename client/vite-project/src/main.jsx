import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/Authcontex.jsx";
import {BlogProvider} from "./context/BlogContext.jsx"
import { MyBlogProvider } from "./context/myBlogContex.jsx";
import { ToggleProvider } from "./context/togglePopup.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <BlogProvider>
      <AuthProvider>
       <MyBlogProvider>
       <ToggleProvider>
       <App />
       </ToggleProvider>
       </MyBlogProvider>
      </AuthProvider>
    </BlogProvider>
  </BrowserRouter>

  
);
