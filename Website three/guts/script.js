const labels = document.querySelectorAll('.form-control label')
const email = "potato"
const password = "no"


labels.forEach(label => {
    label.innerHTML = label.innerText
        .split('')
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
        .join('')
})

document.getElementById("login").addEventListener('click', () => {
    if (document.getElementById("input1").value == email && document.getElementById("input2").value == password) {
        console.log("got to this step")
        window.open("SOUND_BOARD/index.html")
        // location.href = "SOUND_BOARD/index.html" 
    }
})