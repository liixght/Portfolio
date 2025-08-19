document.addEventListener("mousemove", e => {
    // document.getElementById("main").style.translate = `-${e.clientX/window.innerWidth*100/2}% -${e.clientY/window.innerHeight*100/2}%`
    document.getElementById("html").animate({translate: `-${e.clientX/window.innerWidth*100/2}% -${e.clientY/window.innerHeight*100/2}%`}, {duration: 200, fill: 'forwards'})
})