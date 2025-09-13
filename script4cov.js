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

            // --- FLIP 动画技术核心 ---

            // 1. First: 获取元素的初始状态 (位置和大小)
            const rect = clickedTile.getBoundingClientRect();

            // 2. Last: 在添加fullscreen类之前，先用内联样式将元素固定在初始位置
            //    并将其 position 切换为 fixed，脱离网格布局
            clickedTile.style.position = 'fixed';
            clickedTile.style.top = `${rect.top}px`;
            clickedTile.style.left = `${rect.left}px`;
            clickedTile.style.width = `${rect.width}px`;
            clickedTile.style.height = `${rect.height}px`;

            // 3. Invert & Play: 立即添加 fullscreen 类，触发CSS transition
            //    浏览器会自动计算初始状态和最终状态之间的差异，并播放动画
            requestAnimationFrame(() => {
                clickedTile.classList.add('fullscreen');
            });

            // 4. 监听动画结束事件
            clickedTile.addEventListener('transitionend', () => {
                // 动画播放完毕后，跳转到目标链接
                window.location.href = link;
            }, { once: true }); // { once: true } 确保事件只触发一次
        });
    });
});