import { BaseResponseDto } from "kidcare-bridge-shared";
import { TServiceEndpoint } from "../apolloClient";

export interface IBaseService<TResponseData> {
  endpoint?: TServiceEndpoint;
  path: string;
  method?: THttpMethod;
  onAfterError?: (response: BaseResponseDto<TResponseData> | null) => void;
}

export type TBaseQueryServiceVariable = object | Array<object>;
export type THttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface IBaseServiceAction<TVariables> {
  variables?: TVariables;
}
