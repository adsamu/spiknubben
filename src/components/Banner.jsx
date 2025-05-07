import logo from "../logo.png";
// import "./Banner.css";

export default function Banner({ label = "GRÄSHARENSPELEN" }) {
  return (

      <div className="flex bg-primary items-center px-4 py-3 z-5">
        <img src={logo} alt="Logo" className="h-20 w-auto" />

        <div className="ml-auto text-right">
          <h1 className="text-3xl font-bold leading-none">{label}</h1>
          <p className="text-accent font-bold rotate-340 mt-1">2024</p>
        </div>
      </div>
  );
}

//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="9 11 20 5" className="w-[100%] h-auto">
//       {/* Banner shape */}
//       <path
//         d="M9 13C15 13 14 11 19 11 24 11 23 13 29 13Q28 14 26 14 27 15 28 15C26 16 21 14 19 16 17 14 13 16 10 15Q11 15 12 14 10 14 9 13"
//         stroke="#345F89"
//         strokeWidth="0.3"
//         fill="#D8B828"
//       />
//
//       {/* Invisible path for text arching */}
//       <defs>
//         <path
//           id="text-curve"
//           d="M14 14 Q19 13 24 14"
//           fill="none"
//         />
//       </defs>
//
//       {/* Arched text */}
//       <text fill="#345F89" fontSize="1.31" fontWeight="bold" fontFamily="sans-serif">
//         <textPath href="#text-curve" startOffset="50%" textAnchor="middle">
//           {label}
//         </textPath>
//       </text>
//     </svg>
//   );
// }
//
