import { useMemo } from "react";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient(headers?: Record<string, string>) {
  return new ApolloClient({
    link: createHttpLink({
      uri: "http://localhost:4000/",
      credentials: "include",
      headers: headers?.cookie
        ? {
            cookie: headers?.cookie,
          }
        : undefined,
    }),
    cache: new InMemoryCache(),
    ssrMode: typeof window === "undefined",
  });
}

export interface initializeApolloConfig {
  initialState?: NormalizedCacheObject | undefined | null;
  headers?: Record<string, string>;
}

export function initializeApollo({
  initialState = null,
  headers = undefined,
}: initializeApolloConfig | undefined = {}) {
  const _apolloClient = apolloClient ?? createApolloClient(headers);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(
  initialState: NormalizedCacheObject | undefined | null
) {
  const store = useMemo(
    () => initializeApollo({ initialState }),
    [initialState]
  );
  return store;
}
