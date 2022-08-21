import fetch from "node-fetch";

const options = {
  method: "GET",
  qs: { fields: "id,name,category" },
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjNDNjZCRjIzMjBGNkY4RDQ2QzJERDhCMjI0MEVGMTFENTZEQkY3MUYiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJQR2FfSXlEMi1OUnNMZGl5SkE3eEhWYmI5eDgifQ.eyJuYmYiOjE2NjExMDcxMDcsImV4cCI6MTY2MTExMDcwNywiaXNzIjoiaHR0cHM6Ly9hdXRoLmVtc2ljbG91ZC5jb20iLCJhdWQiOlsiZW1zaV9vcGVuIiwiaHR0cHM6Ly9hdXRoLmVtc2ljbG91ZC5jb20vcmVzb3VyY2VzIl0sImNsaWVudF9pZCI6IjFvbXlueGszenlhNWl0OWQiLCJlbWFpbCI6Im0uc2FyYXR6aWRpc0BnbWFpbC5jb20iLCJjb21wYW55IjoiRWRlbiDwn4yzIiwibmFtZSI6Ik1pbHRpYWRpcyBTYXJhdHppZGlzIiwiaWF0IjoxNjYxMTA3MTA3LCJzY29wZSI6WyJlbXNpX29wZW4iXX0.jIEGRWuO5aS3u9om4WVZJGNh4DHnB9IlMj9rcquagEq_bAb04YCHrSJTyceCnl5aJZ-aFZA6w5JE_NW-6t8Ci0ij3GR5_SDt_2MsCuISMlhxfctQu0nI6PHn4RY5O5FGGDx_kD0erOggi_K4xQeOlexqii8aIQnb-39Z1GhkzrzM_k819o6luozZuKfpIaL7b9awcY22qfz8FcUiedeUJ5IckjRXXr8KvfqJjeD5MI-xCoEQCdAyYw_fEVixGDpBFedMAL7nbzrqwu6MWCCH_rXMeFzpVeduLa0RlQzIMKZpQRDWEctf4StY5lzDkrBjx6vI7buGH0CsfV_L3tjf3w",
  },
};

let data = [];

async function fetchSkills() {
  try {
    const response = await fetch(
      `https://emsiservices.com/skills/versions/latest/skills?q=javascript&fields=id,name,category,subcategory`,
      options
    );
    const data = await response.json();
    console.log(data.data);
  } catch (err) {
    console.log(err);
  }
}

fetchSkills();
