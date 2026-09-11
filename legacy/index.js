document.addEventListener("mousemove", e => {
    // document.getElementById("main").style.translate = `-${e.clientX/window.innerWidth*100/2}% -${e.clientY/window.innerHeight*100/2}%`
    document.getElementById("body").animate({translate: `-${e.clientX/window.innerWidth*100/50}% -${e.clientY/window.innerHeight*100/25}%`}, {duration: 100, fill: 'forwards'})
})