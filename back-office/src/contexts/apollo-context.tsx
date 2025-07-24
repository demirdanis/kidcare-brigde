import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import React, { ReactNode, createContext, useContext } from "react";
import { TServiceEndpoint, createApolloClient } from "@/services/apolloClient";

interface ApolloClientsContextType {
  clients: TClient;
  getClient: (
    endpoint: TServiceEndpoint
  ) => ApolloClient<NormalizedCacheObject>;
}

const ApolloClientsContext = createContext<ApolloClientsContextType | null>(
  null
);

export type TClient = Record<
  TServiceEndpoint,
  ApolloClient<NormalizedCacheObject>
>;

export const MultiApolloProvider = ({ children }: { children: ReactNode }) => {
  const clients: TClient = {
    BACKEND: createApolloClient("BACKEND"),
  };

  const getClient = (endpoint: TServiceEndpoint) => {
    return clients[endpoint];
  };

  return (
    <ApolloClientsContext.Provider
      value={{
        clients,
        getClient,
      }}
    >
      <ApolloProvider client={clients.BACKEND}>{children}</ApolloProvider>
    </ApolloClientsContext.Provider>
  );
};

export const useApolloClients = () => {
  const context = useContext(ApolloClientsContext);
  if (!context) {
    throw new Error("useApolloClients must be used within MultiApolloProvider");
  }
  return context;
};
