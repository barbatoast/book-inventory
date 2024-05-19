import { Outlet } from "react-router-dom";
import { ModeToggle } from "./components/ModeToggle";

const Layout = () => {
  return (
    <>
      <div className="absolute top-8 right-0 h-16 w-16">
        <ModeToggle />
      </div>
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <div className="w-full max-w-md p-4 text-center">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
