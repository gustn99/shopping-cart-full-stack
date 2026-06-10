export const CARTS_ERROR_MESSAGES = {
  RESOURCE_NOT_FOUND: "요청하신 상품을 찾을 수 없습니다.",
  MISSING_FIELD: "필수 입력 값이 누락되었습니다.",
  TYPE_MISMATCH: "입력 값이 올바르지 않습니다.",
  INVALID: "유효하지 않은 입력입니다.",
  NO_JSON: "서버와 통신하는 중 문제가 발생했습니다. 관리자에게 문의해 주세요. [ERR: NO_JSON]",
  METHOD_NOT_ALLOWED: "서버와 통신하는 중 문제가 발생했습니다. 관리자에게 문의해 주세요. [ERR: METHOD_NOT_ALLOWED]",
  ROUTE_NOT_FOUND: "서버와 통신하는 중 문제가 발생했습니다. 관리자에게 문의해 주세요. [ERR: ROUTE_NOT_FOUND]",
  DEFAULT: "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
} as const;

export type CartsErrorCode = keyof typeof CARTS_ERROR_MESSAGES;
