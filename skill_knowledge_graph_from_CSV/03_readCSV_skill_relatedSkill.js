// import csv from 'csv-parser'
import parse from 'csv-parser'
// import csv from 'csv-parse';

import fs from 'fs'

import {findSkill_name,relatedSkills} from "../backEnd_api_func.js"
// import {findProjects,CreateSkillCategory,CreateSkillSubCategory,createSkill,relatedSkills} from "./backEnd_api_func.js"


console.log("We starting now " )


let result = [];


// import parse from 'csv-parse';
// import fs from 'fs';
 
 const processFile = async () => { 
  return new Promise((resolve, reject) => {
    const path = 'v1.0_skillTree/1.0_relatedSkills.csv';
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
      while (record = parser.read()) {
        // Do transforms / side effects here
        // console.log('record', record);

        // ------------ Split record ----------------

        for (const [key, value] of Object.entries(record)) {

            if (key != "Main Skill" && key !=null && value!=null && value!="") {
              console.log("key,value = ",key,value);

                let skillKeyN = await findSkill_name(key);
                console.log("skillKeyN = " , skillKeyN)

                let skillRelatedN = await findSkill_name(value);
                console.log("skillRelatedN = " , skillRelatedN)



                let relationSkill = await relatedSkills(skillKeyN._id,skillRelatedN._id);
                console.log("relationSkill = " , relationSkill)

                // if (subCategoryN.categorySkills && subCategoryN.categorySkills[0]){
                //   let skillN = await createSkill_noLightcast(value,subCategoryN.categorySkills[0]._id,subCategoryN._id);

                //   console.log("skillN = " , skillN)
                // }

            }

        }

        // ------------ Split record ----------------
      }
      return (record)
    });

    
  });
 }

 let res = await processFile();
 

 