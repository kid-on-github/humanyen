
// const screens = document.getElementById('screens')

const delay = 5000


let currentScreen = 0
const screens = document.querySelectorAll('.screen > span')
const screenCount = screens.length


function changeScreen(){

    screens.forEach(e=>e.style.opacity = 0)
    document.querySelector(`.screen:nth-of-type(${currentScreen+1}) > span`).style.opacity=1

    const nextScreen = currentScreen === screenCount - 1 ? 0 : currentScreen + 1
    const prevScreen = currentScreen === 0 ? screenCount - 1 : currentScreen - 1
    

    // const {width} = screens.getBoundingClientRect()
    // screens.style.right = `${(width / 3) * currentScreen}px`
    console.log(prevScreen + 1, currentScreen + 1, nextScreen + 1)
    document.querySelector(`.screen:nth-of-type(${nextScreen + 1})`).style.zIndex = 1
    document.querySelector(`.screen:nth-of-type(${currentScreen + 1})`).style.zIndex = 2
    document.querySelector(`.screen:nth-of-type(${prevScreen + 1})`).style.zIndex = 3

    document.querySelector(`.screen:nth-of-type(${nextScreen + 1})`).style.left = '100%'
    document.querySelector(`.screen:nth-of-type(${currentScreen + 1})`).style.left = '0%'
    document.querySelector(`.screen:nth-of-type(${prevScreen + 1})`).style.left = '-100%'

    document.querySelector(`#carouselDots > span:nth-of-type(${prevScreen + 1})`).className = ''
    document.querySelector(`#carouselDots > span:nth-of-type(${currentScreen + 1})`).className = 'selected'

    
    
}


function updateCurrentScreen(mod = 1){
    if (currentScreen + mod > 2){
        currentScreen = 0
    }
    else if (currentScreen + mod < 0){
        currentScreen = 2
    }
    else {
        currentScreen+= mod
    }
    changeScreen()
}


// let loop = setInterval(updateCurrentScreen, delay)

function handleClick(mod){
    updateCurrentScreen(mod)
    clearInterval(loop)
    loop = setInterval(updateCurrentScreen, delay)
}




// 3 dots
for (let i=0; i<screenCount; i++){
    const el = document.getElementById("carouselDots").appendChild( document.createElement('span') )
    if (i === currentScreen){
        el.className = 'selected'
    }
}