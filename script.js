// 使用 'DOMContentLoaded' 事件确保在整个HTML文档被完全加载和解析后才执行脚本
// 这是一个良好的编程习惯，可以防止因DOM元素未加载而导致的错误。
document.addEventListener('DOMContentLoaded', function() {

    // --- 数据定义区 ---

    // 1. **部门地图 (Department Map)**
    // 我们依然保留这个映射，因为它对于部门详情页是必需的。
    const departments = [
        { id: 'lead', name: '指导老师 & 负责人', icon: 'fas fa-star', description: '指导和管理中心的核心团队。', pageUrl: 'departments/example.html' },
        { id: 'wx', name: '文宣部', icon: 'fas fa-bullhorn', description: '负责组织的宣传、品牌建设和活动推广。', pageUrl: 'departments/example.html' },
        { id: 'qy', name: '前研探索部', icon: 'fas fa-flask', description: '探索前沿技术，引领创新方向。', pageUrl: 'departments/example.html' },
        { id: 'jt', name: '技术推广部', icon: 'fas fa-code', description: '负责技术分享、培训和项目推广。', pageUrl: 'departments/example.html' },
        { id: 'cj', name: '创新实践部', icon: 'fas fa-lightbulb', description: '将创新想法付诸实践，孵化项目。', pageUrl: 'departments/example.html' }
    ];

    // 2. **成员数据**
    // 成员数据保持不变，通过 'departmentId' 关联到部门。
    const members = [
        { name: 'CT', role: 'Leader', bio: '待填充', imageUrl: 'image/2_zdls.jpg', departmentId: 'lead' },
        { name: 'WH', role: '科创中心负责人', bio: '待填写', imageUrl: 'image/2_fzr.jpg', departmentId: 'lead' },
        { name: 'HQ', role: '文宣部部长', bio: '待填写', imageUrl: 'image/2_wx.jpg', departmentId: 'wx' },
        { name: 'HQ', role: '前研探索部部长', bio: '待填充', imageUrl: 'image/2_qy.jpg', departmentId: 'qy' },
        { name: 'TK', role: '技术推广部部长', bio: '待填充', imageUrl: 'image/2_jt.jpg', departmentId: 'jt' },
        { name: 'HB', role: '创新实践部部长', bio: '无桎梏自由的风，千万个无色温柔的梦', imageUrl: 'image/2_cj.jpg', departmentId: 'cj' }
    ];


    // --- 功能函数区 ---

    // **新增功能: 在主页动态创建所有成员的卡片**
// **功能: 在主页动态创建所有成员的卡片，并让角色链接到部门页**
    function displayAllMembers() {
        const memberListContainer = document.getElementById('member-list');
        if (!memberListContainer) return;

        members.forEach(member => {
            const card = document.createElement('div');
            card.className = 'member-card';
            
            // **核心逻辑在这里**
            // 1. 根据当前成员的 departmentId 从部门地图中查找对应的部门信息
            const departmentInfo = departments.find(d => d.id === member.departmentId);

            // 2. 如果找到了部门信息，就构建一个正确的URL，否则链接到'#'
            //    正确的URL应该是 "department.html?dep=lead" 这样的格式
            const departmentLink = departmentInfo 
                ? `${departmentInfo.pageUrl}?dep=${departmentInfo.id}` 
                : '#'; // 安全备用链接

            //    - 使用 <a> 标签来创建链接。
            //    - 将 class="role" 应用于 <a> 标签，这样它看起来就像之前的文本。
            //    - 使用 ${departmentLink} 将我们上面计算出的正确URL放入 href 属性中。
            card.innerHTML = `
                <img src="${member.imageUrl}" alt="成员 ${member.name} 的头像">
                <h3>${member.name}</h3>
                <a class="role" href="${departmentLink}">${member.role}</a>
                <p class="bio">${member.bio}</p>
            `;
            
            memberListContainer.appendChild(card);
        });
    }
    
    // **保留功能: 在部门页动态显示该部门的成员**
    // 这个函数在您创建 department.html 页面时会用到。
    function displayMembersByDepartment() {
        const container = document.getElementById('department-detail-container');
        if (!container) return; 

        const urlParams = new URLSearchParams(window.location.search);
        const departmentId = urlParams.get('dep');
        const departmentInfo = departments.find(d => d.id === departmentId);

        if (departmentInfo) {
            document.title = `${departmentInfo.name} - 科创中心`;
            document.getElementById('department-name').textContent = `${departmentInfo.name}成员`;
            document.getElementById('department-intro').textContent = departmentInfo.description;

            const departmentMembers = members.filter(m => m.departmentId === departmentId);
            const memberList = document.getElementById('member-list');
            
            if (memberList) {
                if(departmentMembers.length > 0) {
                    departmentMembers.forEach(member => {
                        const memberCard = document.createElement('div');
                        memberCard.className = 'member-card';
                        memberCard.innerHTML = `
                            <img src="${member.imageUrl}" alt="${member.name}的头像">
                            <h3>${member.name}</h3>
                            <p class="role">${member.role}</p>
                            <p class="bio">${member.bio}</p>
                        `;
                        memberList.appendChild(memberCard);
                    });
                } else {
                    memberList.innerHTML = '<p>该部门暂无成员信息。</p>';
                }
            }
        } else {
            container.innerHTML = '<h2>未找到该部门</h2><p>请检查链接是否正确。</p>';
        }
    }

    // --- 通用功能区 (如菜单、滚动效果) ---
    function setupCommonFeatures() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const navMenu = document.querySelector('.nav-menu');
        if (mobileMenuButton && navMenu) {
            mobileMenuButton.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        const header = document.getElementById('main-header');
        if (header) {
            window.addEventListener('scroll', () => {
                header.classList.toggle('scrolled', window.scrollY > 50);
            });
        }
    }


    // --- **主执行逻辑 (页面路由)** ---
    // 这是脚本的入口，它会判断当前在哪个页面，然后调用对应的功能函数。
    setupCommonFeatures(); // 先加载所有页面都需要的通用功能
    
    // **核心改动**: 调整路由逻辑
    if (document.getElementById('member-list') && !document.getElementById('department-detail-container')) {
        // 如果页面上有 'member-list'，但没有 'department-detail-container'，说明是主页
        displayAllMembers();
    } else if (document.getElementById('department-detail-container')) {
        // 如果页面上有 'department-detail-container'，说明是部门详情页
        displayMembersByDepartment();
    }

});
