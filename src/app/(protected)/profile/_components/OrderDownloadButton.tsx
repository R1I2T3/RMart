"use client";

import React from "react";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
const OrderDownloadButton = () => {
  const handleDownload = () => {
    const section = document.getElementById("downloadable-section"); // Access the section rendered by the server component
    if (section) {
      html2canvas(section).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "section-image.png";
        link.click();
      });
    }
  };
  return (
    <Button onClick={handleDownload} variant={"outline"}>
      <Download />
    </Button>
  );
};

export default OrderDownloadButton;
