import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import Cookies from "js-cookie";
import { env } from "next-runtime-env";
import { onError } from "@apollo/client/link/error";

export const endpoints = {
  BACKEND: {
    uri: env("NEXT_PUBLIC_SERVICE_URL") + "/",
    headers: {
      authorization: `Bearer ${Cookies.get("token")}`,
    },
  },
};

export type TServiceEndpoint = keyof typeof endpoints;

export const createApolloClient = (endpointKey: TServiceEndpoint) => {
  const endpoint = endpoints[endpointKey];

  const httpLink = createHttpLink({
    uri: endpoint.uri,
    headers: endpoint.headers,
  });

  return new ApolloClient({
    ssrMode: true,
    link: ApolloLink.from([errorLink, httpLink /*, getAuthLink()*/]),
    cache: new InMemoryCache(),
    defaultOptions: {
      mutate: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
      },
      watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
      },
      query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
      },
    },
  });
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, extensions }) => {
      return { message, extensions };
    });
  }
  if (networkError) console.warn(`[Network error]: ${networkError}`);
});
