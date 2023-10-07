import Lottie from "react-lottie-player";
import notFound from "../../assets/not_found.json";
import "./style.css";

export const NotFound = ({ message }: { message?: string }) => {
  return (
    <div className="not-found">
      <Lottie animationData={notFound} play loop={false} style={{ width: "70%" }} />
      <p> {message || "No Results found!"} </p>
    </div>
  );
};
