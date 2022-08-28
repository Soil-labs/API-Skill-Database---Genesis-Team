

const whiteList_categories = [
    { id: 17, name: 'Information Technology' },
    { id: 23, name: 'Media and Communications' },
    { id: 7, name: 'Design' },
]

const whiteList_subCategories = [
    { id: 438, name: 'JavaScript and jQuery' },
    { id: 471, name: 'Scripting Languages' },
    { id: 491, name: 'Web Design and Development' },
    { id: 118, name: 'Data Science' },
    { id: 174, name: 'Graphic and Visual Design' },
    { id: 378, name: 'Blockchain' },
    { id: 474, name: 'Software Development' },
    { id: 155, name: 'Business Strategy' },
    { id: 494, name: 'Web Services' },
    { id: 567, name: 'Writing and Editing' },
    { id: 487, name: 'Video and Web Conferencing' },
]


async function isWhiteListed_category(category) {


    let isWhiteListed = false
    for (let i = 0; i < whiteList_categories.length; i++) {
        if (whiteList_categories[i].name == category.name) {
            isWhiteListed = true
            break
        }
    }

    return isWhiteListed
    
}
async function isWhiteListed_subCategory(subCategory) {
    
    let isWhiteListed = false
    for (let i = 0; i < whiteList_subCategories.length; i++) {
        if (whiteList_subCategories[i].name == subCategory.name) {
            isWhiteListed = true
            break
        }
    }

    return isWhiteListed
}

export async function whiteListedSkills(skills,allowEverything = false) {

    let whiteListedSkills = []
    for (let i = 0; i < skills.length; i++) {
        let isWhiteListed_category_t = await isWhiteListed_category(skills[i].category)
        let isWhiteListed_subCategory_t = await isWhiteListed_subCategory(skills[i].subcategory)
        // console.log("skills[i] = " , skills[i],isWhiteListed_category_t,isWhiteListed_subCategory_t)
        if (allowEverything || (isWhiteListed_category_t && isWhiteListed_subCategory_t) ) {
            whiteListedSkills.push(skills[i])
        }
    }
    return whiteListedSkills
    
    
}

export async function notWhiteListedCategories(skills) {

    let notWhiteListedCateg = []
    let notWhiteListedSubCateg = []

    for (let i = 0; i < skills.length; i++) {
        let isWhiteListed_category_t = await isWhiteListed_category(skills[i].category)

        if (!isWhiteListed_category_t) {
            notWhiteListedCateg.push(skills[i].category)
        }

        let isWhiteListed_subCategory_t = await isWhiteListed_subCategory(skills[i].subcategory)
        if (!isWhiteListed_subCategory_t) {
            notWhiteListedSubCateg.push(skills[i].subcategory)
        }
        
    }

    console.log("notWhiteListedCateg = " , notWhiteListedCateg)
    console.log("notWhiteListedSubCateg = " , notWhiteListedSubCateg)


    return {notWhiteListedCateg: notWhiteListedCateg[0],notWhiteListedSubCateg: notWhiteListedSubCateg[0]}
    
    
}