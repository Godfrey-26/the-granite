/*
method corresponds to the request type: GET, POST, PUT, PATCH
mapping -> API endpoint path
headers -> optional request headers
body -> optional request payload
*/

import { getToken } from '@src/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1';

export default async function API_Caller(method, headers, mapping, body) {
  try {
    const authToken = getToken();
    const requestHeaders = {
      'Content-Type': 'application/json',
      ...(headers || {}),
    };

    if (authToken && !requestHeaders.Authorization) {
      requestHeaders.Authorization = `Bearer ${authToken}`;
    }

    const res = await fetch(`${API_BASE_URL}${mapping}`, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
