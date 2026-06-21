/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useCallback, useMemo } from "react";

type StrictOmit<T, K extends string> = Omit<T, K> & { [P in K]?: never };

export type ModalResult<T> = { status: "confirmed"; data: T } | { status: "canceled" };

export interface ModalComponentProps<T = any> {
  onConfirm: (value: T | PromiseLike<T>) => void;
  onCancel: (reason?: any) => void;
}

interface ModalState {
  key: string;
  Component: React.ElementType<any>;
  props: any;
  onConfirm: (value: any) => void;
  onCancel: (reason?: any) => void;
}

interface ModalContextValue {
  open: <TResult = any, TProps = Record<string, unknown>>(
    key: string,
    Component: React.ElementType<TProps & ModalComponentProps<TResult>>,
    props?: StrictOmit<TProps, keyof ModalComponentProps>,
  ) => Promise<ModalResult<TResult>>;
  close: () => void;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState<ModalState | null>(null);

  const open: ModalContextValue["open"] = useCallback((key, Component, props) => {
    return new Promise((resolve) => {
      const handleResolve = (value: any) => {
        setModal(null);
        resolve({ status: "confirmed", data: value });
      };

      const handleReject = () => {
        setModal(null);
        resolve({ status: "canceled" });
      };

      setModal({
        key,
        Component,
        props: props || {},
        onConfirm: handleResolve,
        onCancel: handleReject,
      });
    });
  }, []);

  const close = useCallback(() => {
    if (modal) {
      modal.onCancel();
    }
  }, [modal]);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modal && (
        <modal.Component key={modal.key} {...modal.props} onConfirm={modal.onConfirm} onCancel={modal.onCancel} />
      )}
    </ModalContext.Provider>
  );
};
