const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");
const cards = document.querySelectorAll(".card");
const angle = 20;

// 动画状态控制
let isAnimating = false;
let currentCenterIndex = 1; // 当前中心卡片的数据索引

// 卡牌数据
const cardData = [
  {
    name: "Card 1",
    desc: "Frontend Developer",
    image: "./1.png"
  },
  {
    name: "Card 2", 
    desc: "Backend Developer",
    image: "./2.png"
  },
  {
    name: "Card 3",
    desc: "Full Stack Developer", 
    image: "./1.png"
  }
];

// 位置状态数组 - 只使用3个可见位置进行循环
const positions = ['position-left', 'position-center', 'position-right'];

// 移动所有卡片到新位置
function moveCards(direction) {
  if (isAnimating) return;
  isAnimating = true;

  cards.forEach(card => {
    // 获取当前位置索引
    let currentPosIndex = -1;
    positions.forEach((pos, index) => {
      if (card.classList.contains(pos)) {
        currentPosIndex = index;
      }
    });

    // 移除当前位置类
    card.classList.remove(...positions);

    // 计算新位置
    let newPosIndex;
    if (direction === 'left') {
      newPosIndex = currentPosIndex - 1;
      if (newPosIndex < 0) {
        // 从左侧隐藏位置移动到右侧隐藏位置
        newPosIndex = positions.length - 1;
      }
    } else {
      newPosIndex = currentPosIndex + 1;
      if (newPosIndex >= positions.length) {
        // 从右侧隐藏位置移动到左侧隐藏位置
        newPosIndex = 0;
      }
    }

    // 添加新位置类
    card.classList.add(positions[newPosIndex]);

    // 如果这张卡片移动到了中心位置，更新当前中心索引
    if (newPosIndex === 1) { // position-center的索引现在是1
      currentCenterIndex = parseInt(card.getAttribute('data-card-id'));
    }
  });

  // 更新指示器
  updateIndicator();

  // 动画完成后重置状态
  setTimeout(() => {
    isAnimating = false;
  }, 800);
}

// 向左移动（上一张）
function moveLeft() {
  moveCards('left');
}

// 向右移动（下一张）
function moveRight() {
  moveCards('right');
}

// 更新位置指示器
function updateIndicator() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentCenterIndex);
  });
}

// 直接跳转到指定卡片
function goToCard(targetIndex) {
  if (isAnimating || targetIndex === currentCenterIndex) return;
  
  // 计算需要移动的步数和方向
  const totalCards = cardData.length;
  let steps = targetIndex - currentCenterIndex;
  
  // 处理循环，选择最短路径
  if (steps > totalCards / 2) {
    steps -= totalCards;
  } else if (steps < -totalCards / 2) {
    steps += totalCards;
  }
  
  // 执行移动
  const moveDirection = steps > 0 ? 'right' : 'left';
  const moveCount = Math.abs(steps);
  
  let currentMove = 0;
  function executeMove() {
    if (currentMove < moveCount) {
      moveCards(moveDirection);
      currentMove++;
      setTimeout(executeMove, 100); // 快速连续移动
    }
  }
  
  if (moveCount > 0) {
    executeMove();
  }
}

// 绑定按钮事件
leftBtn.addEventListener("click", moveLeft);
rightBtn.addEventListener("click", moveRight);

// 绑定指示器点击事件
document.querySelectorAll('.dot').forEach((dot, index) => {
  dot.addEventListener('click', () => {
    goToCard(index);
  });
});

// 键盘控制
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    moveLeft();
  } else if (e.key === "ArrowRight") {
    moveRight();
  }
});

// 初始化
updateIndicator();

// 鼠标交互效果（仅对中心卡片）
(() => {
  // don't tilt on mobile phone
  if (navigator.userAgentData && navigator.userAgentData.mobile) return;

  // 鼠标跟随旋转功能
  document.addEventListener("mousemove", (e) => {
    const centerCard = document.querySelector('.card.position-center');
    if (!centerCard) return;
    
    const rect = centerCard.getBoundingClientRect();
    const cardWidth = rect.width;
    const cardHeight = rect.height;
    const centerX = rect.left + cardWidth / 2;
    const centerY = rect.top + cardHeight / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // 检查鼠标是否在卡片范围内
    if (mouseX >= -cardWidth/2 && mouseX <= cardWidth/2 && 
        mouseY >= -cardHeight/2 && mouseY <= cardHeight/2) {
      const rotateX = -(angle * mouseY) / (cardHeight / 2);
      const rotateY = (angle * mouseX) / (cardWidth / 2);

      centerCard.style.setProperty("--rotateX", rotateX + "deg");
      centerCard.style.setProperty("--rotateY", rotateY + "deg");
    } else {
      // 鼠标离开时恢复
      centerCard.style.setProperty("--rotateX", "0deg");
      centerCard.style.setProperty("--rotateY", "0deg");
    }
  });

  // 点击翻转功能
  document.addEventListener("click", (e) => {
    const centerCard = document.querySelector('.card.position-center');
    if (centerCard && centerCard.contains(e.target)) {
      centerCard.classList.toggle("flipped");
    }
  });
})();
