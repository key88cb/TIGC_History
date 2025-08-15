// 这是一个.js (javascript)文件 你可以看到 这里的注释使用的是 // 同上 注释不必熟记哦！
// 使用 'DOMContentLoaded' 事件确保在整个HTML文档被完全加载和解析后才执行脚本。
// 这是一个良好的编程习惯，可以防止因DOM元素未加载而导致的错误。
document.addEventListener('DOMContentLoaded', function() {
    // document.addEventListener()：这是一个DOM（文档对象模型）方法，用于在指定事件发生时执行一个函数。
    // 'DOMContentLoaded'：这是一个事件名称。当HTML文档被完全加载和解析，且DOM树构建完成时，这个事件就会被触发。
    // function() { ... }：这是一个匿名函数，当 'DOMContentLoaded' 事件发生时，这个函数就会被执行。
    // 这样做的好处是，确保JavaScript代码在尝试操作HTML元素之前，这些元素都已经存在于页面上。

    // --- 数据定义区 ---
    // 这一部分定义了网站所需的核心数据，包括部门信息和成员信息。
    // 将数据与功能代码分开，可以提高代码的可读性和维护性。

    // 1. 部门地图 (Department Map)
    // 这是一个常量数组，存储了各个部门的详细信息。
    // 'const' 关键字表示这是一个常量，其值在定义后不能被重新赋值。
    const departments = [
        // 数组的每个元素都是一个对象，代表一个部门。
        // 对象是一种键值对（key-value pair）的集合，用于存储复杂的数据结构。
        {   // 第一个部门对象：指导老师 & 负责人
            id: 'lead', // 部门的唯一标识符（ID），用于在代码中引用。
            name: '指导老师 & 负责人', // 部门的中文名称，用于显示在页面上。
            icon: 'fas fa-star', // 与部门相关的Font Awesome图标类名，例如“星星”图标。
            description: '指导和管理中心的核心团队。', // 部门的简短描述。
            pageUrl: 'departments/example.html' // 部门详情页的URL路径。
        },
        {   // 第二个部门对象：文宣部
            id: 'wx',
            name: '文宣部',
            icon: 'fas fa-bullhorn', // “扩音器”图标，象征宣传。
            description: '负责组织的宣传、品牌建设和活动推广。',
            pageUrl: 'departments/example.html'
        },
        {   // 第三个部门对象：前研探索部
            id: 'qy',
            name: '前研探索部',
            icon: 'fas fa-flask', // “烧瓶”图标，象征科研、探索。
            description: '探索前沿技术，引领创新方向。',
            pageUrl: 'departments/example.html'
        },
        {   // 第四个部门对象：技术推广部
            id: 'jt',
            name: '技术推广部',
            icon: 'fas fa-code', // “代码”图标，象征技术。
            description: '负责技术分享、培训和项目推广。',
            pageUrl: 'departments/example.html'
        },
        {   // 第五个部门对象：创新实践部
            id: 'cj',
            name: '创新实践部',
            icon: 'fas fa-lightbulb', // “灯泡”图标，象征创新。
            description: '将创新想法付诸实践，孵化项目。',
            pageUrl: 'departments/example.html'
        }
    ];

    // 2. 成员数据
    // 这是一个常量数组，存储了各个成员的详细信息。
    // 每个成员对象都通过 'departmentId' 属性与上面的 'departments' 数组关联。
    const members = [
        {   // 第一个成员对象：CT (指导老师)
            name: 'CT', // 成员姓名。
            role: 'Leader', // 成员角色。
            bio: '待填充', // 成员简介。
            imageUrl: 'image/2_zdls.jpg', // 成员头像图片的URL路径。
            departmentId: 'lead' // 关联到的部门ID，这里是“指导老师 & 负责人”部门。
        },
        {   // 第二个成员对象：WH (科创中心负责人)
            name: 'WH',
            role: '科创中心负责人',
            bio: '待填写',
            imageUrl: 'image/2_fzr.jpg',
            departmentId: 'lead'
        },
        {   // 第三个成员对象：HQ (文宣部部长)
            name: 'HQ',
            role: '文宣部部长',
            bio: '待填写',
            imageUrl: 'image/2_wx.jpg',
            departmentId: 'wx'
        },
        {   // 第四个成员对象：HQ (前研探索部部长)
            name: 'HQ',
            role: '前研探索部部长',
            bio: '待填充',
            imageUrl: 'image/2_qy.jpg',
            departmentId: 'qy'
        },
        {   // 第五个成员对象：TK (技术推广部部长)
            name: 'TK',
            role: '技术推广部部长',
            bio: '待填充',
            imageUrl: 'image/2_jt.jpg',
            departmentId: 'jt'
        },
        {   // 第六个成员对象：HB (创新实践部部长)
            name: 'HB',
            role: '创新实践部部长',
            bio: '无桎梏自由的风，千万个无色温柔的梦', // 生物（bio）简介。
            imageUrl: 'image/2_cj.jpg',
            departmentId: 'cj'
        }
    ];


    // --- 功能函数区 ---
    // 这一部分定义了实现特定功能的可重用代码块（函数）。

    // 功能: 在主页动态创建所有成员的卡片，并让角色链接到部门页。
    // 这个函数会在主页（index.html或其他包含id为'member-list'的页面）上，
    // 遍历所有成员数据，为每个成员生成一个可视化的卡片，并确保成员的角色可以点击跳转到对应的部门详情页。
    function displayAllMembers() {
        // 获取显示成员卡片的容器元素。
        // document.getElementById('member-list')：通过ID选择器获取HTML中id为'member-list'的元素。
        const memberListContainer = document.getElementById('member-list');
        // if (!memberListContainer) return;：这是一个“卫兵语句”（Guard Clause）。
        // 如果没有找到 'member-list' 这个元素（即当前页面不包含这个容器），函数就会立即返回，
        // 防止后续代码因找不到元素而报错。这在不同页面复用脚本时非常有用。
        if (!memberListContainer) return;

        // 遍历 'members' 数组中的每一个成员对象。
        // members.forEach(member => { ... })：forEach 是数组的一个方法，它会为数组中的每个元素执行一次提供的回调函数。
        // 'member' 是每次循环时当前成员对象的引用。
        members.forEach(member => {
            // 为每个成员创建一个新的 <div> 元素，作为成员卡片的容器。
            // document.createElement('div')：创建一个新的HTML <div> 元素节点。
            const card = document.createElement('div');
            // 设置新创建的 <div> 元素的 class 属性为 'member-card'。
            // card.className = 'member-card'：为卡片应用CSS样式，使其具有预定义的外观（例如边框、阴影等）。
            card.className = 'member-card';
            
            // 核心逻辑在这里：动态生成成员卡片的内容，并处理部门链接。
            // 1. 根据当前成员的 departmentId 从部门地图中查找对应的部门信息。
            // departments.find(d => d.id === member.departmentId)：
            // find() 是数组的一个方法，用于查找数组中符合指定条件的第一个元素。
            // 这里，它会遍历 'departments' 数组，查找其 'id' 属性与当前成员的 'departmentId' 相等的部门对象。
            const departmentInfo = departments.find(d => d.id === member.departmentId);

            // 2. 如果找到了部门信息，就构建一个正确的URL，否则链接到'#'。
            // 正确的URL应该是 "department.html?dep=lead" 这样的格式。
            // 这是一个三元运算符（Ternary Operator）： condition ? valueIfTrue : valueIfFalse。
            // departmentInfo ? ... : '#'：如果 'departmentInfo' 存在（即找到了对应的部门），则执行问号后的表达式；否则，链接设置为 '#'。
            // `${departmentInfo.pageUrl}?dep=${departmentInfo.id}`：这是一个模板字符串（Template Literal），使用反引号 `` 包裹。
            // 它可以方便地嵌入表达式 `${}`，这里构建了一个带有查询参数的URL。
            // 例如，如果部门ID是 'lead'，'pageUrl' 是 'departments/example.html'，那么生成的链接就是 'departments/example.html?dep=lead'。
            const departmentLink = departmentInfo 
                ? `${departmentInfo.pageUrl}?dep=${departmentInfo.id}` 
                : '#'; // 安全备用链接，如果找不到部门信息，则链接到当前页面顶部。

            // 动态设置卡片的HTML内容。
            // card.innerHTML = `...`：innerHTML 属性用于获取或设置元素的HTML内容。
            // 这里再次使用了模板字符串，方便地将成员的图片URL、姓名、角色（作为链接）和简介插入到HTML结构中。
            // <img src="${member.imageUrl}" alt="成员 ${member.name} 的头像">：
            // 插入成员头像图片。alt 属性提供了图片的替代文本，对可访问性和SEO很重要。
            // <h3>${member.name}</h3>：插入成员姓名作为三级标题。
            // <a class="role" href="${departmentLink}">${member.role}</a>：
            // 这是关键部分，将成员的角色文字包裹在一个 <a> 标签中，使其成为一个可点击的链接。
            // class="role"：保持角色文字的样式与非链接时一致。
            // href="${departmentLink}"：将上面计算出的正确部门链接赋值给 href 属性。
            // <p class="bio">${member.bio}</p>：插入成员简介作为段落。
            card.innerHTML = `
                <img src="${member.imageUrl}" alt="成员 ${member.name} 的头像">
                <h3>${member.name}</h3>
                <a class="role" href="${departmentLink}">${member.role}</a>
                <p class="bio">${member.bio}</p>
            `;
            
            // 将创建好的成员卡片添加到容器中。
            // memberListContainer.appendChild(card)：appendChild() 方法将一个节点添加到指定父节点的子节点列表的末尾。
            memberListContainer.appendChild(card);
        });
    }
    
    // 保留功能: 在部门页动态显示该部门的成员
    // 这个函数专门用于部门详情页面 (department.html)。
    // 它会从URL中读取部门ID，然后筛选出对应部门的成员，并显示他们的卡片和部门介绍。
    function displayMembersByDepartment() {
        // 获取显示部门详情的容器元素。
        const container = document.getElementById('department-detail-container');
        // 如果当前页面没有 'department-detail-container' 元素，则直接返回。
        if (!container) return; 

        // 从当前页面的URL中获取查询参数。
        // new URLSearchParams(window.location.search)：创建一个 URLSearchParams 对象，
        // 它能方便地解析URL中问号 '?' 后面的查询字符串（例如 '?dep=lead'）。
        // window.location.search：获取当前URL的查询部分。
        const urlParams = new URLSearchParams(window.location.search);
        // urlParams.get('dep')：从查询参数中获取名为 'dep' 的值（即部门ID）。
        const departmentId = urlParams.get('dep');
        // 根据获取到的部门ID，从 'departments' 数组中查找对应的部门信息。
        const departmentInfo = departments.find(d => d.id === departmentId);

        // 如果找到了部门信息。
        if (departmentInfo) {
            // 更新页面的标题，使其包含部门名称。
            document.title = `${departmentInfo.name} - 科创中心`;
            // 更新HTML中id为'department-name'的元素的文本内容。
            document.getElementById('department-name').textContent = `${departmentInfo.name}成员`;
            // 更新HTML中id为'department-intro'的元素的文本内容。
            document.getElementById('department-intro').textContent = departmentInfo.description;

            // 筛选出属于当前部门的所有成员。
            // members.filter(m => m.departmentId === departmentId)：
            // filter() 是数组的一个方法，它会创建一个新数组，其中包含所有通过指定条件测试的元素。
            // 这里筛选出 'departmentId' 与当前部门ID匹配的成员。
            const departmentMembers = members.filter(m => m.departmentId === departmentId);
            // 获取显示成员列表的容器。
            const memberList = document.getElementById('member-list');
            
            // 如果成员列表容器存在。
            if (memberList) {
                // 如果当前部门有成员。
                if(departmentMembers.length > 0) {
                    // 遍历这些成员，为每个成员创建并添加卡片。
                    departmentMembers.forEach(member => {
                        const memberCard = document.createElement('div');
                        memberCard.className = 'member-card';
                        // 设置成员卡片的HTML内容，这里角色是一个普通段落，因为已经是部门详情页。
                        memberCard.innerHTML = `
                            <img src="${member.imageUrl}" alt="${member.name}的头像">
                            <h3>${member.name}</h3>
                            <p class="role">${member.role}</p>
                            <p class="bio">${member.bio}</p>
                        `;
                        memberList.appendChild(memberCard);
                    });
                } else {
                    // 如果当前部门没有成员，则显示“暂无成员信息”的提示。
                    memberList.innerHTML = '<p>暂无成员信息。</p>';
                }
            }
        } else {
            // 如果URL中的部门ID无效，即没有找到对应的部门信息，则显示错误信息。
            container.innerHTML = '<h2>未找到该部门</h2><p>请检查链接是否正确。</p>';
        }
    }

    // --- 通用功能区 (如菜单、滚动效果) ---
    // 这个函数包含了网站所有页面都可能需要的通用交互功能。
    function setupCommonFeatures() {
        // 获取移动端菜单按钮和导航菜单元素。
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const navMenu = document.querySelector('.nav-menu'); // querySelector() 方法返回文档中与指定选择器或选择器组匹配的第一个元素。

        // 如果按钮和菜单都存在，则添加点击事件监听器。
        if (mobileMenuButton && navMenu) {
            // mobileMenuButton.addEventListener('click', () => { ... })：
            // 为按钮添加一个“点击”事件监听器。当按钮被点击时，括号里的匿名函数会被执行。
            mobileMenuButton.addEventListener('click', () => {
                // navMenu.classList.toggle('active')：
                // classList 属性返回元素的类名列表（DOMTokenList）。
                // toggle() 方法用于在元素的类列表中切换（添加或移除）指定的类名。
                // 如果 'active' 类存在，则移除；如果不存在，则添加。这通常用于控制移动菜单的显示/隐藏（通过CSS样式）。
                navMenu.classList.toggle('active');
            });
        }

        // 获取页眉元素。
        const header = document.getElementById('main-header');
        // 如果页眉元素存在。
        if (header) {
            // window.addEventListener('scroll', () => { ... })：
            // 为整个窗口（window）添加一个“滚动”事件监听器。当用户滚动页面时，此函数会被执行。
            window.addEventListener('scroll', () => {
                // header.classList.toggle('scrolled', window.scrollY > 50)：
                // 根据页面滚动的位置（window.scrollY）动态添加或移除 'scrolled' 类。
                // window.scrollY：返回文档垂直滚动的像素数。
                // 如果滚动距离大于50像素，就添加 'scrolled' 类（通常用于改变页眉的背景色、高度或阴影，使其在滚动时更突出或缩小）。
                header.classList.toggle('scrolled', window.scrollY > 50);
            });
        }
    }


    // --- 主执行逻辑 (页面路由) ---
    // 这是脚本的入口点，它会在页面加载完成后，根据当前页面的结构（是否有特定ID的元素）
    // 来判断用户位于哪个页面，并调用相应的初始化函数。

    setupCommonFeatures(); // 首先调用通用功能设置函数，确保所有页面共享的交互功能（如导航菜单和页眉滚动效果）被初始化。

    // 条件判断：
    // document.getElementById('member-list')：检查当前页面是否存在ID为 'member-list' 的元素。
    // !document.getElementById('department-detail-container')：检查当前页面是否不存在ID为 'department-detail-container' 的元素。
    // 逻辑：如果页面有成员列表容器但没有部门详情容器，那么我们判断当前是主页。
    if (document.getElementById('member-list') && !document.getElementById('department-detail-container')) {
        // 如果是主页，则调用 'displayAllMembers' 函数来显示所有成员的卡片。
        displayAllMembers();
    } else if (document.getElementById('department-detail-container')) {
        // 逻辑：如果页面存在ID为 'department-detail-container' 的元素，那么我们判断当前是部门详情页。
        // 如果是部门详情页，则调用 'displayMembersByDepartment' 函数来显示该部门的详细信息和成员。
        displayMembersByDepartment();
    }

});
