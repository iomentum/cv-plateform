import { persistentAtom } from "@nanostores/persistent";
import { computed } from "nanostores";

export const $accessToken = persistentAtom<string | null>(
  "jobbiAccessToken",
  null,
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

export const $isAuthenticated = computed(
  $accessToken,
  (token) => token !== null
);

export const setAccessToken = (newValue: string) => $accessToken.set(newValue);

export const logout = () => $accessToken.set(null);
