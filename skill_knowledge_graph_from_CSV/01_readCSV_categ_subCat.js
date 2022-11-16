// import csv from 'csv-parser'
import parse from 'csv-parser'
// import csv from 'csv-parse';

import fs from 'fs'

import {CreateSkillCategory_noLightcast,CreateSkillSubCategory_WithCategory} from "../backEnd_api_func.js"


console.log("We starting now " )




let onlyCategory = true


let processFile = async () => { 
  return new Promise((resolve, reject) => {
    const path = 'v1.0_skillTree/1.0_category.csv';
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
      while  (record = parser.read()) {

        console.log("record = " , record)
        
        // if (onlyCategory==true && i==1){
        //   for (const [key, value] of Object.entries(record)) {
        //     // addCategory_subCategory(key, value,everyCategoryDict)
        //     console.log("key, value = " , key, value)
        //   }
        // } else if (onlyCategory==false) {
        //   // for (const [key, value] of Object.entries(record)) {
        //   //   addCategory_subCategory(key, value,everyCategoryDict)
        //   // }
        // }

        i = i + 1

      }
      return (record)
    });

    
  });
 }


 let res = await processFile();



async function addCategory_subCategory(key, value,everyCategoryDict) {

    if (key != "Category" && key !=null && value!=null && value!="") {

      let categoryN_id
      if (everyCategoryDict[key] == undefined){
        let categoryN = await CreateSkillCategory_noLightcast(key);

        // everyCategory.push(categoryN);
        everyCategoryDict[key] = categoryN._id;

        categoryN_id = categoryN._id;
      } else {

        categoryN_id = everyCategoryDict[key];
      }
      
        let subCategoryN = await CreateSkillSubCategory_WithCategory(value,categoryN_id);
        console.log("subCategoryN = " , subCategoryN)

  }
}

