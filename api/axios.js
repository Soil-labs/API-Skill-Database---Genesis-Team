import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
// require('dotenv').config();

// const baseURL = process.env.REACT_APP_DOMAIN_NAME
//   ? process.env.REACT_APP_DOMAIN_NAME + "/graphql"
//   : "http://localhost:5001/graphql";

// const baseURL = process.env.NEXT_PUBLIC_GRAPHQL_URI;
//  const baseURL = "https://oasis-bot-test-deploy.herokuapp.com/graphql"
//  const baseURL = "http://localhost:5001/graphql"
//  const baseURL = "https://rickandmortyapi.com/graphql"

const baseURL = process.env.NEXT_PUBLIC_GRAPHQL_URI
  ? process.env.REACT_APP_DOMAIN_NAME 
  : "http://localhost:5001/graphql";

const apiClient = axios.create({
  baseURL,
  method: "POST",
});

apiClient.interceptors.request.use(function (config) {
  // const token = localStorage.getItem("token");

  // config.headers["Authorization"] = "Bearer " + token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  return config;
}, null);

export default apiClient;
