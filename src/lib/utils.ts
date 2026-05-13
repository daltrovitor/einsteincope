/**
 * Returns the full URL for a given subdomain.
 * In production: https://subdomain.yourdomain.com
 * In development: http://subdomain.localhost:3000
 */
export function getSubdomainUrl(subdomain: string, path: string = '/') {
  if (typeof window === 'undefined') return path;

  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  const port = window.location.port ? `:${window.location.port}` : '';

  // If we're already on the subdomain, just return the path
  if (hostname.startsWith(`${subdomain}.`)) {
    return path;
  }

  // Handle localhost
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // Note: To test subdomains on localhost, you might need to use http://rifas.localhost:3000
    // and ensure your browser/OS supports it.
    return `${protocol}//${subdomain}.localhost${port}${path}`;
  }

  // Handle production (assuming 1 level of subdomain)
  const parts = hostname.split('.');
  if (parts.length >= 2) {
    const domain = parts.slice(-2).join('.');
    return `${protocol}//${subdomain}.${domain}${path}`;
  }

  return path;
}
