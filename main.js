// get all parallax sections
const parallaxSections = document.querySelectorAll('.parallaxWrapper')
let parallaxElements = []

parallaxSections.forEach((wrapper)=>{
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
    
    const {top, height} = wrapper.getBoundingClientRect()
    const windowHeight = window.innerHeight

    const a = top + height
    const b = windowHeight + height


    const multiplier = 300

    img.style.top = `${-100 - (a/b) * multiplier}px`
}


const updateParallax = () => parallaxElements.map(elements => moveParallax(elements))


let lastKnownScrollPosition = 0;
let ticking = false;

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



window.onload = updateParallax()