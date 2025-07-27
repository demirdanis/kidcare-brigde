import { IBaseService, IBaseServiceAction } from "./baseService.types";

import { BaseResponseDto } from "kidcare-bridge-shared";
import { endpoints } from "../endPoints";
import { unknownErrorMessage } from "../errorManagement";
import { useState } from "react";

export const useBaseService = <TVariables, TResponseData>({
  path,
  method = "POST",
  endpoint = "BACKEND",
  onAfterError,
}: IBaseService) => {
  const [error, setError] = useState<string>();
  const [data, setData] = useState<BaseResponseDto<TResponseData>>();
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setData({
      success: true,
      data: undefined,
    });
  };

  const action = async ({
    variables,
  }: IBaseServiceAction<TVariables>): Promise<
    BaseResponseDto<TResponseData>
  > => {
    setLoading(true);
    setError(undefined);

    try {
      const endpointConfig = endpoints[endpoint];
      console.log("endpointConfig", endpointConfig);
      if (!endpointConfig.uri) {
        return {
          success: false,
          errors: [
            {
              message: `API URL not configured for endpoint: ${endpoint}`,
            },
          ],
        };
      }

      const response = await fetch(`${endpointConfig.uri}${path || ""}`, {
        method: method,
        credentials: "include", // Cookie'ler için gerekli

        headers: {
          "Content-Type": "application/json",
          ...endpointConfig.headers,
        },
        body: method !== "GET" ? JSON.stringify(variables || {}) : undefined,
      });

      if (!response.ok) {
        return {
          success: false,
          errors: [
            {
              message: `HTTP error! status: ${response.status}`,
            },
          ],
        };
      }

      const result: BaseResponseDto<TResponseData> = await response.json();
      if (result.success && result.data) {
        setData(result);
        setLoading(false);
        return result;
      } else if (result.errors) {
        const errorMessage = result.errors?.map((m) => m.message).join(", ");
        onAfterError?.(errorMessage);
        setError(errorMessage);
        setLoading(false);
      }

      return result;
    } catch {
      setLoading(false);

      setError(unknownErrorMessage);

      const backendError: BaseResponseDto<TResponseData> = {
        success: false,
        errors: [
          {
            message: unknownErrorMessage,
          },
        ],
      };

      onAfterError?.(unknownErrorMessage);
      return backendError;
    }
  };

  return {
    action,
    reset,
    loading,
    error,
    data,
  };
};
