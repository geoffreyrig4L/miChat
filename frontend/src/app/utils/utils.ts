import { HttpHeaders } from '@angular/common/http';

export function getHeaders(): HttpHeaders {
  const token = localStorage.getItem('token');

  if (!token) console.error('No token found');

  return new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });
}
