import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = () => {
  return (
    <div className="w-max animate-spin">
      <FaSpinner className="text-xl" />
    </div>
  );
};

export default LoadingSpinner;
