import { useState } from "react";

import logo from "@/logo.png";
// import "./Banner.css";

export default function Banner({ label = "SPIKNUBBEN" }) {
  const [flipped, setFlipped] = useState(false);

  return (

    <div className="flex bg-clouds items-center justify-center px-5 py-5 z-5">
      <img src={logo} alt="Logo" className="h-30 w-auto" />

      <div
        onClick={() => setFlipped(!flipped)}
        className="ml-auto w-full h-30 text-right perspective-midrange">

        <div className={`relative size-full transition duration-500 transform-3d ${flipped ? "rotate-y-180" : ""}`}>

          {/* Front */}
          <div className="absolute inset-0 size-full backface-hidden">
            <div className="flex h-full w-full flex-col items-center justify-center bg-clouds " >
              <h1 className="text-3xl font-bold leading-none">GRÄSHAREN-SPELEN</h1>
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 size-full backface-hidden rotate-y-180">
            <div className="flex h-full w-full flex-col items-center justify-center bg-clouds " >
              <h1 className="text-4xl font-bold leading-none">SPIKNUBBEN</h1>
            </div>
          </div>

        </div>

        <p className="text-accent font-bold rotate-340 mt-5">2025</p>
      </div>

    </div>
  );
}

