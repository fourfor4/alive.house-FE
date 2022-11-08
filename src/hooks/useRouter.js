import { useNavigate } from "react-router-dom";

const useRouter = () => {
  const navigate = useNavigate();
  const push = (page) => {
    navigate(page);
    return;
  };

  return {
    push,
  };
};

export default useRouter;
