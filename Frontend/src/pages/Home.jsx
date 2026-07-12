import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContentPage from "./ContentPage";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />
        <ContentPage />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
