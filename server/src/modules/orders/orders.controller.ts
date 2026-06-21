import type { Request, Response } from "express";
import * as ordersService from "./orders.service.ts";
import { ServiceError } from "../../common/error.ts";

export const createOrder = (req: Request, res: Response) => {
  try {
    const result = ordersService.createOrder(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof ServiceError) {
      if (error.errorCode === "MISSING_FIELD" || error.errorCode === "TYPE_MISMATCH") {
        return res.status(400).json({ errorCode: error.errorCode, errorMessage: error.errorMessage, data: error.data });
      }
      if (error.errorCode === "OUT_OF_STOCK") {
        return res.status(409).json({ errorCode: error.errorCode, errorMessage: error.errorMessage });
      }
    }
    res.status(500).json({ errorCode: "INTERNAL_SERVER_ERROR", errorMessage: "Internal Server Error" });
  }
};

export const getOrder = (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.orderId as string, 10);
    const result = ordersService.getOrder(orderId);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof ServiceError) {
      if (error.errorCode === "ORDER_EXPIRED") {
        return res.status(409).json({ errorCode: error.errorCode, errorMessage: error.errorMessage });
      }
      if (error.errorCode === "RESOURCE_NOT_FOUND") {
        return res.status(404).json({ errorCode: error.errorCode, errorMessage: error.errorMessage });
      }
    }
    res.status(500).json({ errorCode: "INTERNAL_SERVER_ERROR", errorMessage: "Internal Server Error" });
  }
};

export const updateOrder = (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.orderId as string, 10);
    const result = ordersService.updateOrder(orderId, req.body);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof ServiceError) {
      if (error.errorCode === "MISSING_FIELD" || error.errorCode === "TYPE_MISMATCH") {
        return res.status(400).json({ errorCode: error.errorCode, errorMessage: error.errorMessage, data: error.data });
      }
      if (error.errorCode === "ORDER_EXPIRED") {
        return res.status(409).json({ errorCode: error.errorCode, errorMessage: error.errorMessage });
      }
      if (error.errorCode === "COUPON_EXPIRED") {
        return res.status(422).json({ errorCode: error.errorCode, errorMessage: error.errorMessage });
      }
      if (error.errorCode === "RESOURCE_NOT_FOUND") {
        return res.status(404).json({ errorCode: error.errorCode, errorMessage: error.errorMessage });
      }
    }
    res.status(500).json({ errorCode: "INTERNAL_SERVER_ERROR", errorMessage: "Internal Server Error" });
  }
};

export const getDiscount = (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.orderId as string, 10);
    const couponIdRaw = req.query.couponId;
    let couponIds: number[] = [];
    
    if (couponIdRaw === undefined) {
      return res.status(200).json({ discountAmount: 0 });
    }
    
    if (Array.isArray(couponIdRaw)) {
      couponIds = couponIdRaw.map(id => parseInt(id as string, 10));
    } else if (typeof couponIdRaw === "string") {
      couponIds = [parseInt(couponIdRaw, 10)];
    }

    const result = ordersService.getDiscount(orderId, couponIds);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof ServiceError) {
      if (error.errorCode === "TYPE_MISMATCH") {
        return res.status(400).json({ errorCode: error.errorCode, errorMessage: error.errorMessage });
      }
      if (error.errorCode === "RESOURCE_NOT_FOUND") {
        return res.status(404).json({ errorCode: error.errorCode, errorMessage: error.errorMessage });
      }
    }
    res.status(500).json({ errorCode: "INTERNAL_SERVER_ERROR", errorMessage: "Internal Server Error" });
  }
};

export const getCoupons = (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.orderId as string, 10);
    const result = ordersService.getCoupons(orderId);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof ServiceError) {
      if (error.errorCode === "RESOURCE_NOT_FOUND") {
        return res.status(404).json({ errorCode: error.errorCode, errorMessage: error.errorMessage });
      }
    }
    res.status(500).json({ errorCode: "INTERNAL_SERVER_ERROR", errorMessage: "Internal Server Error" });
  }
};
