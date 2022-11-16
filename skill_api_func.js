import { URLSearchParams } from "url";
import dotenv from "dotenv";
import fetch from "node-fetch";
import apiClient from "./api/axios.js"
dotenv.config();

const encodedParams = new URLSearchParams();

//Access Token


function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}


let id_secret_api_skills = [{
  Client_ID: "m46vecvtqj3lckn0",
  Secret: "xCN3Mxn6"
},{
  Client_ID: "85eujv6f8f21zfhc",
  Secret: "4LHf40wS"
},{
  Client_ID: "9yk1g261p7g2t0i5",
  Secret: "jwZU31SB"
},{
  Client_ID: "qcjg10etn9qctsf5",
  Secret: "OUjSVBTD"
},{
  Client_ID: "4ww3czvftfif4kpw",
  Secret: "ITswNHuC"
},{
  Client_ID: "q748vs3rlgltgrsk",
  Secret: "NsYivyQg"
},{
  Client_ID: "jpip3p686thssrfh",
  Secret: "RRwAkm3d"
},{
  Client_ID: "h99r839sf2hvnveq",
  Secret: "ZnUGEpoC"
},{
  Client_ID: "h99r839sf2hvnveq",
  Secret: "OPcGBNvv"
}]

// console.log(getRandomInt(3));

let rand = getRndInteger(0,9)

encodedParams.set("client_id", id_secret_api_skills[rand].Client_ID);
encodedParams.set("client_secret", id_secret_api_skills[rand].Secret);


// encodedParams.set("client_id", process.env.CLIENT_ID);
// encodedParams.set("client_secret", process.env.CLIENT_SECRET);


encodedParams.set("grant_type", "client_credentials");
encodedParams.set("scope", "emsi_open");

//Fetch Token

// console.log("-- BackEnd Started -- " )

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

// Fetching Skills, categories, and subcategories

const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};

export async function fetchSkills(skill) {
  try {
    const response = await fetch(
      //********if you want to fetch every single skill just remove the q=asdadasdad from the url************* SOS 🆘
      `https://emsiservices.com/skills/versions/latest/skills?q=${skill}&fields=id,name,category,type,subcategory&typeIds=ST1,ST2&limit=1`,
      options
    );
    const data = await response.json();
    // console.log("data = " , data)
    return (data.data)
  } catch (err) {
    console.log(err);
  }
}

// fetchSkills();

//Extract skills from paragraph



export async function fetchSkillFromPara(text_skill) {

  const paraOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      // "Content-Type": "application/json",
    },
    qs: { language: "fr" },
    //***************have to pass the para graph inside body to get the skills from paragraph**************************
    body: `{"text":"${text_skill}"}`,
    json: true,
  };


  try {
    console.log("change = " )
    const response = await fetch(
      `https://emsiservices.com/skills/versions/latest/extract/trace`,
      paraOptions
    );
    const data = await response.json();

    console.log("data.data.skills = " , data)

    // const skill_res = await data.data.skills.map((s) => 
    // {
    //   return {
    //     id:  s.skill.id,
    //     name: s.skill.name,

    //   }
    // });

    // console.log("data = " , data)
    // console.log(data.data.skills);
    // console.log("skill_res = " , skill_res)
    // return (skill_res)
  } catch (err) {
    console.log(err);
  }
}

// fetchSkillFromPara();

// Extract related skills



export async function fetchRelatedSkills(skill_id_lightcast) {

  const relatedOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    //******************have to pass the ids inside body to fetch related skills***********************
    body: `{"ids":["${skill_id_lightcast}"]}`,
    json: true,
  };

  // console.log("relatedOptions = " , relatedOptions)


  try {
    const response = await fetch(
      `https://emsiservices.com/skills/versions/latest/related?limit=3`,
      relatedOptions
    );
    const data = await response.json();
    // console.log(data.data);
    return (data.data)
  } catch (err) {
    console.log(err);
  }
}
 
// fetchRelatedSkills();


const skillOptions = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};

export async function getSkillById(id) {
  try {
    const response = await fetch(
      `https://emsiservices.com/skills/versions/latest/skills/${id}`,
      skillOptions
    );
    const data = await response.json();
    // console.log(data.data);

    // return (data.data)

    const skill_res ={
        category: data.data.category,
        id: data.data.id,
        name: data.data.name,
        subcategory: data.data.subcategory,
    };

    return (skill_res)
  } catch (err) {
    console.log(err);
  }
}

// getSkillById("KS1200364C9C1LK3V5Q1");



// export { fetchSkills, fetchSkillFromPara, fetchRelatedSkills };