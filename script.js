// 使用 'DOMContentLoaded' 事件确保在整个HTML文档被完全加载和解析后才执行脚本
// 这是一个良好的编程习惯，可以防止因DOM元素未加载而导致的错误。
document.addEventListener('DOMContentLoaded', function() {

    // --- 数据定义 ---
    // 在真实项目中，这些数据通常会通过API从服务器获取。
    // 这里我们用一个常量数组来模拟。
    const members = [
        {
            name: 'LCT',
            role: 'Leader',
            bio: '待填充',
            imageUrl: '2_zdls.jpg'
        },
        {
            name: 'WH',
            role: '科创中心负责人',
            bio: '待填写',
            imageUrl: '2_fzr.jpg'
        },
        {
            name: 'HQ',
            role: '文宣部部长',
            bio: '待填写',
            imageUrl: '2_wx.jpg'
        },
        {
            name: 'HQ',
            role: '前研探索部部长',
            bio: '待填充',
            imageUrl: '2_qy.jpg'
        },
        {
            name: 'TK',
            role: '技术推广部部长',
            bio: '待填充',
            imageUrl: '2_jt.jpg'
        },
        {
            name: 'HB',
            role: '创新实践部部长',
            bio: 'TGW~~****',
            imageUrl: '2_cj.jpg'
        }
    ];

    // --- 功能一：动态生成成员列表 ---
    // 这是JavaScript操作DOM的核心实践，非常适合初学者。

    // 1. 获取将要填充内容的父容器元素
    const memberListContainer = document.getElementById('member-list');

    // 2. 检查容器是否存在，以避免潜在错误
    if (memberListContainer) {
        // 3. 遍历members数组中的每一个成员对象
        members.forEach(member => {
            // 4. 为每个成员创建一个新的div元素，这将是我们的“卡片”
            const card = document.createElement('div');
            
            // 5. 给这个卡片添加CSS类名，使其应用我们在style.css中定义的样式
            card.className = 'member-card';
            
            // 6. 使用模板字符串设置卡片的内部HTML结构，并填入成员数据
            card.innerHTML = `
                <img src="${member.imageUrl}" alt="成员 ${member.name} 的头像">
                <h3>${member.name}</h3>
                <p class="role">${member.role}</p>
                <p class="bio">${member.bio}</p>
            `;
            
            // 7. 将创建好的卡片元素追加到父容器中
            memberListContainer.appendChild(card);
        });
    }

    // --- 功能二：移动端菜单（汉堡菜单）的显示/隐藏 ---
    
    // 1. 获取菜单按钮和导航菜单元素
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const navMenu = document.querySelector('.nav-menu');

    // 2. 检查元素是否存在
    if (mobileMenuButton && navMenu) {
        // 3. 为按钮添加点击事件监听器
        mobileMenuButton.addEventListener('click', () => {
            // 4. 每次点击时，切换菜单的 'active' 类
            // CSS中定义了 .nav-menu.active { display: flex; }
            navMenu.classList.toggle('active');
        });
    }

    // --- 功能三：页面滚动时，导航栏样式和链接高亮 ---
    
    // 1. 获取所有需要高亮的导航链接和页面上的章节
    const header = document.getElementById('main-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // 2. 创建一个函数来处理滚动事件的逻辑
    const handleScroll = () => {
        // 导航栏吸顶阴影效果
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // 导航链接高亮逻辑
        let currentSectionId = '';
        // 遍历所有章节，判断哪个章节在视口中
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 80) { // 80是偏移量，提前高亮
                currentSectionId = section.getAttribute('id');
            }
        });

        // 根据当前章节ID，更新导航链接的 'active' 类
        navLinks.forEach(link => {
            link.classList.remove('active');
            // link.getAttribute('href') 的值是 '#about' 等
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    // 3. 为整个窗口添加滚动事件监听器
    window.addEventListener('scroll', handleScroll);

});
