// src/components/ScratchCard.jsx
import React from "react";
import ScratchCard from "react-scratchcard";

const settings = {
  width: 300,
  height: 120,
  image: "", // use any gray/opaque image or create a div background
  finishPercent: 60,
  onComplete: () => {
    console.log("Scratch completed!");
  },
};

const ScratchCardComponent = () => {
  return (
    <div className="flex justify-center my-6">
      <div className="text-center">
        <div className="text-xl font-semibold mb-2 text-gray-700">Scratch Me</div>
        <ScratchCard {...settings}>
          <div className="bg-white h-full w-full flex items-center justify-center px-4 py-2 text-sm text-gray-800">
            Register with a random mail — no checks or mails are sent.
          </div>
        </ScratchCard>
      </div>
    </div>
  );
};

export default ScratchCardComponent;
