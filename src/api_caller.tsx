/*
method corresponds to the requests type GET, POST, PUT, PATCH
mapping -> api url end point 
headers 
*/

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1';

export default async function API_Caller(method, headers, mapping, body) {
  try {
    const res = await fetch(
      `${API_BASE_URL}${mapping}`, 
      {
        method: method,
        headers: headers != null ? {
          'Content-Type': 'application/json',
          ...headers
        } : {
          'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined 
      }
    );

    const data = await res.json();
    
    return data;
  } catch (error) {  
    throw error;
  }
}  