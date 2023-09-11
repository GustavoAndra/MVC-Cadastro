var header = document.getElementById('header');
var navigationHeader = document.getElementById('navigation_header');
var content = document.getElementById('content');
var showSidebar = false;

function toggleSidebar() {
    showSidebar = !showSidebar;
    if (showSidebar) {
        navigationHeader.style.marginLeft = '-10vw';
        navigationHeader.style.animationName = 'showSidebar';
        content.style.filter = 'blur(2px)';
    } else {
        navigationHeader.style.marginLeft = '-100vw';
        navigationHeader.style.animationName = '';
        content.style.filter = '';
    }
}
function closeSidebar() {
    if (showSidebar) {
        showSidebar = true;
        toggleSidebar();
    }
}
window.addEventListener('resize', function(event) {
    if (window.innerWidth > 768 && showSidebar) {
        showSidebar = true;
        toggleSidebar();
    }
});

window.addEventListener('scroll', function() {
    var scrollToTop = document.getElementById('scrollToTop');
    if (window.scrollY > 100) {
        scrollToTop.classList.remove('hidden');
    } else {
        scrollToTop.classList.add('hidden');
    }
});

// Role suavemente para o topo quando a seta for clicada
document.getElementById('scrollToTopButton').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});