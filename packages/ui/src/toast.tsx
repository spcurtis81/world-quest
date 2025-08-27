"use client";

import React from "react";
import { Toaster, toast as hotToast, type ToastOptions } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      gutter={8}
      containerClassName="pointer-events-none z-[9999]"
      toastOptions={{
        duration: 4000,
        className: "pointer-events-auto",
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      }}
    />
  );
}

function mergeAriaProps(
  base: NonNullable<ToastOptions["ariaProps"]>,
  extra?: ToastOptions["ariaProps"]
) {
  return { ...base, ...(extra ?? {}) };
}

export const toast = (message: string, options?: ToastOptions) => {
  const baseAria = {
    role: "status",
    "aria-live": "polite",
    "aria-label": message,
  } as const;

  const merged: ToastOptions = {
    ...options,
    ariaProps: mergeAriaProps(baseAria, options?.ariaProps),
  };

  return hotToast(message, merged);
};

export type { ToastOptions };
