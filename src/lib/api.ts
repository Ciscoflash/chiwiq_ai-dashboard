import type { ApiSuccess, ApiErrorBody } from "@/lib/types";

const API_BASE = "/api";

const TOKEN_KEY = "chiwiq_token";

export const tokenStore = {
  get: (): string | null =>
    typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null,
  set: (token: string): void => {
    if (typeof window !== "undefined") localStorage.setItem(TOKEN_KEY, token);
  },
  clear: (): void => {
    if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY);
  },
};

export class ApiClientError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

interface RequestOptions extends RequestInit {
  auth?: boolean;
}

export async function api<T>(
  path: string,
  options: RequestOptions = {},
): Promise<ApiSuccess<T>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const auth = options.auth !== false;
  const token = auth ? tokenStore.get() : null;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const { auth: _auth, ...rest } = options;

  const res = await fetch(`${API_BASE}${path}`, {
    ...rest,
    headers: { ...headers, ...(rest.headers as Record<string, string>) },
  });

  const body = (await res.json().catch(() => null)) as
    | ApiSuccess<T>
    | ApiErrorBody
    | null;

  if (!res.ok) {
    const message = body && "message" in body ? body.message : "Something went wrong";
    throw new ApiClientError(res.status, message);
  }

  return body as ApiSuccess<T>;
}