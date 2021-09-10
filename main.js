const parallaxMultiplier = 300



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
    const {top, height} = wrapper.getBoundingClientRect()
    const windowHeight = window.innerHeight

    const a = top + height
    const b = windowHeight + height
    
    img.style.top = `${-100 - (a/b) * parallaxMultiplier}px`
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