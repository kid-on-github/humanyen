
const screens = document.getElementById('screens')

let currentScreen = 2

function changeScreen(){
    document.querySelectorAll('.screen > span').forEach(e=>e.style.opacity = 0)
    document.querySelector(`.screen:nth-of-type(${currentScreen+1}) > span`).style.opacity=1
    const {width} = screens.getBoundingClientRect()
    screens.style.right = `${(width / 3) * currentScreen}px`
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


let loop
function handleClick(mod){
    updateCurrentScreen(mod)
    clearInterval(loop)
    loop = setInterval(updateCurrentScreen, 5000)
}

handleClick(1)

document.getElementById('next').onclick = () => handleClick(1)
document.getElementById('back').onclick = () => handleClick(-1)