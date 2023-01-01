// import csv from 'csv-parser'
import parse from "csv-parser";
// import csv from 'csv-parse';

import fs from "fs";

import {
  relatedNode,
  relatedNode_name,
  findSkillSubCategory,
  CreateNode,
  CreateSkillCategory_noLightcast,
  CreateSkillSubCategory_WithCategory,
} from "../backEnd_api_func.js";

console.log("We starting now ");

var cp1 = process.argv[2];
var cp2 = process.argv[3];
var cp3 = process.argv[4];
var cp4 = process.argv[5];
if (cp2 == "false") {
  cp2 = false;
} else {
  cp2 = true;
}

console.log("cp1 = ", cp1);
console.log("cp2 = ", cp2);

let processFile = async (arrayRecords, path) => {
  return new Promise((resolve, reject) => {
    // const path = './V0.0_CSV_graph/01_expertise/similar.csv';
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
        // console.log("record = " , record)

        arrayRecords.push(record);

        i = i + 1;
      }
      return record;
    });
  });
};

//  let functionRun = "createRelationships" // createNodes, createRelationships
//  let onlyCategory = false

let functionRun = cp1; // createNodes, createRelationships
let onlyCategory = cp2;
let path = cp3;
let node = cp4;

if (functionRun == "createNodes") {
  let createNodes = [];

  await processFile(createNodes, path);
  console.log("arrayRecords = ", createNodes);

  let everyCategoryDict = {};

  for (var i = 1; i <= createNodes.length; ++i)
    await createNodesFromRecord(
      i,
      createNodes,
      everyCategoryDict,
      node,
      onlyCategory
    );
} else if (functionRun == "createRelationships") {
  let createNodes = [];
  await processFile(createNodes, path);
  // console.log("createNodes = " , createNodes)

  for (var i = 1; i <= createNodes.length; ++i)
    await createRelationshipFromRecord(i, createNodes);
}

async function createNodesFromRecord(
  i,
  nodeArray,
  everyCategoryDict,
  node,
  onlyCategory = true
) {
  setTimeout(function () {
    let record = nodeArray[i - 1];

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

    console.log("change = ", i);
  }, 1000 * i);
}

async function createRelationshipFromRecord(
  i,
  nodeArray,
  everyCategoryDict,
  node,
  onlyCategory = true
) {
  setTimeout(function () {
    let record = nodeArray[i - 1];

    // relatedNode_name(
    //   record["name"],
    //   record["name2"],
    //   record["level"],
    //   record["connection_name"]
    // );
    if (true) {
      // if (record["direction"]!="d"){ // it is bidirectional
      // it is bidirectional
      relatedNode_name(
        record["name2"],
        record["name"],
        record["level"],
        record["connection_name"]
      );
    }
  }, 1000 * i);
}

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

      console.log("res = ", name, node);

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
