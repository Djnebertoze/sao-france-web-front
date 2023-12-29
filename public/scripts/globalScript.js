window.onscroll = function() {
    const currentScrollPos = window.pageYOffset;
    if (200 > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-50px";
    }
}