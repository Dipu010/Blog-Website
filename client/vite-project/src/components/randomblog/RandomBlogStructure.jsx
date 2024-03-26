import React, { useContext, useState } from "react";
import BlogOwner from "../../blogRenderComponents/BlogOwner";
import { BlogContext } from "../../context/BlogContext";
import ShowComments from "../../blogRenderComponents/ShowComments";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { ToggleContext } from "../../context/togglePopup";


export default function RandomBlogStructure(props) {
  const { dataArray } = useContext(BlogContext);
  const [seemore, setSeemore] = useState(0);
  const [showComments, setShowComments] = useState(0);
  const {click,setClick}=useContext(ToggleContext)
  const navigate=useNavigate();
  const togglePopup = () => {
    setClick(!click);
    document.body.style.overflow = click ? 'auto' : 'hidden'; // Lock or unlock scroll
  };
  return (
    
    <div className=" mb-[70px]">
      <div className={`${click ?'fixed inset-0 bg-opacity-30 backdrop-blur-sm' : ''}`}></div>

      <div className=" box-border w-[690px] p-[20px] bg-slate-800 flex  rounded-t-md">
        <BlogOwner
          firstName={dataArray[props.i]._doc.owner.firstName}
          lastName={dataArray[props.i]._doc.owner.lastName}
          userName={dataArray[props.i]._doc.owner.userName}
          date={dataArray[props.i]._doc.createdAt}
          profilePicture={dataArray[props.i]._doc.owner.profilePicture}
          owner_id={dataArray[props.i]._doc.owner._id}
          onClick={()=>togglePopup()}
        ></BlogOwner>
      </div>
      <div className="relative box-border w-[690px] p-[20px] bg-slate-700 flex flex-col rounded-b-md cursor-pointer">
        <div className=" text-white text-[24px] font-semibold" onClick={()=>togglePopup()}>
          {dataArray[props.i]._doc.title}
        </div>
        <div className=" text-white mt-[20px] font-semibold text-[16px] cursor-pointer" onClick={()=>togglePopup()}>
          {dataArray[props.i]._doc.summary}
          <br />
          {!seemore ? (
            <span
              className=" cursor-pointer font-bold"
              onClick={() => {
                setSeemore(1);
              }}
            >
              ...see more
            </span>
          ) : (
            <span
              className=" cursor-pointer font-bold"
              onClick={() => {
                setSeemore(0);
              }}
            >
              &nbsp;&nbsp; see less
            </span>
          )}
        </div>
        {seemore ? (
          <div className=" text-white mt-[10px]" onClick={()=>togglePopup()}>
            {dataArray[props.i]._doc.description}
          </div>
        ) : (
          ""
        )}
        

        <div className=" mt-[20px]">
          <img
            className=" object-fill h-[350px] w-full cursor-pointer"
            src={dataArray[props.i]._doc.picture}
            onClick={()=>togglePopup()}
          />
        </div>
        <div className=" mt-[20px]">
          {dataArray[props.i].comments != 0 ? (
            <div
              className=" text-white cursor-pointer hover:underline ml-[550px]"
              onClick={() => {
                showComments ? setShowComments(0) : setShowComments(1);
              }}
            >
              {dataArray[props.i].comments} comments
            </div>
          ) : (
            ""
          )}
        </div>
        <div className=" box-border w-[650px] h-[2px] bg-slate-200 mt-[10px]"></div>
        {showComments ? (
          <ShowComments id={dataArray[props.i]._doc._id}></ShowComments>
        ) : (
          ""
        )}
      </div>
      {
        // This is the pop up Content
            click && <div className="fixed inset-0 flex items-center justify-center z-10 ">
              <div className="w-[700px] h-[400px] flex flex-col gap-5 bg-white justify-center items-center border-2 rounded-lg shadow-lg">
             <div className="flex justify-between">
             <p className="text-2xl text-center">Login To Watch The Unlimited and Exclusive Blogs in Our Website</p>
             <RxCross2 className=" mr-2 mt-2 hover:bg-red-300 text-xl" onClick={()=>togglePopup()}/>
             </div>
                <button type='button' onClick={()=>navigate("/login")} className=" bg-blue-700 rounded-full text-yellow-200 px-5 py-2">Sign In</button>
            </div>
            </div>
          }
    </div>
  );
}
