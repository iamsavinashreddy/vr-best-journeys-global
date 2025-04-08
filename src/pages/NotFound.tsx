
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center max-w-lg">
        <div className="mb-6 text-vrred-500 flex justify-center">
          <MapPin className="h-24 w-24" />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-gray-900">Oops!</h1>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
          We can't seem to find the destination you're looking for. Let's get you back on track to your dream vacation.
        </p>
        <Button 
          asChild
          className="bg-vrred-500 hover:bg-vrred-600 text-white px-8 py-6 text-lg"
        >
          <a href="/">Return to Homepage</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
