import { URLSearchParams } from "url";
import dotenv from "dotenv";
import fetch from "node-fetch";
import apiClient from "./api/axios.js"
import {findProjects,CreateSkillCategory,CreateSkillSubCategory,createSkill} from "./backEnd_api_func.js"

import {fetchSkills,fetchSkillFromPara,fetchRelatedSkills,getSkillById} from "./skill_api_func.js";

import {whiteListedSkills} from "./whitelist_categories.js";

dotenv.config();




let skill_list,skill_now,skills_temp,skills_temp_whiteListed,skill_whiteList_now,createdSubCategory,createdCategory,createdSkill

// skill_list = ["python"]
skill_list = ["css","python","javascript","blockchain"]


skills_temp = await fetchSkills("blockchain")
console.log("skills_temp = " , skills_temp)
// fetchRelatedSkills("KS121F45VPV8C9W3QFYH")

// fetchSkillFromPara()

// let getSkillById_t = await getSkillById("KS4401Q6TM90DBQSF645");
// console.log("getSkillById_t = " , getSkillById_t)


// let text_skill = "I love react and javascript solidity blockchain css python html editing video production software development web development"
// let skill_res = await fetchSkillFromPara(text_skill)


// console.log("skill_res = " , skill_res)

// for (let i = 0; i < skill_res.length; i++) {
//     skill_now = skill_list[i];

//     console.log("skill_now = " , skill_now)

//     // let skill_full = await getSkillById(skill_now.id);
//     // console.log("skill_full = " , skill_full)

//     break;
// }

// console.log("skill_res = " , skill_res)


// for (let i = 0; i < skill_list.length; i++) {
//     skill_now = skill_list[i];

//     skills_temp = await fetchSkills(skill_now)

//     skills_temp_whiteListed = await whiteListedSkills(skills_temp)


//     console.log("skills_whiteListed",skills_temp_whiteListed)

//     for (let j=0;j<skills_temp_whiteListed.length;j++){
//         skill_whiteList_now = skills_temp_whiteListed[j]

//         createdSubCategory = await CreateSkillCategory(skill_whiteList_now.category.name,skill_whiteList_now.category.id) 

//         createdCategory = await CreateSkillSubCategory(skill_whiteList_now.subcategory.name,skill_whiteList_now.subcategory.id) 



        
//         createdSkill = await createSkill(skill_whiteList_now.name,skill_whiteList_now.id,createdSubCategory._id,createdCategory._id)


//         // console.log("createdSubCategory = " , createdSubCategory)
//         // console.log("createdCategory = " , createdCategory)
//         // console.log("createdSkill = " , createdSkill)
//     }

//     // console.log("res2 = " , res2)


// }

