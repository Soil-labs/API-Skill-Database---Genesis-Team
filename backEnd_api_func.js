import apiClient from "./api/axios.js"

export async function findProjects() {

    let res = await apiClient({
    data: {
        query: `query{
        findProjects(fields:{
            # serverID: "996558082098339953"
        }){
            _id
            title
            
        }
        }`,
    },
    })

  return (res.data.data.findProjects)

}

export async function CreateSkillCategory(name,id_lightcast) {

    let res = await apiClient({
    data: {
        query: `mutation{
            updateSkillCategory(fields:{
              name: "${name}"
              
              id_lightcast: "${id_lightcast}"
            }){
              _id
              name
              id_lightcast
            }
          }`,
    },
    })

  return (res.data.data.updateSkillCategory)

}

export async function CreateSkillCategory_noLightcast(name,id_lightcast) {

  let res = await apiClient({
  data: {
      query: `mutation{
          updateSkillCategory(fields:{
            name: "${name}"
          }){
            _id
            name
          }
        }`,
  },
  })

return (res.data.data.updateSkillCategory)

}

export async function CreateSkillSubCategory(name,id_lightcast) {

    let res = await apiClient({
    data: {
        query: `mutation{
            updateSkillSubCategory(fields:{
              name: "${name}"
              
              id_lightcast: "${id_lightcast}"
            }){
              _id
              name
              id_lightcast
            }
          }`,
    },
    })

  return (res.data.data.updateSkillSubCategory)

}

export async function CreateSkillSubCategory_WithCategory(name,categorySkillsID) {

  let res = await apiClient({
  data: {
      query: `mutation{
          updateSkillSubCategory(fields:{
            name: "${name}"
            categorySkills: "${categorySkillsID}"
          }){
            _id
            name
            categorySkills {
              _id
              name
            }
          }
        }`,
  },
  })

  return (res.data.data.updateSkillSubCategory)

}

export async function findSkillSubCategory(name) {

  let res = await apiClient({
  data: {
      query: `mutation{
          updateSkillSubCategory(fields:{
            name: "${name}"
          }){
            _id
            name
            categorySkills {
              _id
              name
            }
          }
        }`,
  },
  }).catch((err) => {
    console.log("err = " , err)
  })

  // console.log("res = " , res)

  return (res.data.data.updateSkillSubCategory)

}

export async function createSkill(name,id_lightcast,categorySkills,subCategorySkill) {

    let res = await apiClient({
    data: {
        query: `mutation{
            createSkill(fields:{
              name: "${name}"
              state: approved
              categorySkills: ["${categorySkills}"]
              subCategorySkill: ["${subCategorySkill}"]
              id_lightcast: "${id_lightcast}"
            }){
              _id
              name
              state
              categorySkills{
                name
              }
              subCategorySkill{
                name
              }
              id_lightcast
              
                
            }
          }`,
    },
    })

  return (res.data.data.createSkill)

}

export async function createSkill_noLightcast(name,categorySkills,subCategorySkill) {

  let res = await apiClient({
  data: {
      query: `mutation{
          createSkill(fields:{
            name: "${name}"
            state: approved
            categorySkills: ["${categorySkills}"]
            subCategorySkill: ["${subCategorySkill}"]
          }){
            _id
            name
            state
            categorySkills{
              name
            }
            subCategorySkill{
              name
            }
            
              
          }
        }`,
  },
  })

return (res.data.data.createSkill)

}


export async function findSkill_name(name) {

  let res = await apiClient({
  data: {
      query: `mutation{
          createSkill(fields:{
            name: "${name}"
            state: approved
          }){
            _id
            name
            state
            categorySkills{
              name
            }
            subCategorySkill{
              name
            }
            
              
          }
        }`,
  },
  })

return (res.data.data.createSkill)

}


export async function relatedSkills(coreSkill_id,relatedSkill_id) {

  let res = await apiClient({
  data: {
      query: `mutation{
        relatedSkills(fields:{
          _id: "${coreSkill_id}"
          relatedSkills_id: ["${relatedSkill_id}"]
        }){
          _id
          name
      
          relatedSkills{
            _id
            name
          }
          
            
        }
      }`,
  },
  })

// return (res.data)
return (res.data.data.relatedSkills)

}


export async function CreateNode(name,node,aboveNode) {

  let res = await apiClient({
    data: {
        query: `mutation{
          createNode(fields:{
            name: "${name}"
            node: "${node}"
            ${aboveNode!=undefined ? `aboveNodes: "${aboveNode}"` : ``}
          }){
            _id
            name
            node
            aboveNodes {
              _id
              name
              node
            }
            subNodes {
              _id
              name
            }
              
          }
        }`,
    },
    }).catch((error) => {
      console.log("error = " , error)
    })

    return (res.data.data.createNode)

}

export async function relatedNode(_id,relatedNode_id) {

  let res = await apiClient({
    data: {
        query: `mutation{
          relatedNode(fields:{
            _id: "${_id}"
            relatedNode_id: "${relatedNode_id}"
          }){
            _id
            name
            relatedNodes {
              _id
              name
            }
              
          }
        }`,
    },
    }).catch((error) => {
      console.log("error = " , error)
    })

    console.log("id,relatedNode_id = " , _id,relatedNode_id,res.data.data.relatedNode)

    return (res.data.data.relatedNode)

}

export async function relatedNode_name(name,relatedNode_name) {

  let res =  await apiClient({
    data: {
        query: `mutation{
          relatedNode_name(fields:{
            name: "${name}"
            relatedNode_name: "${relatedNode_name}"
          }){
            _id
            name
            relatedNodes {
              _id
              name
            }
              
          }
        }`,
    },
    }).catch((error) => {
      console.log("error = " , error)
    })

    // console.log("res = " , res)

    console.log("name,relatedNode_name = " , name,relatedNode_name,res.data.data.relatedNode_name)

    // return (res.data.data.relatedNode_name)

}