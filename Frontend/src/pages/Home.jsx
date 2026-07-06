import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContentPage from "./ContentPage";

const Home = () => {
  return (
    <div>
      <Navbar />

      <div className="mb-20">
        <ContentPage />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
