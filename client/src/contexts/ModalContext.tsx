/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useCallback, useMemo } from "react";

export interface ModalComponentProps<T = any> {
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}

interface ModalState {
  key: string;
  Component: React.ElementType<any>;
  props: any;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}

interface ModalContextValue {
  open: <TResult = any, TProps = Record<string, unknown>>(
    key: string,
    Component: React.ElementType<TProps & ModalComponentProps<TResult>>,
    props?: TProps,
  ) => Promise<TResult>;
  close: () => void;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState<ModalState | null>(null);

  const open: ModalContextValue["open"] = useCallback((key, Component, props) => {
    return new Promise((resolve, reject) => {
      const handleResolve = (value: any) => {
        setModal(null);
        resolve(value);
      };

      const handleReject = (reason?: any) => {
        setModal(null);
        reject(reason);
      };

      setModal({
        key,
        Component,
        props: props || {},
        resolve: handleResolve,
        reject: handleReject,
      });
    });
  }, []);

  const close = useCallback(() => {
    if (modal) {
      modal.reject();
    }
  }, [modal]);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modal && <modal.Component key={modal.key} {...modal.props} resolve={modal.resolve} reject={modal.reject} />}
    </ModalContext.Provider>
  );
};
