// When the user scrolls down 20px from the top of the document, slide down the navbar
// When the user scrolls down 20px from the top of the document, slide down the navbar
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    document.getElementById("Navbar").style.top = "-20px";
  } else {
    document.getElementById("Navbar").style.top = "-100px";
  }
}

