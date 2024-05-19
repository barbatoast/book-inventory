import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";

const Error404 = () => {
  return (
    <>
      <h1 className="text-4xl font-extrabold mb-2">Error 404</h1>
      <h3 className="text-2xl font-semibold mb-2">Page Not Found</h3>
      <Button asChild>
        <Link to="/">Back to Home</Link>
      </Button>
    </>
  );
};

export default Error404;
