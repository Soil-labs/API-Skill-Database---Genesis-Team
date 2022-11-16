// import csv from 'csv-parser'
import parse from 'csv-parser'
// import csv from 'csv-parse';

import fs from 'fs'

import {CreateSkillCategory_noLightcast,CreateSkillSubCategory_WithCategory} from "../backEnd_api_func.js"
// import {findProjects,CreateSkillCategory,CreateSkillSubCategory,createSkill,relatedSkills} from "./backEnd_api_func.js"


console.log("We starting now " )


let result = [];


let onlyCategory = false


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
      let everyCategory = [];
      let everyCategoryDict = {}
      let i=0
      while  (record = parser.read()) {
        
        if (onlyCategory==true && i==1){
          for (const [key, value] of Object.entries(record)) {
            addCategory(key, value,everyCategoryDict)
          }
        } else if (onlyCategory==false) {
          for (const [key, value] of Object.entries(record)) {
            addCategory(key, value,everyCategoryDict)
          }
        }

        i = i + 1


        // for (const [key, value] of Object.entries(record)) {
        //     console.log("key,value = ",key,value);
        //     // console.log("record[key] = ",value);

        //     // setTimeout( 
        //     //   addCategory(key, value,everyCategoryDict) 
        //     // ,7000);


        //     // clearTimeout(timer);


        //     // await addCategory(key, value,everyCategoryDict);

        //     // if (key === "Design" && key !=null && value!=null && value!="") {
        //     // // if (key != "Category" && key !=null && value!=null && value!="") {

        //     //   let categoryN_id
        //     //   if (everyCategoryDict[key] == undefined){
        //     //     console.log("change = tori" ,key,value)
        //     //     let categoryN = await CreateSkillCategory_noLightcast(key);
        //     //     console.log("categoryN = " , categoryN)

        //     //     // everyCategory.push(categoryN);
        //     //     everyCategoryDict[key] = categoryN._id;

        //     //     categoryN_id = categoryN._id;
        //     //   } else {
        //     //     console.log("change = nopa" ,key,value)

        //     //     categoryN_id = everyCategoryDict[key];
        //     //     console.log("categoryN_id = " , categoryN_id)
        //     //   }
              
        //     //     // let subCategoryN = await CreateSkillSubCategory_WithCategory(value,categoryN_id);
        //     //     // console.log("subCategoryN = " , subCategoryN)

        //     // }

        // }
        // break

      }
      return (record)
    });

    
  });
 }

//   processFile = async () => { 
//   return new Promise((resolve, reject) => {
//     const path = 'v1.0_skillTree/1.0_category.csv';
//     const stream = fs.createReadStream(path);
//     const parser = parse();

//     stream.on('ready', () => {
//       stream.pipe(parser);
//     });


//     parser.on('error', function(err){
//         console.error(err.message);
//         reject();
//       });
  
//       parser.on('end', function(){
//         console.log('Parsing complete');
//         resolve();
//       });

//     parser.on('readable', async function(){
//       let record;
//       let everyCategory = [];
//       let everyCategoryDict = {}
//       let i=0
//       while  (record = parser.read()) {
        
//         if (i==5){
//         console.log("record = " , i,record)
//         }

//         i = i + 1


//         // for (const [key, value] of Object.entries(record)) {
//         //     console.log("key,value = ",key,value);
//         //     // console.log("record[key] = ",value);

//         //     // setTimeout( 
//         //     //   addCategory(key, value,everyCategoryDict) 
//         //     // ,7000);


//         //     // clearTimeout(timer);


//         //     // await addCategory(key, value,everyCategoryDict);

//         //     // if (key === "Design" && key !=null && value!=null && value!="") {
//         //     // // if (key != "Category" && key !=null && value!=null && value!="") {

//         //     //   let categoryN_id
//         //     //   if (everyCategoryDict[key] == undefined){
//         //     //     console.log("change = tori" ,key,value)
//         //     //     let categoryN = await CreateSkillCategory_noLightcast(key);
//         //     //     console.log("categoryN = " , categoryN)

//         //     //     // everyCategory.push(categoryN);
//         //     //     everyCategoryDict[key] = categoryN._id;

//         //     //     categoryN_id = categoryN._id;
//         //     //   } else {
//         //     //     console.log("change = nopa" ,key,value)

//         //     //     categoryN_id = everyCategoryDict[key];
//         //     //     console.log("categoryN_id = " , categoryN_id)
//         //     //   }
              
//         //     //     // let subCategoryN = await CreateSkillSubCategory_WithCategory(value,categoryN_id);
//         //     //     // console.log("subCategoryN = " , subCategoryN)

