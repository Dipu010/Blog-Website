import React ,{ createContext, useContext, useState } from "react";


export const BlogContext = createContext(null);
export const BlogProvider = (props) => {
  const [dataArray, setDataArray] = useState([]);
  return (
    <BlogContext.Provider value={{ dataArray, setDataArray }}>
      {props.children}
    </BlogContext.Provider>
  );
};
