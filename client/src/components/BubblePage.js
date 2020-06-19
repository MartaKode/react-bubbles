import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const getColors = () =>{
    axiosWithAuth()
    .get('/api/colors')
    .then(res=>{
      // console.log(res)
      setColorList(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  
  useEffect(() =>{
  getColors()
  },[])
  // ``````````````added useEffect to render colors to the screen
  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} getColors={getColors}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
