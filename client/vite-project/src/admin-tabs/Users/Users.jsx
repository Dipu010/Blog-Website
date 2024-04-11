import React, { useEffect, useState } from "react";
import { Hero } from "./hero-section/hero";
import axios from "axios";
import FamousUsers from "./top-users/tableusers";

export const Users = () => {
  const [dataUserGraph, setDataUserGraph] = useState([]);
  const [loading, setLoading] = useState(false);

  const dataUser = async () => {
    try {
      const data = await axios.get(
        "http://localhost:4000/api/v1/admin/showUserData"
      );
      setDataUserGraph(data.data.data.arr);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dataUser();
  }, []);
  console.log(dataUserGraph);
  const data = [
    {
      id: "Total Users",
      color: "hsl(210, 79%, 46%)",
      data: dataUserGraph,
    },
  ];

  return (
    <div className=" h-full w-full flex flex-col  rounded-xl gap-5 p-2">
      <div className=" w-[650px] h-[200px] flex gap-5">
        <div className="card w-[315px] h-[200px] bg-base-100 shadow-xl bg-gray-700 border-2 border-[#92b9ff] rounded-lg p-4">
          <div className="card-body">
            <p className=" text-2xl text-white text-center font-bold">
              Total Users
            </p>
            <div className="card-actions justify-end">
              <p></p>
            </div>
          </div>
        </div>

        <div className="card w-[300px] h-[200px] bg-base-100 shadow-xl bg-gray-700 border-2 border-[#92b9ff]  rounded-lg p-4">
          <div className="card-body">
            <p className=" text-2xl text-white text-center font-bold">
              Total Posts
            </p>
            <div className="card-actions justify-end">
              <p></p>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex gap-2">
        <div className=" h-[400px] w-[650px] border-2 border-[#92b9ff]  rounded-lg bg-gray-700">
          {loading ? <Hero data={data} /> : <></>}
        </div>

        <div className=" w-[600px] h-[620px]  mt-[-220px] rounded-lg border-2 border-[#92b9ff]  ml-2">

          <FamousUsers/>
        </div>
      </div>
    </div>
  );
};
