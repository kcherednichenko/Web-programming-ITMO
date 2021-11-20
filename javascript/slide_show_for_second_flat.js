// Slide-show for second flat
let slideIndex2 = 1;
showSlides2(slideIndex2);

// Next/previous controls
function plusSlides2(n) {
    showSlides2(slideIndex2 += n);
}

function showSlides2(n) {
    let i;
    const slides2 = document.getElementsByClassName("mySlides2");
    const dots = document.getElementsByClassName("dot2");
    if (n > slides2.length) {slideIndex2 = 1}
    if (n < 1) {slideIndex2 = slides2.length}
    for (i = 0; i < slides2.length; i++) {
        slides2[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides2[slideIndex2-1].style.display = "block";
    dots[slideIndex2-1].className += " active";
}