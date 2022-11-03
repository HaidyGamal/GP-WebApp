const blindButton = document.querySelector('.blind-btn');
blindButton.addEventListener('click', toggle);

function toggle(){
    blindButton.classList.toggle("blind-activated");
}
