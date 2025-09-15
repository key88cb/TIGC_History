(function(){
  const carousel = document.getElementById('carousel');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  // 卡牌数据：每项至少需要 { title, color }
  const cardsData2023 = [
    { title: "LZ", color: "#000060" },
    { title: "lcjj", color: '#00cccc' },
    { title: "Django", color: '#c0c0c0' },
    { title: "ZHY", color: '#ff00ff' },
    { title: "HY", color: '#7a7a00' },
    { title: "YYH", color: '#00ffff' },
    { title: "BENER", color: '#00e5e5' },
    { title: "马飞飞", color: '#000080' },
    { title: "WSQ", color: '#008080' },
    { title: "FCY", color: '#808080' },
    { title: "Lemonoscar", color: '#006666' },
  ];

  const cardsData2024 = [
    { title: "Lemonoscar", color: '#006666' },
    { title: "FCY", color: '#808080' },
    { title: "星星", color: '#800000' },
    { title: "邪恶涵宝猎手", color: '#800080' },
    { title: "YXY", color: '#660000' },
    { title: "LEM", color: '#990099' },
    { title: "小土豆", color: '#c0c0c0' },
    { title: "QRK", color: '#808080' },
    { title: "羅", color: '#a8a8a8' },
    { title: "Mutsumii", color: '#c0c0c0' },
    { title: "kl", color: '#009999' },
    { title: "叶子", color: '#008000' },
    { title: "多多", color: '#924900' },
  ];

  const cardsData2025 = [
    { title: "邪恶涵宝猎手", color: '#800080' },
    { title: "kl", color: '#009999' },
    { title: "叶子", color: '#008000' },
    { title: "多多", color: '#924900' },
  ];

    const cardsDataDefault = [
    { title: "Universe", color: "#7986cb" },
    { title: "Campbell's Soup 3D", color: 2 },
    { title: "Bokeh", color: 3 },
    { title: "Sheep", color: 4 },
    { title: "The Scream", color: 5 },
    { title: "Viper Typography", color: 6 },
    { title: "Plant Trees", color: 7 },
    { title: "Surface Waves", color: 8 },
  ];

    function pickDataFromURL() {
      const params = new URLSearchParams(location.search);
      const key = (params.get('set') || params.get('year') || location.hash.replace('#', '') || 'default').toString();
      const cardsMap = {
        '2023': cardsData2023,
        '2024': cardsData2024,
        '2025': cardsData2025,
        'default': cardsDataDefault
      };
      const detailsMap = {
        '2023': detailsData2023,
        '2024': detailsData2024,
        '2025': detailsData2025,
        'default': detailsDataDefault
      };
      const cards = (window.__CARDS_OVERRIDE && Array.isArray(window.__CARDS_OVERRIDE)) ? window.__CARDS_OVERRIDE : (cardsMap[key] || cardsDataDefault);
      const details = (window.__DETAILS_OVERRIDE && Array.isArray(window.__DETAILS_OVERRIDE)) ? window.__DETAILS_OVERRIDE : (detailsMap[key] || detailsDataDefault);
      return { key, cards, details };
    }

    // picked assignment will be moved below after detailsDataDefault is declared
  const detailsData2023 = [
    {
      title: "LZ",
      position: "部长",
      tenure: "2023-2024",
      avatar: "./pic/lz.jpg",
      connect: "realleechung@foxmail.com",
      message:
        "仰望前空，追研星辰；心怀热爱，启智求真。\n作为第一任前研探索部部长，我见证了无数想法在这里萌芽、生长，最终化为实践。那份从零到一的激情与坚持，是云峰科创精神最真实的注脚。愿未来的科创人始终保持热爱与好奇，在青春的年华里敢想敢做，把探索的脚步延伸到更远的地方。",
    },
    {
      title: "lcjj",
      position: "副部长",
      tenure: "2023-2024",
      avatar: "./pic/lc.jpg",
      connect: "598958302@qq.com",
      message: "多学习多思考 多交友多吃好 开开心心度过你的大学生活！",
    },
    {
      title: "Django",
      position: "副部长",
      tenure: "2023-2024",
      avatar: "./pic/jgy.jpg",
      connect: "从人工走向智能！从前研走向探索！从云峰科创走向未来！🫡",
      message: "guanyujiang103@gmail.com",
    },
    {
      title: "ZHY",
      position: "副部长",
      tenure: "2023-2024",
      avatar: "./pic/zhy.jpg",
      connect: "1161332337@qq.com",
      message: "这个人懒得想（bushi）\n祝科创中心越来越好！",
    },
    {
      title: "HY",
      position: "干事",
      tenure: "2023-2024",
      avatar: "./pic/hy.jpg",
      connect: "2697163855@qq.com",
      message: "未来可期~",
    },
    {
      title: "YYH",
      position: "干事",
      tenure: "2023-2024",
      avatar: "",
      connect: "",
      message: "祝大家天天开心~",
    },
    {
      title: "BENER",
      position: "干事",
      tenure: "2023-2024",
      avatar: "",
      connect: "",
      message: "希望大家健康快乐，永远不似！",
    },
    {
      title: "马飞飞",
      position: "干事",
      tenure: "2023-2024",
      avatar: "",
      connect: "",
      message: "科创的每个人都身怀绝技，有他们的激励可以学到很多",
    },
    {
      title: "WSQ",
      position: "干事",
      tenure: "2023-2024",
      avatar: "",
      connect: "18314896118",
      message: "运气也是实力的一部分。",
    },
    {
      title: "FCY",
      position: "干事",
      tenure: "2023-2025",
      avatar: "./pic/fcy.jpg",
      connect: "2726310959@qq.com",
      message: "科创，亦家亦使命。",
    },
    {
      title: "Lemonoscar",
      position: "干事",
      tenure: "2023-2025",
      avatar: "./pic/xhq.jpg",
      connect: "3467057703@qq.com",
      message:
        "玲珑骰子安红豆，入骨相思知不知。爱来自前研！衷心祝愿科创的未来一帆风顺，继往开来！！！",
    },
  ];

  const detailsData2024 = [
    {
      title: "Lemonoscar",
      position: "部长",
      tenure: "2024-2025",
      avatar: "./pic/xhq.jpg",
      connect: "3467057703@qq.com",
      message:
        "玲珑骰子安红豆，入骨相思知不知。爱来自前研！衷心祝愿科创的未来一帆风顺，继往开来！！！",
    },
    {
      title: "FCY",
      position: "副部长",
      tenure: "2024-2025",
      avatar: "./pic/fcy.jpg",
      connect: "2726310959@qq.com",
      message: "科创，亦家亦使命。",
    },
    {
      title: "星星",
      position: "干事",
      tenure: "2024-2025",
      avatar: "./pic/wxx.jpg",
      connect: "",
      message: "科创越来越好！",
    },
    {
      title: "邪恶涵宝猎手",
      position: "干事",
      tenure: "2024-2025",
      avatar: "./pic/wzh.jpg",
      connect: "",
      message: "科创的故事，永远有下一章 —— 而我们，都是执笔人",
    },
    {
      title: "YXY",
      position: "干事",
      tenure: "2024-2025",
      avatar: "./pic/yxy.jpg",
      connect: "xinyiyang171@gmail.com",
      message: "我在山河间找路。",
    },
    {
      title: "LEM",
      position: "干事",
      tenure: "2024-2025",
      avatar: "./pic/lem.jpg",
      connect: "",
      message: "起风了，让我们迎风而生！",
    },
    {
      title: "小土豆",
      position: "干事",
      tenure: "2024-2025",
      avatar: "./pic/lxy.jpg",
      connect: "",
      message: "读万卷书，行万里路，见万种花开",
    },
    {
      title: "QRK",
      position: "干事",
      tenure: "2024-2025",
      avatar: "./pic/qrk.jpg",
      connect: "",
      message: "来，来的就是科创！",
    },
    {
      title: "羅",
      position: "干事",
      tenure: "2024-2025",
      avatar: "",
      connect: "",
      message: "当你为错过太阳而哭泣的时候,你也要再错过群星了",
    },
    {
      title: "Mutsumii",
      position: "干事",
      tenure: "2024-2025",
      avatar: "",
      connect: "",
      message: "很有意思的大家庭，希望大家都好",
    },
    {
      title: "kl",
      position: "干事",
      tenure: "2024-2026",
      avatar: "./pic/wkl.jpg",
      connect: "2489175136@qq.com",
      message: "我是入机，大家抱着美好理想而来，为科创中心作出了巨大的贡献，无敌了",
    },
    {
      title: "叶子",
      position: "干事",
      tenure: "2024-2026",
      avatar: "./pic/jhq.jpg",
      connect: "",
      message: "非常好科创非常好的大家🥹\n遇到困难时总有靠谱的学长学姐们帮忙答疑解惑，工作时身边有共度困难的同学朋友们，在未来还有可可爱爱的学弟学妹们加入科创一起进步。爱来自前研🥰",
    },
    {
      title: "多多",
      position: "干事",
      tenure: "2024-2026",
      avatar: "./pic/lrd.jpg",
      connect: "runduo.lin@qq.com",
      message: "祝你狠扎进山河，做时间的骨钉。"
    },
  ];

  const detailsData2025 = [
    {
      title: "邪恶涵宝猎手",
      position: "部长",
      tenure: "2025-2026",
      avatar: "./pic/wzh.jpg",
      connect: "",
      message: "科创的故事，永远有下一章 —— 而我们，都是执笔人"
    },
    {
      title: "kl",
      position: "副部长",
      tenure: "2024-2026",
      avatar: "./pic/wkl.jpg",
      connect: "2489175136@qq.com",
      message: "我是入机，大家抱着美好理想而来，为科创中心作出了巨大的贡献，无敌了"
    },
    {
      title: "叶子",
      position: "副部长",
      tenure: "2024-2026",
      avatar: "./pic/jhq.jpg",
      connect: "",
      message: "非常好科创非常好的大家🥹\n遇到困难时总有靠谱的学长学姐们帮忙答疑解惑，工作时身边有共度困难的同学朋友们，在未来还有可可爱爱的学弟学妹们加入科创一起进步。爱来自前研🥰"
    },
    {
      title: "多多",
      position: "干事",
      tenure: "2024-2026",
      avatar: "./pic/lrd.jpg",
      connect: "runduo.lin@qq.com",
      message: "祝你狠扎进山河，做时间的骨钉。"
    }
  ];

  // 详情数据数组 - 你可以在这里添加每个卡牌对应的详细信息（默认集）
  const detailsDataDefault = [
    {
      name: '宇宙探索者',
      position: '天体物理学家',
      tenure: '2020年至今',
      avatar: '../card/1.png', // 头像图片路径，留空则显示默认
      connect: 'universe@example.com',
      message: '探索未知宇宙，发现星辰奥秘。致力于天体物理学研究，揭示宇宙运行规律。'
    },
    {
      name: '视觉艺术家',
      position: '3D设计师',
      tenure: '2019年至今',
      avatar: '',
      connect: 'artist@example.com',
      message: '通过3D艺术表达创意想法，将想象力转化为视觉作品。'
    },
    {
      name: '光影大师',
      position: '摄影师',
      tenure: '2018年至今',
      avatar: '',
      connect: 'photographer@example.com',
      message: '捕捉光影瞬间，用镜头记录世界的美好。专注于虚化效果和光线运用。'
    },
    {
      name: '牧羊诗人',
      position: '文学创作者',
      tenure: '2021年至今',
      avatar: '',
      connect: 'poet@example.com',
      message: '以文字描绘田园生活，用诗歌表达内心情感。寻找生活中的诗意瞬间。'
    },
    {
      name: '呐喊者',
      position: '表现主义艺术家',
      tenure: '2017年至今',
      avatar: '',
      connect: 'scream@example.com',
      message: '通过强烈的视觉表现力传达内心的呐喊，用艺术表达人类情感的复杂性。'
    },
    {
      name: '字体设计师',
      position: '视觉传达设计师',
      tenure: '2022年至今',
      avatar: '',
      connect: 'typography@example.com',
      message: '专注于字体设计和版式编排，让文字拥有生命力和表现力。'
    },
    {
      name: '生态守护者',
      position: '环保主义者',
      tenure: '2016年至今',
      avatar: '',
      connect: 'trees@example.com',
      message: '致力于植树造林和生态保护，为地球的绿色未来而努力。'
    },
    {
      name: '波浪研究员',
      position: '海洋学家',
      tenure: '2019年至今',
      avatar: '',
      connect: 'waves@example.com',
      message: '研究海洋波浪运动规律，探索海洋的神秘力量和自然美学。'
    }
  ];

  // picked assignment: 在 detailsDataDefault 已定义后再执行
  const picked = pickDataFromURL();
  let cardsData = picked.cards;
  let detailsData = picked.details;

  // 在页面顶部显示当前集（如果有 .title 元素）
  (function showDatasetTitle(){
    const titleEl = document.querySelector('.title') || (function(){ const t = document.createElement('div'); t.className='title'; document.body.appendChild(t); return t; })();
    const name = picked.key === 'default' ? '成员' : ('前研 ' + picked.key + ' 成员集');
    titleEl.textContent = name;
  })();

  // centerIndex will be computed after we build the display list (with placeholders)
  let centerIndex = 0;

  // gap deg (must match CSS --gap-deg number)
  const GAP_DEG = 10; // degrees per slot —如果你更改 CSS 的 --gap-deg 请在此同步

  // 颜色处理工具：支持 #hex 自动生成渐变色
  function isHexColor(s) {
    return typeof s === 'string' && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(s.trim());
  }
  function expandHex(h) {
    h = h.trim();
    if (h.length === 4) {
      return '#' + h[1] + h[1] + h[2] + h[2] + h[3] + h[3];
    }
    return h;
  }
  function hexToRgb(hex) {
    hex = expandHex(hex).slice(1);
    const num = parseInt(hex, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  }
  function rgbToHex(rgb) {
    const toHex = (v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
    return '#' + toHex(rgb.r) + toHex(rgb.g) + toHex(rgb.b);
  }
  function lightenRgb(rgb, amount) {
    // amount: 0..1
    return {
      r: Math.round(rgb.r + (255 - rgb.r) * amount),
      g: Math.round(rgb.g + (255 - rgb.g) * amount),
      b: Math.round(rgb.b + (255 - rgb.b) * amount)
    };
  }
  function darkenRgb(rgb, amount) {
    return {
      r: Math.round(rgb.r * (1 - amount)),
      g: Math.round(rgb.g * (1 - amount)),
      b: Math.round(rgb.b * (1 - amount))
    };
  }

  function render(){
    // build display list: original cardsData plus placeholder black cards if needed
    const minSlots = Math.max(cardsData.length, Math.ceil(360 / GAP_DEG));
    const displayData = cardsData.slice();
    while(displayData.length < minSlots){
      displayData.push({title:'…', color:0, isPlaceholder:true});
    }

    const n = displayData.length;

    // ensure centerIndex stays in range
    centerIndex = ((centerIndex % n) + n) % n;

    carousel.innerHTML = '';
    displayData.forEach((d,i)=>{
      const el = document.createElement('div');
      el.className = 'card';
      el.dataset.index = i;
      // 支持 color 为数字或字符串。
      // 数字（或数字字符串）会映射为 data-color/class color-N（兼容旧样式）。
      // 若值为 hex 颜色 (#fff 或 #ffffff)，自动生成渐变并直接写入 el.style.background。
      const colorVal = (d && d.color) !== undefined ? d.color : (i % 8 + 1);
      // 清理之前的 color 类
      el.classList.remove(...Array.from(el.classList).filter(c => c.startsWith('color-') || c === 'color-custom'));
      if (isHexColor(String(colorVal))) {
        // 生成渐变：由稍亮色到稍暗色
        const rgb = hexToRgb(String(colorVal));
        const light = rgbToHex(lightenRgb(rgb, 0.18));
        const dark = rgbToHex(darkenRgb(rgb, 0.12));
        el.style.background = `linear-gradient(180deg, ${light} 0%, ${dark} 100%)`;
        el.dataset.color = String(colorVal);
      } else if (/^\d+$/.test(String(colorVal))) {
        el.classList.add(`color-${String(colorVal)}`);
        el.dataset.color = String(colorVal);
        el.style.removeProperty('background');
      } else {
        // 普通字符串（例如 'red' 或 'brand-blue'），交给 CSS 变量或 color-custom 处理
        el.classList.add('color-custom');
        el.style.setProperty('--card-bg', String(colorVal));
        el.dataset.color = String(colorVal);
        el.style.removeProperty('background');
      }
      el.style.setProperty('--i', i);
      // mark placeholders
      if(d.isPlaceholder){
        el.classList.add('placeholder');
        el.innerHTML = `<div class="card-title"><div class="title">${d.title}</div></div>`;
      } else {
        el.innerHTML = `<div class="card-title"><div class="title">${d.title}</div></div>`;
      }

  // compute minimal signed offset on circular ring
  const half = n / 2;
  let diff = i - centerIndex;
  if(diff > half) diff -= n;
  if(diff <= -half) diff += n;
  el.style.setProperty('--offset', diff);

  // center check
  el.classList.toggle('center', i === centerIndex);
  el.classList.toggle('dim', i !== centerIndex);

  // z-index based on absolute offset
  el.style.zIndex = 200 - Math.abs(diff);

      el.addEventListener('click', (ev)=>{
        const idx = Number(el.dataset.index);
        if(idx === centerIndex) {
          // 点击中心卡牌，显示详情
          if(!d.isPlaceholder) {
            showDetail(idx);
          }
          return;
        }
        centerIndex = idx;
        update();
      });

  carousel.appendChild(el);
    });
  }

  function update(){
    const nodes = carousel.querySelectorAll('.card');
    const n = nodes.length;
    nodes.forEach((el)=>{
      const i = Number(el.dataset.index);
      const half = n / 2;
      let diff = i - centerIndex;
      if(diff > half) diff -= n;
      if(diff <= -half) diff += n;
      el.style.setProperty('--offset', diff);
      el.classList.toggle('center', i === centerIndex);
      el.classList.toggle('dim', i !== centerIndex);
      el.style.zIndex = 200 - Math.abs(diff);
    });
    // 更新无障碍属性和聚焦提示
    const centerEl = carousel.querySelector('.card.center');
    if(centerEl){
      centerEl.setAttribute('aria-current', 'true');
      centerEl.setAttribute('tabindex', '0');
      centerEl.focus({preventScroll:true});
    }
    // 移除其他卡的 aria-current
    carousel.querySelectorAll('.card:not(.center)').forEach(n=>{n.removeAttribute('aria-current'); n.removeAttribute('tabindex');});
  }

  prevBtn.addEventListener('click', ()=>{
  // 循环向前
  centerIndex = (centerIndex - 1 + cardsData.length) % cardsData.length;
  update();
  });
  nextBtn.addEventListener('click', ()=>{
  // 循环向后
  centerIndex = (centerIndex + 1) % cardsData.length;
  update();
  });

  // Keyboard
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowLeft'){
      prevBtn.click();
    } else if(e.key === 'ArrowRight'){
      nextBtn.click();
    }
  });

  // 鼠标滚轮左右切换（横向）
  carousel.addEventListener('wheel', (e)=>{
    if(Math.abs(e.deltaX) > Math.abs(e.deltaY)){
      if(e.deltaX > 0) nextBtn.click(); else prevBtn.click();
      e.preventDefault();
    }
  }, {passive:false});

  // 初始化
  render();

  // 对外 API，方便添加/删除卡片与跳转
  window.CardFan = {
    addCard(card){
      cardsData.push(card);
      // 若之前没有卡则将 centerIndex 设为中间
      if(cardsData.length === 1) centerIndex = 0;
      render();
    },
    removeCard(index){
      if(index < 0 || index >= cardsData.length) return false;
      cardsData.splice(index, 1);
      // 调整 centerIndex
      centerIndex = Math.max(0, Math.min(centerIndex, cardsData.length - 1));
      render();
      return true;
    },
    goTo(index){
      if(cardsData.length === 0) return;
      centerIndex = ((index % cardsData.length) + cardsData.length) % cardsData.length;
      update();
    },
    getCount(){return cardsData.length},
    getCurrent(){return centerIndex}
  };

  // 详情页功能
  const detailModal = document.getElementById('detailModal');
  const detailCard = detailModal.querySelector('.detail-card');
  const detailBackground = detailModal.querySelector('.detail-background');
  const detailOverlay = detailModal.querySelector('.detail-overlay');
  const closeBtn = document.getElementById('closeDetail');

  function showDetail(cardIndex) {
    // 获取原卡牌在实际数据中的索引
    const actualIndex = cardIndex < cardsData.length ? cardIndex : cardIndex % cardsData.length;
    const cardData = cardsData[actualIndex];
    const detailData = detailsData[actualIndex];
    
    if (!detailData) return;

    // 获取被点击的卡牌元素
    const clickedCard = document.querySelector(`[data-index="${cardIndex}"]`);
    if (!clickedCard) return;

    console.log('Showing detail for:', detailData.name);

    // 只设置背景样式，不复制内容
    const computedStyle = getComputedStyle(clickedCard);
    detailBackground.style.background = computedStyle.background;
    
    // 设置卡牌的颜色类，让CSS处理其他样式
    detailBackground.className = `detail-background ${clickedCard.className.replace('card', '')}`;
    
    // 清空背景层内容，避免显示原卡牌标题
    detailBackground.innerHTML = '';

    // 填充详细信息
    const displayName = detailData.name || detailData.title || cardData.title || '';
    document.getElementById('detailName').textContent = displayName;
    document.getElementById('detailPosition').textContent = detailData.position || '';
    document.getElementById('detailTenure').textContent = detailData.tenure || '';
    const connectEl = document.getElementById('detailConnect');
    if (detailData.connect && String(detailData.connect).trim().length > 0) {
      connectEl.textContent = detailData.connect;
      connectEl.parentElement.style.display = '';
    } else {
      // 隐藏联系方式容器
      connectEl.textContent = '';
      connectEl.parentElement.style.display = 'none';
    }
    document.getElementById('detailMessage').textContent = detailData.message || '';
    
    // 设置头像
    const avatarImg = document.getElementById('detailAvatar');
    if (detailData.avatar) {
      avatarImg.src = detailData.avatar;
      avatarImg.style.display = 'block';
    } else {
      avatarImg.style.display = 'none';
    }

    // 重置状态
    detailCard.classList.remove('expanded', 'show-details');
    detailCard.style.transition = 'none';
    
    // 设置初始位置
    detailCard.style.left = 'calc(50vw - 150px)';
    detailCard.style.top = 'calc(50vh - 200px)';
    detailCard.style.width = '300px';
    detailCard.style.height = '400px';

    // 显示模态框
    detailModal.classList.add('show');
    console.log('Modal shown');

    // 强制重绘
    detailCard.offsetHeight;

    // 恢复过渡效果
    detailCard.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';

    // 动画序列：先放大
    setTimeout(() => {
      detailCard.classList.add('expanded');
      console.log('Expanded');
    }, 100);

    // 然后显示详细信息叠加层
    setTimeout(() => {
      detailCard.classList.add('show-details');
      console.log('Details shown');
    }, 1000);
  }

  function closeDetail() {
    // 移除详细信息叠加层
    detailCard.classList.remove('show-details');
    
    // 延迟移除放大效果
    setTimeout(() => {
      detailCard.classList.remove('expanded');
    }, 300);
    
    // 最后隐藏模态框
    setTimeout(() => {
      detailModal.classList.remove('show');
    }, 800);
  }

  // 事件监听
  closeBtn.addEventListener('click', closeDetail);
  
  // 点击模态框背景关闭
  detailModal.addEventListener('click', (e) => {
    if (e.target === detailModal) {
      closeDetail();
    }
  });

  // ESC键关闭
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && detailModal.classList.contains('show')) {
      closeDetail();
    }
  });
})();
