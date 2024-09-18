import { persistentAtom } from "@nanostores/persistent";

export const $accessToken = persistentAtom<string | null>(
  "signeAccessToken",
  null,
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

export const setAccessToken = (newValue: string) => $accessToken.set(newValue);

export const logout = () => $accessToken.set(null);
