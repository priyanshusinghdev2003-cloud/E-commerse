import React from "react";
import NavBar from "./components/NavBar";
import HomeProduct from "./components/HomeProduct";

function App() {
  return (
    <div className="flex flex-row gap-3 items-center  h-screen">
      <NavBar />
      <HomeProduct />
    </div>
  );
}

export default App;
