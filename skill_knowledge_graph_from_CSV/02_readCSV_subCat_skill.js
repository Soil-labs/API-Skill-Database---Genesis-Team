// import csv from 'csv-parser'
import parse from 'csv-parser'
// import csv from 'csv-parse';

import fs from 'fs'

import {CreateSkillCategory_noLightcast,CreateSkillSubCategory_WithCategory,findSkillSubCategory,createSkill_noLightcast} from "../backEnd_api_func.js"
// import {findProjects,CreateSkillCategory,CreateSkillSubCategory,createSkill,relatedSkills} from "./backEnd_api_func.js"


console.log("We starting now " )


let onlyCategory = false


 
 const processFile = async () => { 
  return new Promise((resolve, reject) => {
    const path = 'v1.0_skillTree/1.0_subCategory.csv';
    const stream = fs.createReadStream(path);
    const parser = parse();

    stream.on('ready', () => {
      stream.pipe(parser);
    });


    parser.on('error', function(err){
        console.error(err.message);
        reject();
      });
  
      parser.on('end', function(){
        console.log('Parsing complete');
        resolve();
      });

    parser.on('readable', async function(){
      let record;
      let everyCategoryDict = {}
      let i=0


      while (record = parser.read()) {


        if (onlyCategory==true && i==1){
          console.log("record = " , i,record)
          for (const [key, value] of Object.entries(record)) {
            addCategory_subCategory(key, value,everyCategoryDict)
          }
        } else if (onlyCategory==false) {
          console.log("record = " , i,record)

          for (const [key, value] of Object.entries(record)) {
            addCategory_subCategory(key, value,everyCategoryDict)
          }
        }

        i = i + 1
      }
      return (record)
    });

    
  });
 }

 let res = await processFile();

 async function addCategory_subCategory(key, value,everyCategoryDict) {

    if (key != "SubCategory" && key !=null && value!=null && value!="") {
      let subCategoryN = await findSkillSubCategory(key);
      console.log("subCategoryN = " , subCategoryN)

      if (subCategoryN.categorySkills && subCategoryN.categorySkills[0]){

        let skillN = await createSkill_noLightcast(value,subCategoryN.categorySkills[0]._id,subCategoryN._id);

        console.log("skillN = " , skillN)
      }

  }

}
