import { URLSearchParams } from "url";
import dotenv from "dotenv";
import fetch from "node-fetch";
import apiClient from "./api/axios.js"
import {findProjects,CreateSkillCategory,CreateSkillSubCategory,createSkill} from "./backEnd_api_func.js"

import {fetchSkills,fetchSkillFromPara,fetchRelatedSkills,getSkillById} from "./skill_api_func.js";

import {whiteListedSkills,notWhiteListedCategories} from "./whitelist_categories.js";

dotenv.config();




let skill_list,skill_now,skills_temp,skills_temp_whiteListed,skill_whiteList_now,createdSubCategory,createdCategory,createdSkill

// skill_list = ["python"]
// skill_list = ["css","python","javascript","blockchain","react","html"]//,"editing","video","software","development","web","video","production","software","development","web","development"]
// skill_list = ["3d art"]//,"python","javascript","blockchain","react","html"]//,"editing","video","software","development","web","video","production","software","development","web","development"]

// skill_list = ["css","python","javascript","blockchain","react","html","software","development","web"
//             ,"editing","video","video"
//             ,"3d art","adobe stock"]
            
skill_list = ["css","python","javascript","blockchain","react","html","software","development","web"
            ,"editing","video","video"
            ,"3d art","adobe stock"]

// skills_temp = await fetchSkills("blockchain")
// console.log("skills_temp = " , skills_temp)

let notWhiteListedCateg = []
let notWhiteListedSubCateg = []


for (let i = 0; i < skill_list.length; i++) {
    skill_now = skill_list[i];

    skills_temp = await fetchSkills(skill_now)
    console.log("skills_temp = " , skills_temp)

    // skills_temp_whiteListed = await whiteListedSkills(skills_temp)

    let res = await notWhiteListedCategories(skills_temp)

    if (res.notWhiteListedCateg && res.notWhiteListedCateg.length>0){
        notWhiteListedCateg.push(res.notWhiteListedCateg[0])
    }
    if (res.notWhiteListedSubCateg && res.notWhiteListedSubCateg.length>0){
        notWhiteListedSubCateg.push(res.notWhiteListedSubCateg[0])
    }

    // let notWhiteListedSubCateg = res.notWhiteListedSubCateg
    console.log("res = " , notWhiteListedCateg,notWhiteListedSubCateg)

    // console.log("skills_whiteListed",skills_temp)

    // await saveSkills_MongoNeo(skills_temp_whiteListed) 


    // // ---------------- Search related Skills ----------------
    // for (let j=0;j<skills_temp_whiteListed.length;j++){
    //     skill_whiteList_now = skills_temp_whiteListed[j]
    //     // console.log("skill_whiteList_now = " , skill_whiteList_now)
    //     let skills_temp_related = await fetchRelatedSkills(skill_whiteList_now.id)
    //     // console.log("skills_temp_related",skills_temp_related)


    //     for (let k=0;k<3;k++){
    //         let skill_related_now = skills_temp_related[k]
            
    //         let skill_related_now_full = await getSkillById(skill_related_now.id);
    //         console.log("skill_related_now_full = " , skill_related_now_full)

    //         await saveSkills_MongoNeo([skill_related_now_full]) 
    //     }
    // }
    // // ---------------- Search related Skills ----------------
    


}


async function saveSkills_MongoNeo(skills_temp_whiteListed) {

    for (let j=0;j<skills_temp_whiteListed.length;j++){
        skill_whiteList_now = skills_temp_whiteListed[j]

        createdSubCategory = await CreateSkillCategory(skill_whiteList_now.category.name,skill_whiteList_now.category.id) 

        createdCategory = await CreateSkillSubCategory(skill_whiteList_now.subcategory.name,skill_whiteList_now.subcategory.id) 



        
        createdSkill = await createSkill(skill_whiteList_now.name,skill_whiteList_now.id,createdSubCategory._id,createdCategory._id)

        console.log("createdSkill = " , createdSkill)

    }
}
