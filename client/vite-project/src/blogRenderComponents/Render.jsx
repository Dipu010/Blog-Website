import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogStructure from "./BlogStructure";
export default function Render() {
  const [loading, setLoading] = useState(1);
  const [dataArray, setDataArray] = useState([]);
  console.log(dataArray);
  const getData = async () => {
    const parsedData = await axios.get(`http://localhost:4000/api/v1/getblog`, {
      withCredentials: true,
    });
    console.log(parsedData);
    setLoading(0);
    setDataArray([...parsedData.data.message.response]);
  };
  useEffect(() => {
    getData();
  }, []);

  return(
    <div className=" justify-center items-center flex flex-col gap-[70px] pt-[50px] pb-[50px]">
      {loading ? (
        <div className="absolute top-0 left-0 h-screen w-screen  justify-center items-center flex bg-black">
          <div className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]">
            <span className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"></span>
          </div>
        </div>
      ) : (
        <>
          {dataArray.map((val) => {
            return (
              <BlogStructure
                title={val._doc.title}
                description={val._doc.description}
                summary={val._doc.summary}
                firstName={val._doc.owner.firstName}
                lastName={val._doc.owner.lastName}
                userNmae={val._doc.owner.userNmae}
                date={val._doc.createdAt}
                image={val._doc.picture}
                id={val._doc._id}
                reaction={val.reaction.val}
                key={val._doc._id}
                comments = {val.comments}
              ></BlogStructure>
            );
          })}
        </>
      )}
    </div>
  )
}
