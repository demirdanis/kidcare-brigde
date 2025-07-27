import { TServiceEndpoint } from "../endPoints";

export interface IBaseService {
  endpoint?: TServiceEndpoint;
  path: string;
  method?: THttpMethod;
  onAfterError?: (errorMessage: string) => void;
}

export type TBaseQueryServiceVariable = object | Array<object>;
export type THttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface IBaseServiceAction<TVariables> {
  variables?: TVariables;
}
