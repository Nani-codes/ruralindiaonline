import Loading from "@/images/loading.json";
import Lottie from "lottie-react";

export default function Loader() {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <Lottie animationData={Loading} />
      </div>
    </div>
  );
}
