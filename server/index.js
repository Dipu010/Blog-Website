import express from "express";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import dbConnector from "./config/dbconnection.js";
import { cloudinary } from "./utils/cloudinary.js";
import bodyParser from "body-parser"

const port=process.env.PORT || 5000;
// Parse JSON bodies
app.use(express.json({ limit: '5mb' }));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    methods:["GET","POST"],
    credentials:true
}))

import routes from "./routes/UserRoutes.js";
import blogRoute from "./routes/BlogRoutes.js";
import adminRoute from "./routes/AdminRoutes.js";
app.use('/api/v1',routes);
app.use('/api/v1',blogRoute);
app.use('/api/v1/admin',adminRoute);


dbConnector();
// Google Login

import session from "express-session";
import passport from "passport";
// const OAuth2Strategy = require("passport-google-oauth2").Strategy;
import OAuth2Strategy from "passport-google-oauth2"
import { User } from "./models/User.js";


const clientid = process.env.CLIENT_ID
const clientsecret =process.env.CLIENT_SECRET
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true
}))

// setuppassport
app.use(passport.initialize());
app.use(passport.session());
passport.use(
    new OAuth2Strategy.Strategy({
        clientID:clientid,
        clientSecret:clientsecret,
        callbackURL:"/api/v1/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        console.log(profile);
        try {
            let user = await User.findOne({googleId:profile.id});

            if(!user){
                user = new User({
                    googleId:profile.id,
                    displayName:profile.displayName,
                    email:profile.emails[0].value,
                    profilePicture:profile.photos[0].value
                });

                await user.save();
            }

            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
    )
)
passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});

// initial google ouath login
app.get("/api/v1/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/api/v1/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:5173/home",
    failureRedirect:"http://localhost:5173/login"
}))

app.get("/api/v1/login/success",async(req,res)=>{

    if(req.user){
        res.status(200).json({message:"user Login",user:req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
})

app.get("/api/v1/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect("http://localhost:5173");
    })
})
app.listen(port,()=>console.log(`server started at port ${port}`))
app.get("/",(req,res)=>{
    res.send("SERVER");
})
