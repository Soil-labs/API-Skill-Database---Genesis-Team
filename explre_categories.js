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
            
// skill_list = ["css","python","javascript","blockchain","react","html","software","development","web"
//             ,"editing","video","video"
//             ,"3d art","adobe stock"]

// skill_list = ["neo4j","graph","blockchain","node"]
// skill_list = ["Java Language","Agile Product Development","Agile Product Management","Digital Product Management","Lifecycle Management","Platform Product Management","Product Lifecycle Management","Product Data Management"]
// skill_list = ["Product Requirements Documents","Product Roadmap Management","Scrum Master","Requirements Specifications","User Story","Product Strategy","Product Roadmaps","Product Backlog Grooming","Business Analysis","Business Requirements","KPI Reporting"]
// skill_list = ["Conflict Management","Cross-Functional Collaboration","Cross-Functional Coordination"]
// skill_list = ["Data Acquisition","Data Classification","Data Curation"]
// skill_list = ["Go (Programming Language)","Markup Languages","Program Flow","Swift (Programming Language)","UML Tool","Visual Programming Language (VPL)","CoffeeScript","ASP.NET Core","IOS Development","Objective-C (Programming Language)","watchOS"]
// skill_list = ["Business Strategies","Corporate Strategy","Commercial Development","Customer Development","Digital Customer Strategy","Exit Strategies","Growth Planning","Growth Strategies","Organizational Strategy","Mission Statement Development","Small Business Development","Strategic Decision-Making","Strategic Leadership","Strategic Thinking","Value Creation"]
// skill_list = ["A/B Testing","Google Analytics","User Tracking"]
// skill_list = ["Cloud Security Applications","Data Security","Database Encryption","Digital Security","Ethical Hacking","Firewalld","Information Security Management","Internet Security"]
// skill_list = [".NET Remoting","API Management","Amazon API Gateway","Application Programming Interface (API)","Dropbox API","Facebook API","Google App Engines","Graphics Device Interface","HTML Document Object Models","Java API For RESTful Web Services","OpenAPI","RESTful API","XML For Analysis","Social Media APIs"]
// skill_list = ["Search Algorithms","Search Technologies","Search Engine Optimization","Oracle Learning Management","Oracle Audit Vault","Oracle Database Vault","Oracle Workflow"]
// skill_list = ["Full Stack (Software Engineering)","Data Administration","Database Activity Monitoring","Database Activity Monitoring","Database Testing","AWS Backup","AWS CodeBuild","Amazon Cloud Drive","Amazon Web Services","Dataflow","Google Cloud","Twilio","Django (Web Framework)","Dynamic Websites","JSON Web Signature (JWS)","Wix","Web Development Tools","SASS"]
// skill_list = ["Machine Learning","Machine Learning Algorithms","PyTorch (Machine Learning Library)","Recommendation Engine","Recurrent Neural Network (RNN)","Reinforcement Learning","Scikit-learn (Machine Learning Library)","Supervised Learning","TensorFlow","Training Datasets","Unsupervised Learning","Game Theory","Convolutional Neural Networks","Artificial Neural Networks","Chatbot","Gradient Boosting","Facial Recognition"]
// skill_list = ["Java Platform Standard Edition (J2SE)","Java Portlet Specification","Java Runtime Environment","Java Scripting Languages","Java Virtual Machine (JVM)"]
// skill_list=["Agile Coaching","Agile Modeling","Agile Project Management","Agile Software Development","Agile Testing","Disciplined Agile Delivery","Feature-Driven Development (FDD)","Sprint Backlogs","Story Point Estimation",]

// skills_temp = await fetchSkills("blockchain")
// console.log("skills_temp = " , skills_temp)

let notWhiteListedCateg = []
let notWhiteListedSubCateg = []

console.log("skill_list = " , skill_list)

for (let i = 0; i < skill_list.length; i++) {
    skill_now = skill_list[i];

    skills_temp = await fetchSkills(skill_now)
    console.log("skills_temp = " , skills_temp)

    // skills_temp_whiteListed = await whiteListedSkills(skills_temp)

    let res = await notWhiteListedCategories(skills_temp)

    if (res.notWhiteListedCateg ){
        // console.log("change = " ,notWhiteListedCateg,res.notWhiteListedCateg[0])
        notWhiteListedCateg.push(res.notWhiteListedCateg)
    }
    if (res.notWhiteListedSubCateg ){
        notWhiteListedSubCateg.push(res.notWhiteListedSubCateg)
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
