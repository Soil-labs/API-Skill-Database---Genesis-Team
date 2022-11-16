

const whiteList_categories = [
    { id: 17, name: 'Information Technology' },
    { id: 23, name: 'Media and Communications' },
    { id: 7, name: 'Design' },
    { id: 5, name: 'Business' },
    { id: 22, name: 'Marketing and Public Relations' },
    { id: 3, name: 'Analysis' },
    
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
    { id: 395, name: 'Data Management' },
    { id: 393, name: 'Data Collection' },
    { id: 163, name: 'Product Management' },
    { id: 456, name: 'Other Programming Languages' },
    { id: 442, name: 'Microsoft Development Tools' },
    { id: 379, name: 'C and C++' },
    { id: 434, name: 'iOS Development' },
    { id: 558, name: 'Web Analytics and SEO' },
    { id: 392, name: 'Cybersecurity' },
    { id: 451, name: 'Network Security' },
    { id: 415, name: 'Extensible Languages and XML' },
    { id: 369, name: 'Application Programming Interface (API)' },
    { id: 476, name: 'Software Development Tools' },
    { id: 382, name: 'Cloud Solutions' },
    { id: 363, name: 'Computer Science' },
    { id: 472, name: 'Search Engines' },
    { id: 190, name: 'Education Software and Technology' },
    { id: 400, name: 'Database Architecture and Administration' },
    { id: 435, name: 'IT Automation' },
    { id: 375, name: 'Backup Software' },
    { id: 391, name: 'Content Management Systems' },
    { id: 372,name: 'Artificial Intelligence and Machine Learning (AI/ML)'},
    { id: 125, name: 'Mathematics and Mathematical Modeling' },
    { id: 122, name: 'Image Analysis' },
    { id: 437, name: 'Java' },
    { id: 488, name: 'Virtualization and Virtual Machines' },
    { id: 365, name: 'Agile Software Development' },


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
    if (!skills) return 
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

    console.log("notWhiteListedCateg = " , notWhiteListedCateg[0])
    console.log("notWhiteListedSubCateg = " , notWhiteListedSubCateg[0])


    return {notWhiteListedCateg: notWhiteListedCateg[0],notWhiteListedSubCateg: notWhiteListedSubCateg[0]}
    
    
}