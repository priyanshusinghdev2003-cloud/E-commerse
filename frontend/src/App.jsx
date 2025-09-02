import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import HomeProduct from "./components/HomeProduct";
import { useAuthStore } from "./context/auth";
import Layout from "./components/Layout";
import { Route, Router, Routes } from "react-router-dom";
import ProductDes from "./Pages/ProductDes";
import HomeScreen from "./Pages/HomeScreen";

function App() {
  const user = useAuthStore((state) => state.user);
  const getProfile = useAuthStore((state) => state.getProfile);

  const fetchUserProfile = async () => {
    const res = await fetch("http://localhost:7000/api/auth/profile", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    getProfile(data?.getUser);
  };

  useEffect(() => {
    if (!user) {
      fetchUserProfile();
    }
  }, []);
  return (
    <div className="overflow-x-hidden  h-screen">
      <NavBar />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/:id" element={<ProductDes />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
