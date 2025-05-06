import { Outlet } from "react-router-dom";
import Banner from "./Banner";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-text flex flex-col">
      <Banner />
      <main className="flex-1 flex items-center justify-center px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
