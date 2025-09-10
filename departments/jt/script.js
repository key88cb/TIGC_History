document.addEventListener('DOMContentLoaded', function() {
    const cardsToAnimate = document.querySelectorAll('.member-card, .leader-card, .project-card');

    cardsToAnimate.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const rotateX = -y / 25; // 旋转强度
            const rotateY = x / 25;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
            card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });

        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.boxShadow = 'var(--shadow)';
        });
    });
});
/*深色浅色模式切换*/
document.getElementById('theme-toggle').onclick = function() {
    document.body.classList.toggle('dark-mode');
};
/*页面切换*/
const pages = document.querySelectorAll('.page');
const links = document.querySelectorAll('.nav-link');
links.forEach(link => {
    link.addEventListener('click', () => changePage(link.id))
})
function changePage(link){
    pages.forEach(page => {
        page.classList.toggle('page-active', page.id === link);
        page.classList.toggle('page-hidden', page.id !== link);
    })
}
