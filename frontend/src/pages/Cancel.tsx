import { useNavigate } from "react-router-dom";
import CancelImg from "@/assets/cancel.jpeg";
import { Button } from "../components/common/Button";
import { ROUTES } from "../constant/routesPath";

const Cancel = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <img src={CancelImg} alt="" className="rounded-full" />
      <h1 className="text-xl text-red-400">Warning!</h1>
      <Button
        type="button"
        onClickHandler={() => navigate(ROUTES.DASHBOARD.path)}
        className=" bg-red-400 py-2 px-4 mt-1 rounded-xl"
      >Back to Home Page</Button>
    </div>
  );
};

export default Cancel;
