// ===== 1. 方形按钮对应的PPT弹窗控制类（带翻页、分页、键盘、ESC） =====
class SquareBtnPPTModal {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll('#modalOverlay1 .slide');
    this.dots = document.querySelectorAll('#modalOverlay1 .dot');
    this.totalSlides = this.slides.length;
    this.isAnimating = false;
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.updateSlideDisplay();
  }
  
  bindEvents() {
    document.getElementById('transparentBtn').addEventListener('click', () => this.openModal());
    document.getElementById('closePPTBtn').addEventListener('click', () => this.closeModal());
    document.getElementById('prevBtn').addEventListener('click', () => this.previousSlide());
    document.getElementById('nextBtn').addEventListener('click', () => this.nextSlide());
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
    document.addEventListener('keydown', (e) => {
      if (document.getElementById('modalOverlay1').classList.contains('active')) {
        if (e.key === 'ArrowLeft') this.previousSlide();
        if (e.key === 'ArrowRight') this.nextSlide();
        if (e.key === 'Escape') this.closeModal();
      }
    });
  }

  openModal() {
    document.getElementById('modalOverlay1').classList.add('active');
    this.updateSlideDisplay();
  }

  closeModal() {
    document.getElementById('modalOverlay1').classList.remove('active');
    this.currentSlide = 0;
  }

  goToSlide(targetIndex) {
    if (this.isAnimating || targetIndex === this.currentSlide) return;
    this.isAnimating = true;
    const currentSlideEl = this.slides[this.currentSlide];
    const targetSlideEl = this.slides[targetIndex];
    this.slides.forEach(slide => {
      slide.classList.remove('active', 'prev');
    });
    currentSlideEl.classList.add('prev');
    targetSlideEl.classList.add('active');
    setTimeout(() => {
      this.currentSlide = targetIndex;
      this.updateDotsDisplay();
      this.isAnimating = false;
    }, 600);
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.totalSlides;
    this.goToSlide(nextIndex);
  }

  previousSlide() {
    const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.goToSlide(prevIndex);
  }

  updateSlideDisplay() {
    this.slides.forEach((slide, index) => {
      slide.classList.remove('active', 'prev');
      if (index === this.currentSlide) slide.classList.add('active');
    });
    this.updateDotsDisplay();
  }

  updateDotsDisplay() {
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentSlide);
    });
  }
}

// ===== 2. 普通弹窗（圆形按钮） =====
class NormalModal {
  constructor() {
    this.init();
  }
  
  init() {
    document.getElementById('openModal').addEventListener('click', () => {
      document.getElementById('modalOverlay').classList.add('show');
    });
    document.getElementById('closeNormalBtn').addEventListener('click', () => {
      document.getElementById('modalOverlay').classList.remove('show');
    });
    document.getElementById('modalOverlay').addEventListener('click', (e) => {
      if (e.target === document.getElementById('modalOverlay')) {
        document.getElementById('modalOverlay').classList.remove('show');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.getElementById('modalOverlay').classList.contains('show')) {
        document.getElementById('modalOverlay').classList.remove('show');
      }
    });
  }
}

// 3. 椭圆按钮对应PPT弹窗 —— 每个按钮对应一页，直接切换，弹窗常驻显示
class EllipseBtnPPTModal {
  constructor() {
    this.totalSlides = 5; // 总页数
    this.currentSlide = 0;
    this.slides = document.querySelectorAll('#ellipsePPTModal .slide');
    this.init();
  }

  init() {
    // 确保 slides 存在
    if (this.slides.length === 0) {
      console.error('椭圆弹窗的 .slide 元素未找到，请检查 HTML 中 #ellipsePPTModal 下的 .slide 是否存在');
      return;
    }

    // 绑定 5 个椭圆按钮，点击后切换到对应页
    for (let i = 1; i <= this.totalSlides; i++) {
      const btn = document.getElementById(`ellipseBtn${i}`);
      if (btn) {
        btn.addEventListener('click', () => {
          const pageIndex = i - 1; // 按钮1 → 第0页
          this.goToSlide(pageIndex);
          // 显示椭圆弹窗（如果尚未显示）
          const modal = document.getElementById('ellipsePPTModal');
          if (!modal.classList.contains('active')) {
            modal.style.display = 'flex';
            modal.classList.add('active');
          }
        });
      } else {
        console.warn(`未找到椭圆按钮：ellipseBtn${i}`);
      }
    }

    // 初始化：显示第1页（索引0），并确保弹窗显示
    this.goToSlide(0);
    const modal = document.getElementById('ellipsePPTModal');
    modal.style.display = 'flex';
    modal.classList.add('active');
  }

  goToSlide(index) {
    if (index < 0 || index >= this.slides.length) return;

    // 移除所有 slide 的 active 类
    this.slides.forEach(slide => {
      slide.classList.remove('active');
    });

    // 激活目标 slide
    if (this.slides[index]) {
      this.slides[index].classList.add('active');
      this.currentSlide = index;
    }
  }
}

// ===== 页面加载完成后初始化所有弹窗控制 =====
document.addEventListener('DOMContentLoaded', () => {
  new SquareBtnPPTModal();  // 方形按钮 → PPT弹窗（带翻页）
  new NormalModal();        // 圆形按钮 → 普通弹窗
  new EllipseBtnPPTModal(); // 椭圆按钮 → 单页直达PPT弹窗（修复版）
});