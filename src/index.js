let i
let j
let showSearchError
document.addEventListener("DOMContentLoaded", () =>{
    for(i=1; i< 49; i++){
        fetchSprites(i)
    }

    const spriteContainer = document.getElementById("sprite-container")
    const backBtn = document.getElementById("back")
    const forwardBtn = document.getElementById("forward")

    if(i===49) {
        backBtn.disabled = true
    }

    forwardBtn.addEventListener("click", () => {
        let j = i
        for(i=i; i<j+48; i++){
            spriteContainer.innerHTML= ""
            fetchSprites(i)
        }
        if(i!==49){
            backBtn.disabled = false
        }
        if(i>898){
            forwardBtn.disabled = true
        }
    })

    backBtn.addEventListener("click", () => {
        let j = i-96
        i=i-48
        for(j=j; j<i; j++){
            spriteContainer.innerHTML=""
            fetchSprites(j)
        }
        if(j===49){
            backBtn.disabled = true
        }
        if(i<914){
            forwardBtn.disabled = false
        }
    })

    const form = document.querySelector("form")
    form.addEventListener("submit", e => {
        e.preventDefault()
        let name = document.getElementById("'mon-name")
        let number = document.getElementById("dex-number")
        getCard(name.value,number.value)
        form.reset()
    })

    showSearchError = () => {
        const error = document.getElementById("modal")
        error.hidden = false
        setTimeout(() => error.hidden = true , 2000)
    }
})

function fetchSprites(id){
    if(id<=898){    
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(resp => resp.json())
        .then(json => {
            const spriteImg = document.createElement("img")
            spriteImg.src = json.sprites.front_default
            spriteImg.addEventListener("click", () => renderCard(json))
            document.getElementById("sprite-container").appendChild(spriteImg)
        })
    }
}

function renderCard(data){
    const cardContainer = document.getElementById("card-container")
    cardContainer.innerHTML = ""
    const newCard = document.createElement("div")
    newCard.id = "pokemon-card"
    newCard.innerHTML = `
        <h2>${data.name.toUpperCase()}</h2>
        <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name.toUpperCase()}">
    `
    for(const slots of data.types){
        const monType = document.createElement("h3")
        monType.innerText = slots.type.name
        monType.id = slots.type.name
        newCard.appendChild(monType)
    }

    const flavorText = document.createElement("h3")

    const text = getFlavorText(data.species.url).then( (json) =>{
        arrIndex = Math.floor(Math.random()*11)
        const respText = json.flavor_text_entries[arrIndex].flavor_text
        console.log(respText)
        flavorText.innerText = respText
        newCard.appendChild(flavorText)
    })


    console.log("inside renderCard function:", text)

    const teamBtn = document.createElement("button")
    teamBtn.id = "team-btn"
    teamBtn.innerText = "Add to My Team!"
    teamBtn.addEventListener("click", () => {
        addTeamMember(data)
    })
    //console.log("line 104", data)
    newCard.appendChild(teamBtn)
    cardContainer.appendChild(newCard)
}


function getFlavorText(textUrl){
    return fetch(`${textUrl}`).then(resp => resp.json())
    // .then(json => {
    //     arrIndex = Math.floor(Math.random()*11)
    //     const flavorText = json.flavor_text_entries[arrIndex].flavor_text
    //     console.log("inside flavorText function:",flavorText)
    //     return flavorText
    //})
}

function addTeamMember(pokeData){
    const memberSprite = document.createElement("img")
    const removeBtn = document.createElement("button")
    removeBtn.addEventListener("click", (e) => removeSprite(e.target))
    removeBtn.innerText = "Set Free"
    memberSprite.src = pokeData.sprites.front_default
    memberSprite.alt = pokeData.name
    const mem1 = document.getElementById("member1")
    const mem2 = document.getElementById("member2")
    const mem3 = document.getElementById("member3")
    const mem4 = document.getElementById("member4")
    const mem5 = document.getElementById("member5")
    const mem6 = document.getElementById("member6")
    switch("") {
        case mem1.innerHTML:
            mem1.appendChild(memberSprite)
            mem1.appendChild(removeBtn)
            break
        case mem2.innerHTML:
            mem2.appendChild(memberSprite)
            mem2.appendChild(removeBtn)
            break
        case mem3.innerHTML:
            mem3.appendChild(memberSprite)
            mem3.appendChild(removeBtn)
            break
        case mem4.innerHTML:
            mem4.appendChild(memberSprite)
            mem4.appendChild(removeBtn)
            break
        case mem5.innerHTML:
            mem5.appendChild(memberSprite)
            mem5.appendChild(removeBtn)
            break
        case mem6.innerHTML:
            mem6.appendChild(memberSprite)
            mem6.appendChild(removeBtn)
            break
        default:
        showTeamError()
    }
}

function removeSprite(removeBtn){
    removeBtn.parentNode.innerHTML=""
}

function showTeamError() {
    const error = document.getElementById("modal2")
    error.hidden = false
    setTimeout(() => error.hidden = true , 3000)
}

// function getCard(name, number){
//     //"number" var is string
//     let cardMade = false
//     const dexNum = parseInt(number)
//     if(typeof dexNum === "number" && dexNum <= 898) {
//         fetch(`https://pokeapi.co/api/v2/pokemon/${dexNum}/`)
//         .then(resp => resp.json())
//         .then(json => renderCard(json))
//     } else if (dexNum > 898 || dexNum <=0) {
//         showSearchError()
//     } else if (typeof name === "string") {
//         //for(let k = 1; k<899; k++){
//             //search by name
//             fetch(`https://pokeapi.co/api/v2/pokemon/${k}/`)
//             .then(resp => resp.json())
//             .then(json=> {
//                 if(name.toLowerCase()===json.name.toLowerCase()){
//                     renderCard(json)
//                     cardMade = true
//                     //console.log("after renderCard function:", cardMade)
//                 }
//                 //console.log("ouside if inside for loop:", cardMade)
//             })
//         }
//         if(!cardMade){
//             showSearchError()
//             cardMade
//             //console.log("ouside for and if:", cardMade)
//         }
//     }
// }