(function(){
  const carousel = document.getElementById('carousel');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  // 示例数据：可替换为任意数量的卡牌
  // 卡牌数据：每项至少需要 { title, color }
  const cardsData = [
    {title:'Universe', color:1},
    {title:"Campbell's Soup 3D", color:2},
    {title:'Bokeh', color:3},
    {title:'Sheep', color:4},
    {title:'The Scream', color:5},
    {title:'Viper Typography', color:6},
    {title:'Plant Trees', color:7},
    {title:'Surface Waves', color:8}
  ];

  // 详情数据数组 - 你可以在这里添加每个卡牌对应的详细信息
  const detailsData = [
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

  // centerIndex will be computed after we build the display list (with placeholders)
  let centerIndex = 0;

  // gap deg (must match CSS --gap-deg number)
  const GAP_DEG = 10; // degrees per slot —如果你更改 CSS 的 --gap-deg 请在此同步

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
      el.dataset.color = d.color || (i%8+1);
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
    document.getElementById('detailName').textContent = detailData.name;
    document.getElementById('detailPosition').textContent = detailData.position;
    document.getElementById('detailTenure').textContent = detailData.tenure;
    document.getElementById('detailConnect').textContent = detailData.connect;
    document.getElementById('detailMessage').textContent = detailData.message;
    
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
