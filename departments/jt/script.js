document.addEventListener('DOMContentLoaded', function() {
    const cardsToAnimate = document.querySelectorAll('.member-card,.leader-card, .project-card');

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
/*主题切换功能*/
// 鸡腿图标 + 主题切换
(function(){
  const themeBtn = document.getElementById('theme-toggle');
  if(!themeBtn) return;
  let toggleCount = 0;
  let resetTimer = null;
  themeBtn.onclick = function(){
    document.body.classList.toggle('dark-mode');
    toggleCount++;
    if(resetTimer) clearTimeout(resetTimer);
    resetTimer = setTimeout(()=>{ toggleCount = 0; }, 2000); // 2秒内连续点击7次触发彩蛋
    if(toggleCount >= 7){
      alert('恭喜你发现了彩蛋!!!');
      toggleCount = 0;
    }
  };
})();
/*页面切换功能*/
const pages = document.querySelectorAll('.page');
const links = document.querySelectorAll('.nav-link');
links.forEach(link => {
    link.addEventListener('click', () => changePage(link.id))
})
function changePage(link){
    pages.forEach(page => {
        page.classList.toggle('page-active', page.id === link);
        page.classList.toggle('page-hidden', page.id !== link);
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 平滑滚动
    });
}

// 移动端菜单切换
document.addEventListener('DOMContentLoaded', function(){
  const toggleBtn = document.getElementById('jt-mobile-menu');
  const headerNav = document.querySelector('.header-nav');
  if(toggleBtn && headerNav){
    toggleBtn.addEventListener('click', function(){
      headerNav.classList.toggle('active');
    });
    headerNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => headerNav.classList.remove('active')));
  }
});
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
  });
// 成员卡片翻转功能
document.addEventListener('DOMContentLoaded', function() {
  const memberCards = document.querySelectorAll('.member-card');
  
  memberCards.forEach(card => {
    card.addEventListener('click', function() {
      this.classList.toggle('flipped');
    });
  });
});