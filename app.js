import { URLSearchParams } from "url";
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

const encodedParams = new URLSearchParams();

//Access Token

encodedParams.set("client_id", process.env.CLIENT_ID);
encodedParams.set("client_secret", process.env.CLIENT_SECRET);
encodedParams.set("grant_type", "client_credentials");
encodedParams.set("scope", "emsi_open");

//Fetch Token

const tokenOptions = {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: encodedParams,
};

const fetchToken = async () => {
  try {
    const response = await fetch(
      `https://auth.emsicloud.com/connect/token`,
      tokenOptions
    );
    const data = await response.json();
    return data?.access_token;
  } catch (err) {
    console.log(err);
  }
};

const accessToken = await fetchToken();

//Fetching Skills, categories, and subcategories

const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};

async function fetchSkills() {
  try {
    const response = await fetch(
      //********if you want to fetch every single skill just remove the q=asdadasdad from the url*************
      `https://emsiservices.com/skills/versions/latest/skills?q=javascript&fields=id,name,category,type,subcategory&typeIds=ST1,ST2`,
      options
    );
    const data = await response.json();
    console.log(data.data);
  } catch (err) {
    console.log(err);
  }
}

// fetchSkills();

//Extract skills from paragraph

const paraOptions = {
  method: "POST",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    // "Content-Type": "application/json",
  },
  qs: { language: "fr" },
  //***************have to pass the para graph inside body to get the skills from paragraph**************************
  body: '{"text":"I love react and javascript"}',
  json: true,
};

async function fetchSkillFromPara() {
  try {
    const response = await fetch(
      `https://emsiservices.com/skills/versions/latest/extract/trace`,
      paraOptions
    );
    const data = await response.json();
    console.log(data.data.skills.map((s) => s.skill.name));
  } catch (err) {
    console.log(err);
  }
}

// fetchSkillFromPara();

// Extract related skills

const relatedOptions = {
  method: "POST",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
  //******************have to pass the ids inside body to fetch related skills***********************
  body: '{"ids":["KS1200364C9C1LK3V5Q1"]}',
  json: true,
};

async function fetchRelatedSkills() {
  try {
    const response = await fetch(
      `https://emsiservices.com/skills/versions/latest/related`,
      relatedOptions
    );
    const data = await response.json();
    console.log(data.data);
  } catch (err) {
    console.log(err);
  }
}

// fetchRelatedSkills();
