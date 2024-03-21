import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './App.css'
import Login from "./login";
import Signup from "./Signup";
import TrainInfoPage from "./Traininfo";
import Mainpage from "./Mainpage";
import TrainCard from "./Traincard";
import TrainRouteMap from "./Trainroute";
import { useState } from "react";
function App() {
  const [trainNo,setTrainNo]=useState("")
const router=createBrowserRouter([
  {
    path:"/login",
    element:<Login></Login>
  }
  ,
  {
    path:"/signup",
    element:<Signup></Signup>
  },{
    path:"/trainform",
    element:<TrainCard></TrainCard>
  },{
    path:"/train-info/:trainNo",
    element:<TrainInfoPage></TrainInfoPage>
  },
  {
    path:"/train-route/:trainNo",
    element:<TrainRouteMap></TrainRouteMap>
  },
  {
    path:"mainpage",
    element:<Mainpage></Mainpage>
  }
])
  return (
    <>
    <RouterProvider router={router} />
  </>
  )
}

export default App
