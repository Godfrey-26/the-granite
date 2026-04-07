/*
method corresponds to the requests type GET, POST, PUT, PATCH
mapping -> api url end point 
headers 
*/

export default async function API_Caller(method, headers,mapping, body){
try {
   const res  = await fetch(
`https://api.thegranite.co.zw${mapping}`, 
 {
    "method": method,
    "headers": {
        'Content-Type': 'application/json'
    },
    "body": body ? JSON.stringify(body): undefined 
 }
)
   const data = await res.text();
   console.log(data);
   return data;
}catch (error){
  console.log(error)  
  throw error
}

   

}  