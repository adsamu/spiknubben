import { Outlet } from "react-router-dom";
import Banner from "./Banner";
import Background from "./Background"

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-text flex flex-col pb-10">
      <Banner />

      <Background />      

      <main className="flex-1 flex items-start justify-center px-4 mt-10 z-5">
        <Outlet />
      </main>
    </div>
  );
}
