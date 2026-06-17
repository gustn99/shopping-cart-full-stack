import { useNavigate } from "react-router";
import { ROUTES } from "@constants/routes.ts";

export default function useOrderCompleteNavigate() {
  const nav = useNavigate();

  const navigate = () => {
    nav(ROUTES.ORDER_COMPLETE);
  };

  const getState = () => {
    return null;
  };

  return {
    navigate,
    getState,
  };
}
