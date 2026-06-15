import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-[calc(100vh-3.5rem-1px)]">
        <div className="flex-1 flex flex-col h-full">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
