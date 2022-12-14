import { URLSearchParams } from "url";
import dotenv from "dotenv";
import fetch from "node-fetch";
import apiClient from "./api/axios.js"
import {findProjects,CreateSkillCategory,CreateSkillSubCategory,createSkill,relatedSkills} from "./backEnd_api_func.js"

import {fetchSkills,fetchSkillFromPara,fetchRelatedSkills,getSkillById} from "./skill_api_func.js";

import {whiteListedSkills} from "./whitelist_categories.js";

dotenv.config();




let skill_list,skill_now,skills_temp,skills_temp_whiteListed,skill_whiteList_now,createdSubCategory,createdCategory,createdSkill

// skill_list = ["python"]
// skill_list = ["css","python","javascript","blockchain","react","html"]//,"editing","video","software","development","web","video","production","software","development","web","development"]

// skill_list = ["css","python","javascript","blockchain","react","html","software","development","web",
//             ,"editing","video","video",
//             ,"3d art","adobe stock"]
// skill_list = ["neo4j","graph","blockchain","node"]
// skill_list = ["neo4j","graph","blockchain","node"]

// skill_list = ["Java Language","Agile Product Development","Agile Product Management","Digital Product Management","Lifecycle Management","Platform Product Management","Product Lifecycle Management","Product Data Management"]
skill_list = [
//     "css","python","javascript"
// ,"blockchain","react","html","software","development","web"]
            ,"editing","video","video"
            ,"3d art",
            // "adobe stock","neo4j","graph","blockchain","node","Java Language","Agile Product Development","Agile Product Management","Digital Product Management","Lifecycle Management","Platform Product Management","Product Lifecycle Management","Product Data Management","Product Requirements Documents","Product Roadmap Management","Scrum Master","Requirements Specifications","User Story","Product Strategy","Product Roadmaps","Product Backlog Grooming","Business Analysis","Business Requirements","KPI Reporting","Conflict Management","Cross-Functional Collaboration","Cross-Functional Coordination","Data Acquisition","Data Classification","Data Curation","Go (Programming Language)","Markup Languages","Program Flow","Swift (Programming Language)","UML Tool","Visual Programming Language (VPL)","CoffeeScript","ASP.NET Core","IOS Development","Objective-C (Programming Language)","watchOS","Business Strategies","Corporate Strategy","Commercial Development","Customer Development",
            // "Digital Customer Strategy","Exit Strategies","Growth Planning","Growth Strategies","Organizational Strategy","Mission Statement Development","Small Business Development","Strategic Decision-Making","Strategic Leadership","Strategic Thinking","Value Creation","A/B Testing","Google Analytics","User Tracking","Cloud Security Applications","Data Security","Database Encryption","Digital Security","Ethical Hacking","Firewalld","Information Security Management","Internet Security",".NET Remoting","API Management","Amazon API Gateway","Application Programming Interface (API)","Dropbox API","Facebook API","Google App Engines","Graphics Device Interface","HTML Document Object Models","Java API For RESTful Web Services","OpenAPI","RESTful API","XML For Analysis","Social Media APIs","Search Algorithms","Search Technologies","Search Engine Optimization","Oracle Learning Management","Oracle Audit Vault","Oracle Database Vault","Oracle Workflow","Full Stack (Software Engineering)","Data Administration","Database Activity Monitoring","Database Activity Monitoring","Database Testing","AWS Backup","AWS CodeBuild","Amazon Cloud Drive","Amazon Web Services",
            "Dataflow","Google Cloud","Twilio","Django (Web Framework)","Dynamic Websites","JSON Web Signature (JWS)","Wix","Web Development Tools","SASS",
            ,"Machine Learning","Machine Learning Algorithms","PyTorch (Machine Learning Library)","Recommendation Engine","Recurrent Neural Network (RNN)","Reinforcement Learning","Scikit-learn (Machine Learning Library)","Supervised Learning","TensorFlow","Training Datasets","Unsupervised Learning","Game Theory","Convolutional Neural Networks","Artificial Neural Networks","Chatbot","Gradient Boosting","Facial Recognition",
            // "Java Platform Standard Edition (J2SE)","Java Portlet Specification","Java Runtime Environment","Java Scripting Languages","Java Virtual Machine (JVM)","Agile Coaching","Agile Modeling","Agile Project Management","Agile Software Development","Agile Testing","Disciplined Agile Delivery","Feature-Driven Development (FDD)","Sprint Backlogs",
            "Story Point Estimation"]
        


            


// skill_list = ["css"]


// skills_temp = await fetchSkills("blockchain")
// console.log("skills_temp = " , skills_temp)



for (let i = 0; i < skill_list.length; i++) {
    skill_now = skill_list[i];

    console.log("skill_now = " , skill_now)

    skills_temp = await fetchSkills(skill_now)

    skills_temp_whiteListed = await whiteListedSkills(skills_temp)


    // console.log("skills_whiteListed",skills_temp_whiteListed)

    let skillData = await saveSkills_MongoNeo(skills_temp_whiteListed) 

    // console.log("skillData = " , skillData)

    // ---------------- Search related Skills ----------------
    for (let j=0;j<skillData.length;j++){
        skill_whiteList_now = skills_temp_whiteListed[j]
        // console.log("skill_whiteList_now = " , skill_whiteList_now)
        let skills_temp_related = await fetchRelatedSkills(skill_whiteList_now.id)
        // console.log("skills_temp_related",skills_temp_related)


        let maxSkill
        if (skills_temp_related) {
            if (skills_temp_related.length<5){
                maxSkill = skills_temp_related.length
            } else {
                maxSkill = 5
            }
        } else {
            maxSkill = 0
        }

        for (let k=0;k<maxSkill;k++){
            let skill_related_now = skills_temp_related[k]
            
            let skill_related_now_full = await getSkillById(skill_related_now.id);
            // console.log("skill_related_now_full = " , skill_related_now_full)

            console.log("related ----- " , skill_related_now.name)

            let relatedSkillData = await saveSkills_MongoNeo([skill_related_now_full]) 

            if (relatedSkillData && relatedSkillData[0] && relatedSkillData[0]._id){
                // console.log("change = " , skillData[j]._id,relatedSkillData[0]._id)
                let related_skills_res = await relatedSkills(skillData[j]._id,relatedSkillData[0]._id)

                // console.log("related_skills_res = " , related_skills_res)
            }
        }
    }
    // ---------------- Search related Skills ----------------
    


}


async function saveSkills_MongoNeo(skills_temp_whiteListed) {

    let createdSkills = []

    if (skills_temp_whiteListed){
        for (let j=0;j<skills_temp_whiteListed.length;j++){
            skill_whiteList_now = skills_temp_whiteListed[j]

            createdSubCategory = await CreateSkillCategory(skill_whiteList_now.category.name,skill_whiteList_now.category.id) 

            createdCategory = await CreateSkillSubCategory(skill_whiteList_now.subcategory.name,skill_whiteList_now.subcategory.id) 



            
            createdSkill = await createSkill(skill_whiteList_now.name,skill_whiteList_now.id,createdSubCategory._id,createdCategory._id)

            createdSkills.push(createdSkill)
            // console.log("createdSkills = " , createdSkills)

        }
    }

    return (createdSkills)
}
