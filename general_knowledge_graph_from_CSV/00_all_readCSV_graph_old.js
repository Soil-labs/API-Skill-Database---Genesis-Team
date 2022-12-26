// import csv from 'csv-parser'
import parse from 'csv-parser'
// import csv from 'csv-parse';

import fs from 'fs'

import {relatedNode,relatedNode_name,findSkillSubCategory,CreateNode,CreateSkillCategory_noLightcast,CreateSkillSubCategory_WithCategory} from "../backEnd_api_func.js"


console.log("We starting now " )




let onlyCategory = false



let processFile = async (arrayRecords) => { 
  return new Promise((resolve, reject) => {

    // let arrayRecords = []


    const path = './V0.0_CSV_graph/01_expertise/similar.csv';
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
      while  (record = parser.read()) {


        
        arrayRecords.push(record)
        // console.log("record = " , arrayRecords,record)


      }
      return (record)
    });

    console.log("arrayRecords = " , arrayRecords)

    return (arrayRecords)
    
  }).then((arrayRecords) => {
    console.log("arrayRecords = " , arrayRecords)
    return arrayRecords
  })

  
 }


 let arrayRecords2 = await processFile([]);

 console.log("arrayRecords2 = " , arrayRecords2)



//  function doSetTimeout(i) {
//   setTimeout(function() { 
    
    
//     let record = arrayRecords[i-1] 

    
//     console.log("change = ",i-1,record ) 

//     let similarData = relatedNode_name(record["name"],record["name2"]);
  
//   }, 3000*i);
// }

// for (var i = 1; i <= arrayRecords.length; ++i)
//   doSetTimeout(i);










 async function addCategory_subCategory(name,sub_name, node,everyCategoryDict) {

    if (name != "Category" && name !=null && node!=null && node!="") {


    //   console.log("name, node = " , name, node,everyCategoryDict)

      let categoryN_id,res
      if (everyCategoryDict[name] == undefined){

        let categoryN = await CreateNode(name,node,undefined);

        // console.log("res = " , name,node)

        everyCategoryDict[name] = categoryN._id;

        categoryN_id = categoryN._id;
      } 
      else {
        categoryN_id = everyCategoryDict[name];

        // console.log("categoryN_id = " , categoryN_id)
      }


    if (sub_name){
        let categoryN = await CreateNode(sub_name,"sub_"+node,categoryN_id);
    }
      
    //     let subCategoryN = await CreateSkillSubCategory_WithCategory(value,categoryN_id);
    //     console.log("subCategoryN = " , subCategoryN)

    }
    return everyCategoryDict

}

