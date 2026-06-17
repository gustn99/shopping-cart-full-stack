import type { Cart } from "@/types/cartProduct";
import { useLocation, useNavigate } from "react-router";
import { ROUTES } from "@constants/routes.ts";

interface LocationState {
  products: Cart[];
  totalAmount: number;
}

export default function useOrderConfirmNavigate() {
  const nav = useNavigate();
  const loc = useLocation();

  const navigate = (state: LocationState) => {
    nav(ROUTES.ORDER_CONFIRM, { state });
  };

  const getState = (): LocationState | null => {
    return loc.state;
  };

  return {
    navigate,
    getState,
  };
}
