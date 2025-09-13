// 确保DOM加载完毕后再执行脚本
document.addEventListener('DOMContentLoaded', () => {

    const tiles = document.querySelectorAll('.tile');

    tiles.forEach(tile => {
        tile.addEventListener('click', (event) => {
            // 阻止任何默认的点击行为
            event.preventDefault();

            const clickedTile = event.currentTarget;
            const link = clickedTile.dataset.link;

            // 如果没有链接，或者动画正在进行，则不执行任何操作
            if (!link || clickedTile.classList.contains('fullscreen')) {
                return;
            }

            // --- FLIP 动画技术核心 (保持不变) ---
            const rect = clickedTile.getBoundingClientRect();
            clickedTile.style.position = 'fixed';
            clickedTile.style.top = `${rect.top}px`;
            clickedTile.style.left = `${rect.left}px`;
            clickedTile.style.width = `${rect.width}px`;
            clickedTile.style.height = `${rect.height}px`;

            requestAnimationFrame(() => {
                clickedTile.classList.add('fullscreen');
            });


            // =========================================================
            //  【核心修复区】
            //  我们不再使用不稳定的 'transitionend' 事件监听。
            //  而是使用一个与 CSS 动画时长完全匹配的 setTimeout。
            // =========================================================
            
            setTimeout(() => {
                // 这个函数会在 600 毫秒后执行，确保动画有足够的时间播放完毕
                window.location.href = link;
            }, 1000); 
        });
    });
});