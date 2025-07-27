import Cookies from "js-cookie";
import { env } from "next-runtime-env";

setTimeout(() => {
  console.log("tokennn", Cookies.get("token"));
}, 3000);
export const endpoints = {
  BACKEND: {
    uri: env("NEXT_PUBLIC_SERVICE_URL") + "/",
    headers: {
      authorization: `Bearer ${Cookies.get("token")}`,
    },
  },
};

export type TServiceEndpoint = keyof typeof endpoints;
