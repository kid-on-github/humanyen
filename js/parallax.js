
// get all parallax sections
let parallaxElements = []

document.querySelectorAll('.parallaxWrapper')
    .forEach((wrapper)=>{
        let img

        for (let i of wrapper.childNodes){
            if (i.nodeName == 'IMG'){
                img = i
                break
            }
        }

        img && parallaxElements.push([wrapper, img])
    })


// reposition the image to achieve a parallax effect
function moveParallax(elements){
    const [wrapper, img] = elements


    const {height, bottom} = wrapper.getBoundingClientRect()
    const imgHeight = img.getBoundingClientRect().height
    const vh = window.innerHeight

    const totalDist = vh + height
    const remainingDist = totalDist - bottom
    const percentDist = remainingDist/totalDist
    const sizeDiff = imgHeight - height

    const topOffset =  - percentDist *  sizeDiff
    
    let slowDownModifier = (sizeDiff / 100) - 1 > 1 ? (sizeDiff / 100) - 1 : 2x
    
    img.style.top = `${topOffset / slowDownModifier}px`
}


const updateParallax = () => parallaxElements.map(
    elements => moveParallax(elements)
)


let lastKnownScrollPosition = 0
let ticking = false

document.addEventListener('scroll', () => {
    lastKnownScrollPosition = window.scrollY
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateParallax()
            ticking = false
        })

        ticking = true
    }
});


// set initial image positions (parallax)
window.onload = updateParallax()