// import csv from 'csv-parser'
import parse from "csv-parser";
// import csv from 'csv-parse';

import fs from "fs";

import {
  findSkillSubCategory,
  CreateNode,
  CreateSkillCategory_noLightcast,
  CreateSkillSubCategory_WithCategory,
} from "../backEnd_api_func.js";

console.log("We starting now ");

let onlyCategory = false;
let node = "expertise";

let processFile = async () => {
  return new Promise((resolve, reject) => {
    const path = "./V0.0_CSV_graph/01_expertise/create.csv";
    const stream = fs.createReadStream(path);
    const parser = parse();

    stream.on("ready", () => {
      stream.pipe(parser);
    });

    parser.on("error", function (err) {
      console.error(err.message);
      reject();
    });

    parser.on("end", function () {
      console.log("Parsing complete");
      resolve();
    });

    parser.on("readable", async function () {
      let record;
      let everyCategoryDict = {};
      let i = 0;
      while ((record = parser.read())) {
        console.log("record = ", record);

        if (onlyCategory == true && i === 1) {
          // console.log("key, value = " , record,"    ---  ",i)

          for (const [key, value] of Object.entries(record)) {
            if (everyCategoryDict[key] == undefined) {
              everyCategoryDict = addCategory_subCategory(
                key,
                undefined,
                node,
                everyCategoryDict
              );
              //   console.log("key, value = " , key, value,"    ---  ",i)
              //   console.log("everyCategoryDict = " , everyCategoryDict)

              // console.log("everyCategoryDict[key] = " , everyCategoryDict[key],record)
            }
          }
        } else if (onlyCategory == false) {
          for (const [key, value] of Object.entries(record)) {
            everyCategoryDict = addCategory_subCategory(
              key,
              value,
              node,
              everyCategoryDict
            );
            // console.log("key, value = " , key, value)
          }
        }

        i = i + 1;
      }
      return record;
    });
  });
};

let res = await processFile();

async function addCategory_subCategory(
  name,
  sub_name,
  node,
  everyCategoryDict
) {
  if (name != "Category" && name != null && node != null && node != "") {
    //   console.log("name, node = " , name, node,everyCategoryDict)

    let categoryN_id, res;
    if (everyCategoryDict[name] == undefined) {
      let categoryN = await CreateNode(name, node, undefined);

      // console.log("res = " , name,node)

      everyCategoryDict[name] = categoryN._id;

      categoryN_id = categoryN._id;
    } else {
      categoryN_id = everyCategoryDict[name];

      // console.log("categoryN_id = " , categoryN_id)
    }

    if (sub_name) {
      let categoryN = await CreateNode(sub_name, "sub_" + node, categoryN_id);
    }

    //     let subCategoryN = await CreateSkillSubCategory_WithCategory(value,categoryN_id);
    //     console.log("subCategoryN = " , subCategoryN)
  }
  return everyCategoryDict;
}