//         //     // }

//         // }
//         // break

//       }
//       return (record)
//     });

    
//   });
//  }
 
//  const processFile = async () => { 
//   return new Promise((resolve, reject) => {
//     const path = 'v1.0_skillTree/1.0_category.csv';
//     const stream = fs.createReadStream(path);
//     const parser = parse();

//     stream.on('ready', () => {
//       stream.pipe(parser);
//     });


//     parser.on('error', function(err){
//         console.error(err.message);
//         reject();
//       });
  
//       parser.on('end', function(){
//         console.log('Parsing complete');
//         resolve();
//       });

//     parser.on('readable', async function(){
//       let record;
//       let everyCategory = [];
//       let everyCategoryDict = {}
//       while  (record = parser.read()) {
//         // Do transforms / side effects here
//         // console.log('record', record);

//         // To start the loop
//         setInterval(function(){
//           // Do your update stuff...
//           loopRecord();
//         }, 5000);

//         // To stop the loop
//         // clearInterval(mainLoopId);

//         // ------------ Split record ----------------

//         // setTimeout(() => {
//         //   // addCategory(key, value,everyCategoryDict) 
//         //   console.log("zoro style = " ,value)
//         // }, 3000)


//         // for (const [key, value] of Object.entries(record)) {
//         //     // console.log("key,value = ",key,value);
//         //     // console.log("record[key] = ",value);

//         //     // setTimeout( 
//         //     //   addCategory(key, value,everyCategoryDict) 
//         //     // ,7000);

//         //     console.log("change = " )
//         //     // const timer = setTimeout(() => {
//         //     //   // addCategory(key, value,everyCategoryDict) 
//         //     //   console.log("zoro style = " ,value)
//         //     // }, 3000)
//         //     setTimeout(() => {
//         //       // addCategory(key, value,everyCategoryDict) 
//         //       console.log("zoro style = " ,value)
//         //     }, 3000)

//         //     // clearTimeout(timer);


//         //     // await addCategory(key, value,everyCategoryDict);

//         //     // if (key === "Design" && key !=null && value!=null && value!="") {
//         //     // // if (key != "Category" && key !=null && value!=null && value!="") {

//         //     //   let categoryN_id
//         //     //   if (everyCategoryDict[key] == undefined){
//         //     //     console.log("change = tori" ,key,value)
//         //     //     let categoryN = await CreateSkillCategory_noLightcast(key);
//         //     //     console.log("categoryN = " , categoryN)

//         //     //     // everyCategory.push(categoryN);
//         //     //     everyCategoryDict[key] = categoryN._id;

//         //     //     categoryN_id = categoryN._id;
//         //     //   } else {
//         //     //     console.log("change = nopa" ,key,value)

//         //     //     categoryN_id = everyCategoryDict[key];
//         //     //     console.log("categoryN_id = " , categoryN_id)
//         //     //   }
              
//         //     //     // let subCategoryN = await CreateSkillSubCategory_WithCategory(value,categoryN_id);
//         //     //     // console.log("subCategoryN = " , subCategoryN)

//         //     // }

//         // }

//         // ------------ Split record ----------------
//       }
//       return (record)
//     });

    
//   });
//  }

 let res = await processFile();


 function loopRecord (record){
  console.log("change = " )
  // for (const [key, value] of Object.entries(record)) {
  //   console.log("key,value = " , key,value)
  // }
 }

async function addCategory(key, value,everyCategoryDict) {

  // if (key === "Design" && key !=null && value!=null && value!="") {
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





//  console.log("res = " , res)

// let r = await fs.createReadStream('category4.csv')
//     .pipe(csv({}))
//     .on('data', (data) => result.push(data))
//     .on('end', () => {
//         return (result)
//     });

// console.log("r = " , r)


// const array = await csv().fromFile('category4.csv');

// console.log("array = " , array)

// fs.createReadStream('category4.csv')
//     .pipe(csv({}))
//     .on('data', (data) => result.push(data))
//     .on('end', () => {
        

        // for (let i = 0; i < result.length; i++) {
        //     console.log(result[i]);

        //     // Object.keys(result[i]).forEach(function(key) {
        //     for (const [key, value] of Object.entries(result[i])) {
        //         console.log("key = ",key);
        //         console.log("result[i][key] = ",value);

        //         // if (key != "Category") {
        //         //     // let categoryN = await CreateSkillCategory_noLightcast(value);
        //         //     console.log("categoryN = " , categoryN)
        //         // }


                

        //     }
                
            
        // }
//     }
// );