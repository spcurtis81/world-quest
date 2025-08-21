"use client";
import * as React from "react";
import { ToastPortal } from "@ui/shared";

export function ToastProvider() {
  return <ToastPortal/>;
}

export { showToast } from "@ui/shared";
