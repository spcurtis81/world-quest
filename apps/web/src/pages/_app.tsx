import type { AppProps } from "next/app";
import { ToastProvider } from "@ui/shared";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastProvider />
      <Component {...pageProps} />
    </>
  );
}