import { JwtClaims } from '../models/auth.model';

function base64UrlToBase64(value: string): string {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padding = normalized.length % 4;
  if (padding === 0) {
    return normalized;
  }
  return normalized + '='.repeat(4 - padding);
}

export function parseJwt(token: string): JwtClaims | null {
  const parts = token.split('.');
  if (parts.length !== 3) {
    return null;
  }

  try {
    const payload = atob(base64UrlToBase64(parts[1]));
    return JSON.parse(payload) as JwtClaims;
  } catch {
    return null;
  }
}
