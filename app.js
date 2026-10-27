/**
 * UZUM MARKET — ASOSIY JAVASCRIPT ILOVA KODI
 * Senior Frontend Architecture
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. DASTUR HOLATI (APPLICATION STATE)
  // =========================================================================
  const state = {
    products: typeof PRODUCTS_DATA !== 'undefined' ? PRODUCTS_DATA : [],
    banners: typeof BANNERS_DATA !== 'undefined' ? BANNERS_DATA : [],
    categories: typeof CATEGORIES_DATA !== 'undefined' ? CATEGORIES_DATA : [],
    cart: loadFromStorage('uzum_cart', []),
    favorites: new Set(loadFromStorage('uzum_favorites', [])),
    activeCategory: 'all',
    activeFilter: 'all',
    activeSubCategory: null,
    sortBy: 'popular',
    searchQuery: '',
    appliedPromo: null,
    currentCity: loadFromStorage('uzum_city', 'Toshkent'),
    currentUser: loadFromStorage('uzum_user', null),
    currentSlide: 0,
    slideInterval: null
  };

  // Yordamchi xotira funksiyalari (LocalStorage)
  function saveToStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('LocalStorage saqlashda xato:', e);
    }
  }

  function loadFromStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  // Narxni so'm formatiga o'tkazish: 15499000 -> "15 499 000 so'm"
  function formatPrice(num) {
    return Number(num).toLocaleString('ru-RU').replace(/,/g, ' ') + " so'm";
  }

  // =========================================================================
  // 2. DOM ELEMENTLARINI ANIQLASH
  // =========================================================================
  const dom = {
    // Header & Navigation
    citySelectorBtn: document.getElementById('citySelectorBtn'),
    currentCityName: document.getElementById('currentCityName'),
    pickupPointsBtn: document.getElementById('pickupPointsBtn'),
    faqBtn: document.getElementById('faqBtn'),
    myOrdersBtn: document.getElementById('myOrdersBtn'),
    langSwitchBtn: document.getElementById('langSwitchBtn'),
    currentLangLabel: document.getElementById('currentLangLabel'),
    homeLogoLink: document.getElementById('homeLogoLink'),
    catalogToggleBtn: document.getElementById('catalogToggleBtn'),
    globalSearchInput: document.getElementById('globalSearchInput'),
    searchClearBtn: document.getElementById('searchClearBtn'),
    globalSearchBtn: document.getElementById('globalSearchBtn'),
    searchDropdown: document.getElementById('searchDropdown'),
    authBtn: document.getElementById('authBtn'),
    authBtnText: document.getElementById('authBtnText'),
    favoritesHeaderBtn: document.getElementById('favoritesHeaderBtn'),
    favoritesCountBadge: document.getElementById('favoritesCountBadge'),
    cartHeaderBtn: document.getElementById('cartHeaderBtn'),
    cartCountBadge: document.getElementById('cartCountBadge'),
    catNavList: document.getElementById('catNavList'),

    // Hero Slider
    heroSlider: document.getElementById('heroSlider'),
    slidesWrapper: document.getElementById('slidesWrapper'),
    sliderPrevBtn: document.getElementById('sliderPrevBtn'),
    sliderNextBtn: document.getElementById('sliderNextBtn'),
    sliderDots: document.getElementById('sliderDots'),

    // Stories & Benefits
    storiesRow: document.getElementById('storiesRow'),

    // Products
    sectionHeadingTitle: document.getElementById('sectionHeadingTitle'),
    productsCountText: document.getElementById('productsCountText'),
    filterChipsRow: document.getElementById('filterChipsRow'),
    sortSelect: document.getElementById('sortSelect'),
    productsGrid: document.getElementById('productsGrid'),

    // Catalog Modal
    catalogModal: document.getElementById('catalogModal'),
    catalogCategoriesSidebar: document.getElementById('catalogCategoriesSidebar'),
    catalogSubcategoriesArea: document.getElementById('catalogSubcategoriesArea'),

    // Cart Drawer
    cartOverlay: document.getElementById('cartOverlay'),
    cartDrawer: document.getElementById('cartDrawer'),
    cartCloseBtn: document.getElementById('cartCloseBtn'),
    cartDrawerCount: document.getElementById('cartDrawerCount'),
    cartDrawerBody: document.getElementById('cartDrawerBody'),
    cartDrawerFooter: document.getElementById('cartDrawerFooter'),
    promoInput: document.getElementById('promoInput'),
    promoApplyBtn: document.getElementById('promoApplyBtn'),
    cartSummaryItemsCount: document.getElementById('cartSummaryItemsCount'),
    discountLine: document.getElementById('discountLine'),
    discountAmount: document.getElementById('discountAmount'),
    cartTotalSum: document.getElementById('cartTotalSum'),
    openCheckoutModalBtn: document.getElementById('openCheckoutModalBtn'),

    // Checkout Modal
    checkoutModal: document.getElementById('checkoutModal'),
    checkoutCloseBtn: document.getElementById('checkoutCloseBtn'),
    checkoutModalContent: document.getElementById('checkoutModalContent'),
    checkoutForm: document.getElementById('checkoutForm'),
    checkoutOrderTotal: document.getElementById('checkoutOrderTotal'),
    orderCitySelect: document.getElementById('orderCitySelect'),

    // Quick View Modal
    quickViewModal: document.getElementById('quickViewModal'),
    quickViewCloseBtn: document.getElementById('quickViewCloseBtn'),
    quickViewContent: document.getElementById('quickViewContent'),

    // Auth Modal
    authModal: document.getElementById('authModal'),
    authCloseBtn: document.getElementById('authCloseBtn'),
    authPhoneForm: document.getElementById('authPhoneForm'),
    authPhoneInput: document.getElementById('authPhoneInput'),

    // City Modal
    cityModal: document.getElementById('cityModal'),
    cityCloseBtn: document.getElementById('cityCloseBtn'),
    cityListGrid: document.getElementById('cityListGrid'),

    // Mobile Bottom Nav
    mobNavHome: document.getElementById('mobNavHome'),
    mobNavCatalog: document.getElementById('mobNavCatalog'),
    mobNavCart: document.getElementById('mobNavCart'),
    mobCartBadge: document.getElementById('mobCartBadge'),
    mobNavFavorites: document.getElementById('mobNavFavorites'),
    mobFavBadge: document.getElementById('mobFavBadge'),
    mobNavProfile: document.getElementById('mobNavProfile'),

    // Toasts
    toastContainer: document.getElementById('toastContainer')
  };

  // =========================================================================
  // 3. TOAST NOTIFICATION FUNKSIYASI
  // =========================================================================
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00ba34" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    } else if (type === 'error') {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f02d44" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
    } else {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7000ff" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    }

    toast.innerHTML = `${iconSvg} <span>${message}</span>`;
    dom.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s, transform 0.3s';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // =========================================================================
  // 4. HERO BANNER SLIDER
  // =========================================================================
  function initHeroSlider() {
    if (!dom.slidesWrapper || state.banners.length === 0) return;

    dom.slidesWrapper.innerHTML = '';
    dom.sliderDots.innerHTML = '';

    state.banners.forEach((banner, index) => {
      // Slayd elementi
      const slide = document.createElement('div');
      slide.className = 'slide';
      slide.style.background = banner.bgColor;

      slide.innerHTML = `
        <div class="slide-content">
          <span class="slide-tag">Kafolatlangan xarid</span>
          <h1 class="slide-title">${banner.title}</h1>
          <p class="slide-subtitle">${banner.subtitle}</p>
          <button class="slide-btn" data-banner-category="${banner.categoryFilter}">
            ${banner.buttonText}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
        <div class="slide-image-wrap">
          <img src="${banner.image}" alt="${banner.title}" class="slide-img">
        </div>
      `;

      dom.slidesWrapper.appendChild(slide);

      // Dot indikatori
      const dot = document.createElement('div');
      dot.className = `dot ${index === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(index));
      dom.sliderDots.appendChild(dot);
    });

    // Tugma harakatlari
    dom.sliderPrevBtn.addEventListener('click', () => {
      prevSlide();
      resetSlideTimer();
    });

    dom.sliderNextBtn.addEventListener('click', () => {
      nextSlide();
      resetSlideTimer();
    });

    // Banner ichidagi xarid tugmasi
    dom.slidesWrapper.addEventListener('click', (e) => {
      const btn = e.target.closest('.slide-btn');
      if (btn) {
        const cat = btn.dataset.bannerCategory;
        if (cat && cat !== 'all') {
          setCategoryFilter(cat);
        }
        document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
      }
    });

    startSlideTimer();

    // Hover bo'lganda slayderni to'xtatib turish
    dom.heroSlider.addEventListener('mouseenter', () => clearInterval(state.slideInterval));
    dom.heroSlider.addEventListener('mouseleave', () => startSlideTimer());
  }

  function goToSlide(index) {
    state.currentSlide = index;
    dom.slidesWrapper.style.transform = `translateX(-${state.currentSlide * 100}%)`;

    const dots = dom.sliderDots.querySelectorAll('.dot');
    dots.forEach((d, idx) => {
      d.classList.toggle('active', idx === state.currentSlide);
    });
  }

  function nextSlide() {
    state.currentSlide = (state.currentSlide + 1) % state.banners.length;
    goToSlide(state.currentSlide);
  }

  function prevSlide() {
    state.currentSlide = (state.currentSlide - 1 + state.banners.length) % state.banners.length;
    goToSlide(state.currentSlide);
  }

  function startSlideTimer() {
    clearInterval(state.slideInterval);
    state.slideInterval = setInterval(nextSlide, 4500);
  }

  function resetSlideTimer() {
    startSlideTimer();
  }

  // =========================================================================
  // 5. MAHSULOTLARNI SARALASH VA FILTERLASH
  // =========================================================================
  function getFilteredProducts() {
    let list = [...state.products];

    // Qidiruv bo'yicha filter
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase().trim();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.subCategory && p.subCategory.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Kategoriya bo'yicha filter
    if (state.activeCategory !== 'all') {
      if (state.activeCategory === 'muddatli') {
        list = list.filter(p => p.installment > 0);
      } else if (state.activeCategory === 'chegirmalar' || state.activeCategory === 'deals') {
        list = list.filter(p => p.oldPrice && p.oldPrice > p.price);
      } else if (state.activeCategory === 'popular') {
        list = list.filter(p => p.popular);
      } else if (state.activeCategory === 'favorites') {
        list = list.filter(p => state.favorites.has(p.id));
      } else {
        list = list.filter(p => p.category === state.activeCategory);
      }
    }

    // Subkategoriya bo'yicha
    if (state.activeSubCategory) {
      list = list.filter(p => p.subCategory === state.activeSubCategory);
    }

    // Saralash (Sorting)
    switch (state.sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        list.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || b.reviewsCount - a.reviewsCount);
        break;
    }

    return list;
  }

  // =========================================================================
  // 6. MAHSULOTLAR TO'RINI CHIZISH (RENDER PRODUCTS)
  // =========================================================================
  function renderProducts() {
    const list = getFilteredProducts();

    // Soni va sarlavhani yangilash
    dom.productsCountText.textContent = `${list.length} ta mahsulot`;

    if (state.activeCategory === 'favorites') {
      dom.sectionHeadingTitle.textContent = "Saralangan mahsulotlar";
    } else if (state.searchQuery) {
      dom.sectionHeadingTitle.textContent = `Qidiruv natijalari: "${state.searchQuery}"`;
    } else if (state.activeCategory === 'all') {
      dom.sectionHeadingTitle.textContent = "Ommabop mahsulotlar";
    } else {
      const catObj = state.categories.find(c => c.id === state.activeCategory);
      dom.sectionHeadingTitle.textContent = catObj ? catObj.name : "Mahsulotlar";
    }

    if (list.length === 0) {
      dom.productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <div style="width: 80px; height: 80px; margin: 0 auto 16px; border-radius: 50%; background: #f2f4f7; display: flex; align-items: center; justify-content: center; color: #8b8e99;">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">Hech narsa topilmadi</h3>
          <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px;">Qidiruv so'zini o'zgartirib ko'ring yoki barcha mahsulotlar ro'yxatiga qayting.</p>
          <button class="slide-btn" id="resetFiltersBtn" style="background: var(--primary); color: white;">Barcha tovarlarni ko'rish</button>
        </div>
      `;

      const resetBtn = document.getElementById('resetFiltersBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          resetAllFilters();
        });
      }
      return;
    }

    dom.productsGrid.innerHTML = list.map(product => {
      const isFav = state.favorites.has(product.id);
      const inCart = state.cart.some(item => item.id === product.id);

      return `
        <div class="product-card" data-product-id="${product.id}">
          <div class="card-img-container">
            <img src="${product.image}" alt="${product.title}" class="card-img" loading="lazy">
            ${product.badge ? `<span class="card-badge">${product.badge}</span>` : ''}
            <button class="card-favorite-btn ${isFav ? 'active' : ''}" data-action="toggle-fav" data-id="${product.id}" title="Saralanganlarga qo'shish" aria-label="Istaklarga saqlash">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
          </div>

          <div class="card-body">
            <h3 class="card-title" title="${product.title}">${product.title}</h3>

            <div class="card-rating-row">
              <span class="card-rating-star">★</span>
              <span class="card-rating-value">${product.rating}</span>
              <span>(${product.reviewsCount} sharh)</span>
            </div>

            <div class="card-installment-tag">
              ${formatPrice(product.installment)}/oy
            </div>

            <div class="card-price-row">
              <div class="card-prices">
                ${product.oldPrice ? `<span class="card-old-price">${formatPrice(product.oldPrice)}</span>` : ''}
                <span class="card-current-price">${formatPrice(product.price)}</span>
              </div>

              <button class="card-add-cart-btn ${inCart ? 'in-cart' : ''}" data-action="add-cart" data-id="${product.id}" title="${inCart ? 'Savatda mavjud' : 'Savatga qo\'shish'}" aria-label="Savatga solish">
                ${inCart ? `
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ` : `
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                `}
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // =========================================================================
  // 7. MAHSULOTLARGA BOSILGANDA HARAKATLAR (DELEGATION)
  // =========================================================================
  function initProductInteractions() {
    dom.productsGrid.addEventListener('click', (e) => {
      // 1. Saralanganlar tugmasi bosilsa
      const favBtn = e.target.closest('[data-action="toggle-fav"]');
      if (favBtn) {
        e.stopPropagation();
        const id = parseInt(favBtn.dataset.id, 10);
        toggleFavorite(id);
        return;
      }

      // 2. Savatga qo'shish tugmasi bosilsa
      const cartBtn = e.target.closest('[data-action="add-cart"]');
      if (cartBtn) {
        e.stopPropagation();
        const id = parseInt(cartBtn.dataset.id, 10);
        addToCart(id, 1);
        return;
      }

      // 3. Kartaning o'ziga bosilsa - Tezkor ko'rish (Quick View Modal) ochiladi
      const card = e.target.closest('.product-card');
      if (card) {
        const id = parseInt(card.dataset.productId, 10);
        openQuickView(id);
      }
    });
  }

  // =========================================================================
  // 8. SARALANGANLAR (FAVORITES) TIZIMI
  // =========================================================================
  function toggleFavorite(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    if (state.favorites.has(productId)) {
      state.favorites.delete(productId);
      showToast(`"${product.title.slice(0, 25)}..." saralanganlardan olib tashlandi`, 'info');
    } else {
      state.favorites.add(productId);
      showToast(`"${product.title.slice(0, 25)}..." saralanganlarga qo'shildi!`, 'success');
    }

    updateFavoritesBadges();
    saveToStorage('uzum_favorites', Array.from(state.favorites));
    renderProducts();
  }

  function updateFavoritesBadges() {
    const count = state.favorites.size;
    dom.favoritesCountBadge.textContent = count;
    dom.mobFavBadge.textContent = count;
  }

  // =========================================================================
  // 9. SAVAT TIZIMI (CART DRAWER & LOGIC)
  // =========================================================================
  function addToCart(productId, qty = 1) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = state.cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += qty;
    } else {
      state.cart.push({
        id: productId,
        quantity: qty,
        product: product
      });
    }

    saveToStorage('uzum_cart', state.cart);
    updateCartBadges();
    renderCartDrawer();
    renderProducts();
    showToast(`"${product.title.slice(0, 28)}..." savatga qo'shildi!`, 'success');
  }

  function updateCartQuantity(productId, delta) {
    const index = state.cart.findIndex(item => item.id === productId);
    if (index === -1) return;

    const newQty = state.cart[index].quantity + delta;
    if (newQty <= 0) {
      removeFromCart(productId);
    } else {
      state.cart[index].quantity = newQty;
      saveToStorage('uzum_cart', state.cart);
      updateCartBadges();
      renderCartDrawer();
    }
  }

  function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    saveToStorage('uzum_cart', state.cart);
    updateCartBadges();
    renderCartDrawer();
    renderProducts();
    showToast("Mahsulot savatdan o'chirildi", 'info');
  }

  function updateCartBadges() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    dom.cartCountBadge.textContent = totalItems;
    dom.mobCartBadge.textContent = totalItems;
    dom.cartDrawerCount.textContent = totalItems;
  }

  function calculateCartTotals() {
    const subtotal = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

    let discount = 0;
    if (state.appliedPromo) {
      discount = Math.round(subtotal * state.appliedPromo.discountRate);
    }

    const total = Math.max(0, subtotal - discount);

    return { subtotal, discount, total, totalCount };
  }

  function renderCartDrawer() {
    const { subtotal, discount, total, totalCount } = calculateCartTotals();

    dom.cartSummaryItemsCount.textContent = `${totalCount} dona`;
    dom.cartTotalSum.textContent = formatPrice(total);

    if (discount > 0) {
      dom.discountLine.style.display = 'flex';
      dom.discountAmount.textContent = `-${formatPrice(discount)}`;
    } else {
      dom.discountLine.style.display = 'none';
    }

    if (state.cart.length === 0) {
      dom.cartDrawerBody.innerHTML = `
        <div class="cart-empty-state">
          <svg class="cart-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          <div class="cart-empty-text">Savatda hozircha mahsulot yo'q</div>
          <div class="cart-empty-sub">Bosh sahifadagi qiziqarli to'plamlarni ko'zdan kechiring yoki qidiruvdan foydalaning.</div>
          <button class="slide-btn" id="startShoppingBtn" style="background: var(--primary); color: white;">Xaridni boshlash</button>
        </div>
      `;

      dom.cartDrawerFooter.style.display = 'none';

      const startBtn = document.getElementById('startShoppingBtn');
      if (startBtn) {
        startBtn.addEventListener('click', () => closeCart());
      }
      return;
    }

    dom.cartDrawerFooter.style.display = 'block';

    dom.cartDrawerBody.innerHTML = state.cart.map(item => `
      <div class="cart-item" data-cart-id="${item.id}">
        <img src="${item.product.image}" alt="${item.product.title}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.product.title}</div>
          <div class="cart-item-price">${formatPrice(item.product.price)}</div>

          <div class="cart-item-actions">
            <div class="qty-counter">
              <button class="qty-btn" data-action="qty-minus" data-id="${item.id}">−</button>
              <div class="qty-number">${item.quantity}</div>
              <button class="qty-btn" data-action="qty-plus" data-id="${item.id}">+</button>
            </div>

            <button class="cart-item-del-btn" data-action="del-item" data-id="${item.id}" title="O'chirish">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function openCart() {
    renderCartDrawer();
    dom.cartOverlay.classList.add('active');
    dom.cartDrawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    dom.cartOverlay.classList.remove('active');
    dom.cartDrawer.classList.remove('active');
    document.body.style.overflow = '';
  }

  function initCartDrawerInteractions() {
    dom.cartHeaderBtn.addEventListener('click', openCart);
    dom.mobNavCart.addEventListener('click', openCart);
    dom.cartCloseBtn.addEventListener('click', closeCart);
    dom.cartOverlay.addEventListener('click', closeCart);

    // Savat ichidagi sonini o'zgartirish va o'chirish
    dom.cartDrawerBody.addEventListener('click', (e) => {
      const minusBtn = e.target.closest('[data-action="qty-minus"]');
      if (minusBtn) {
        const id = parseInt(minusBtn.dataset.id, 10);
        updateCartQuantity(id, -1);
        return;
      }

      const plusBtn = e.target.closest('[data-action="qty-plus"]');
      if (plusBtn) {
        const id = parseInt(plusBtn.dataset.id, 10);
        updateCartQuantity(id, 1);
        return;
      }

      const delBtn = e.target.closest('[data-action="del-item"]');
      if (delBtn) {
        const id = parseInt(delBtn.dataset.id, 10);
        removeFromCart(id);
        return;
      }
    });

    // Promo kod qo'llash
    dom.promoApplyBtn.addEventListener('click', () => {
      const val = dom.promoInput.value.trim().toUpperCase();
      if (!val) {
        showToast('Iltimos, promo kodni kiriting', 'error');
        return;
      }

      if (val === 'UZUM10' || val === 'BAHOR' || val === 'SALOM' || val === 'UZUM2026') {
        state.appliedPromo = {
          code: val,
          discountRate: 0.10 // 10% chegirma
        };
        renderCartDrawer();
        showToast(`Promo kod "${val}" muvaffaqiyatli qo'llandi: -10%!`, 'success');
      } else {
        showToast("Noto'g'ri promo kod. 'UZUM10' kodini sinab ko'ring!", 'error');
      }
    });

    // Buyurtma berish oynasini ochish
    dom.openCheckoutModalBtn.addEventListener('click', () => {
      if (state.cart.length === 0) return;
      closeCart();
      openCheckoutModal();
    });
  }

  // =========================================================================
  // 10. BUYURTMA RASMIYLASHTIRISH (CHECKOUT MODAL)
  // =========================================================================
  function openCheckoutModal() {
    const { total } = calculateCartTotals();
    dom.checkoutOrderTotal.textContent = formatPrice(total);
    dom.orderCitySelect.value = state.currentCity;
    dom.checkoutModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCheckoutModal() {
    dom.checkoutModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function initCheckoutForm() {
    dom.checkoutCloseBtn.addEventListener('click', closeCheckoutModal);

    dom.checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fName = document.getElementById('orderFirstName').value;
      const lName = document.getElementById('orderLastName').value;
      const phone = document.getElementById('orderPhone').value;
      const city = dom.orderCitySelect.value;
      const orderNumber = Math.floor(100000 + Math.random() * 900000);

      // Buyurtma muvaffaqiyatli qabul qilingan ekran
      dom.checkoutModalContent.innerHTML = `
        <div class="order-success-screen">
          <div class="success-icon-box">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h3 class="success-title">Buyurtmangiz qabul qilindi!</h3>
          <p class="success-sub">
            Hurmatli <strong>${fName} ${lName}</strong>, buyurtma raqamingiz: <strong style="color: var(--primary);">#UZM-${orderNumber}</strong>.<br>
            Tovar 1 kun ichida <strong>${city}</strong> shahridagi topshirish punktiga yetkaziladi.
          </p>
          <div style="background: var(--bg-gray); padding: 16px; border-radius: var(--radius-md); margin-bottom: 24px; text-align: left; font-size: 13.5px;">
            <div><strong>Telefon:</strong> ${phone}</div>
            <div style="margin-top: 4px;"><strong>Yetkazish narxi:</strong> Bepul</div>
            <div style="margin-top: 4px;"><strong>Holat:</strong> Yig'ilmoqda</div>
          </div>
          <button class="slide-btn" id="finishOrderBtn" style="background: var(--primary); color: white; width: 100%; justify-content: center;">
            Bosh sahifaga qaytish
          </button>
        </div>
      `;

      // Savatni tozalash
      state.cart = [];
      state.appliedPromo = null;
      saveToStorage('uzum_cart', []);
      updateCartBadges();
      renderProducts();

      showToast(`Buyurtma #UZM-${orderNumber} rasmiylashtirildi!`, 'success');

      document.getElementById('finishOrderBtn').addEventListener('click', () => {
        closeCheckoutModal();
        location.reload(); // Bosh holatga qaytarish
      });
    });
  }

  // =========================================================================
  // 11. QUICK VIEW / MAHSULOT TAFSILOTLARI MODALI
  // =========================================================================
  function openQuickView(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const isFav = state.favorites.has(product.id);
    const inCart = state.cart.some(item => item.id === product.id);

    // Specs qismini shakllantirish
    const specsHtml = Object.entries(product.specs || {}).map(([k, v]) => `
      <div class="qv-spec-row">
        <span class="qv-spec-key">${k}</span>
        <span class="qv-spec-val">${v}</span>
      </div>
    `).join('');

    dom.quickViewContent.innerHTML = `
      <div class="quickview-grid">
        <div>
          <div class="qv-gallery-main">
            <img src="${product.image}" alt="${product.title}" id="qvMainImg">
          </div>
        </div>

        <div class="qv-details-wrap">
          <div class="qv-badge-row">
            ${product.badge ? `<span class="card-badge" style="position: static;">${product.badge}</span>` : ''}
            <span style="font-size: 12px; color: var(--accent-green); font-weight: 700;">✓ ${product.delivery}</span>
          </div>

          <h2 class="qv-title">${product.title}</h2>

          <div class="qv-meta-row">
            <span style="color: #ffbe1e; font-size: 15px;">★ ${product.rating}</span>
            <span>${product.reviewsCount} ta sharh</span>
            <span>Sotuvchi: <strong>Uzum Market</strong></span>
          </div>

          <div class="qv-price-block">
            ${product.oldPrice ? `<div class="qv-old-price">${formatPrice(product.oldPrice)}</div>` : ''}
            <div class="qv-current-price">${formatPrice(product.price)}</div>
          </div>

          <div class="qv-installment-box">
            <div class="qv-installment-title">Uzum Nasiya bilan 12 oyga foizsiz muddatli to'lov:</div>
            <div class="qv-installment-val">${formatPrice(product.installment)} / oyiga</div>
          </div>

          <p style="font-size: 13.5px; color: #4d4f59; margin-bottom: 20px; line-height: 1.5;">
            ${product.description}
          </p>

          <div class="qv-specs-box">
            <div class="qv-specs-title">Asosiy xususiyatlari</div>
            ${specsHtml}
          </div>

          <div class="qv-actions-row">
            <button class="qv-add-cart-btn" id="qvAddCartBtn" data-id="${product.id}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              <span>${inCart ? "Savatga yana qo'shish" : "Savatga qo'shish"}</span>
            </button>
            <button class="qv-favorite-btn ${isFav ? 'active' : ''}" id="qvFavBtn" data-id="${product.id}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              <span>${isFav ? "Saqlangan" : "Istaklarga"}</span>
            </button>
          </div>
        </div>
      </div>
    `;

    dom.quickViewModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Modal ichidagi tugmalar
    document.getElementById('qvAddCartBtn').addEventListener('click', () => {
      addToCart(product.id, 1);
    });

    document.getElementById('qvFavBtn').addEventListener('click', (e) => {
      toggleFavorite(product.id);
      const isNowFav = state.favorites.has(product.id);
      const btn = document.getElementById('qvFavBtn');
      btn.classList.toggle('active', isNowFav);
      btn.querySelector('svg').setAttribute('fill', isNowFav ? 'currentColor' : 'none');
      btn.querySelector('span').textContent = isNowFav ? "Saqlangan" : "Istaklarga";
    });
  }

  function closeQuickView() {
    dom.quickViewModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // =========================================================================
  // 12. KATALOG MEGA-MENU (MODAL)
  // =========================================================================
  function initCatalogMenu() {
    if (!dom.catalogCategoriesSidebar || state.categories.length === 0) return;

    // Chap panelni to'ldirish
    dom.catalogCategoriesSidebar.innerHTML = state.categories.map((cat, index) => `
      <div class="catalog-cat-item ${index === 0 ? 'active' : ''}" data-cat-id="${cat.id}">
        <span>${cat.name}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </div>
    `).join('');

    renderCatalogSubcategories(state.categories[0].id);

    // Kategoriya ustiga sichqoncha kelganda yoki bosilganda
    dom.catalogCategoriesSidebar.addEventListener('mouseover', (e) => {
      const item = e.target.closest('.catalog-cat-item');
      if (item) {
        dom.catalogCategoriesSidebar.querySelectorAll('.catalog-cat-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        renderCatalogSubcategories(item.dataset.catId);
      }
    });

    // Subkategoriyaga bosilganda
    dom.catalogSubcategoriesArea.addEventListener('click', (e) => {
      const link = e.target.closest('.subcat-link');
      if (link) {
        const subId = link.dataset.subId;
        const parentCat = link.dataset.parentCat;
        state.activeCategory = parentCat;
        state.activeSubCategory = subId;
        state.searchQuery = '';
        dom.globalSearchInput.value = '';

        closeCatalogModal();
        renderProducts();
        document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
      }
    });

    // Katalog tugmasi bosilishi
    dom.catalogToggleBtn.addEventListener('click', toggleCatalogModal);
    dom.mobNavCatalog.addEventListener('click', toggleCatalogModal);

    // Modal orqa foni bosilganda yopish
    dom.catalogModal.addEventListener('click', (e) => {
      if (e.target === dom.catalogModal) {
        closeCatalogModal();
      }
    });
  }

  function renderCatalogSubcategories(catId) {
    const category = state.categories.find(c => c.id === catId);
    if (!category) return;

    dom.catalogSubcategoriesArea.innerHTML = `
      <h3 class="subcategories-title">${category.name}</h3>
      <div class="subcategories-grid">
        ${category.items.map(item => `
          <a href="#" class="subcat-link" data-sub-id="${item.subId}" data-parent-cat="${category.id}">
            ${item.name}
          </a>
        `).join('')}
      </div>
    `;
  }

  function toggleCatalogModal() {
    const isActive = dom.catalogModal.classList.contains('active');
    if (isActive) {
      closeCatalogModal();
    } else {
      dom.catalogModal.classList.add('active');
      dom.catalogToggleBtn.classList.add('active');
    }
  }

  function closeCatalogModal() {
    dom.catalogModal.classList.remove('active');
    dom.catalogToggleBtn.classList.remove('active');
  }

  // =========================================================================
  // 13. CANLI QIDIRUV (LIVE SEARCH & SUGGESTIONS)
  // =========================================================================
  function initLiveSearch() {
    let debounceTimer;

    dom.globalSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      dom.searchClearBtn.style.display = query ? 'flex' : 'none';

      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        handleSearchSuggestions(query);
      }, 200);
    });

    // Enter bosilganda to'liq qidiruv
    dom.globalSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeSearch(dom.globalSearchInput.value.trim());
        dom.searchDropdown.classList.remove('active');
      }
    });

    dom.globalSearchBtn.addEventListener('click', () => {
      executeSearch(dom.globalSearchInput.value.trim());
      dom.searchDropdown.classList.remove('active');
    });

    // Tozalash tugmasi
    dom.searchClearBtn.addEventListener('click', () => {
      dom.globalSearchInput.value = '';
      dom.searchClearBtn.style.display = 'none';
      dom.searchDropdown.classList.remove('active');
      executeSearch('');
    });

    // Dropdown tashqarisiga bosilsa yopish
    document.addEventListener('click', (e) => {
      if (!dom.globalSearchInput.contains(e.target) && !dom.searchDropdown.contains(e.target)) {
        dom.searchDropdown.classList.remove('active');
      }
    });

    // Dropdown elementiga bosilganda
    dom.searchDropdown.addEventListener('click', (e) => {
      const item = e.target.closest('.search-item');
      if (item) {
        const id = parseInt(item.dataset.id, 10);
        dom.searchDropdown.classList.remove('active');
        openQuickView(id);
      }
    });
  }

  function handleSearchSuggestions(query) {
    if (!query || query.length < 2) {
      dom.searchDropdown.classList.remove('active');
      return;
    }

    const q = query.toLowerCase();
    const matches = state.products.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.subCategory && p.subCategory.toLowerCase().includes(q))
    ).slice(0, 6);

    if (matches.length === 0) {
      dom.searchDropdown.innerHTML = `
        <div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 13px;">
          "${query}" bo'yicha hech narsa topilmadi
        </div>
      `;
    } else {
      dom.searchDropdown.innerHTML = matches.map(p => `
        <div class="search-item" data-id="${p.id}">
          <img src="${p.image}" alt="${p.title}" class="search-item-img">
          <div class="search-item-info">
            <div class="search-item-title">${p.title}</div>
            <div class="search-item-price">${formatPrice(p.price)}</div>
          </div>
        </div>
      `).join('');
    }

    dom.searchDropdown.classList.add('active');
  }

  function executeSearch(query) {
    state.searchQuery = query;
    state.activeCategory = 'all';
    state.activeSubCategory = null;
    renderProducts();
    document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
  }

  // =========================================================================
  // 14. FILTER VA SARALASH BOSHQARUVI
  // =========================================================================
  function initFilterAndSort() {
    // 1. Kategoriya Sub-Nav qatori
    dom.catNavList.addEventListener('click', (e) => {
      const item = e.target.closest('.cat-nav-item');
      if (item) {
        dom.catNavList.querySelectorAll('.cat-nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        const cat = item.dataset.cat;
        setCategoryFilter(cat);
      }
    });

    // 2. Filter chiplari (Barchasi, Aksiyalar, Elektronika...)
    dom.filterChipsRow.addEventListener('click', (e) => {
      const chip = e.target.closest('.filter-chip');
      if (chip) {
        dom.filterChipsRow.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const filter = chip.dataset.filter;
        setCategoryFilter(filter);
      }
    });

    // 3. Aylanalar (Stories)
    dom.storiesRow.addEventListener('click', (e) => {
      const card = e.target.closest('.story-card');
      if (card) {
        const cat = card.dataset.cat;
        setCategoryFilter(cat);
        document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
      }
    });

    // 4. Saralash tanlovi (Select)
    dom.sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });

    // 5. Saralanganlar tugmasi bosilganda
    dom.favoritesHeaderBtn.addEventListener('click', () => {
      setCategoryFilter('favorites');
      document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
    });

    dom.mobNavFavorites.addEventListener('click', () => {
      setCategoryFilter('favorites');
      document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
    });

    // 6. Bosh sahifa logotipi bosilganda
    dom.homeLogoLink.addEventListener('click', (e) => {
      e.preventDefault();
      resetAllFilters();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    dom.mobNavHome.addEventListener('click', () => {
      resetAllFilters();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function setCategoryFilter(cat) {
    state.activeCategory = cat;
    state.activeSubCategory = null;
    state.searchQuery = '';
    dom.globalSearchInput.value = '';
    dom.searchClearBtn.style.display = 'none';

    // Sub-nav va chiplarni sinxronlashtirish
    dom.catNavList.querySelectorAll('.cat-nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.cat === cat);
    });

    dom.filterChipsRow.querySelectorAll('.filter-chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.filter === cat);
    });

    renderProducts();
  }

  function resetAllFilters() {
    state.activeCategory = 'all';
    state.activeSubCategory = null;
    state.searchQuery = '';
    dom.globalSearchInput.value = '';
    dom.searchClearBtn.style.display = 'none';

    dom.catNavList.querySelectorAll('.cat-nav-item').forEach(i => i.classList.remove('active'));
    dom.catNavList.querySelector('[data-cat="all"]').classList.add('active');

    dom.filterChipsRow.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    dom.filterChipsRow.querySelector('[data-filter="all"]').classList.add('active');

    renderProducts();
  }

  // =========================================================================
  // 15. AUTH / LOGIN MODAL TIZIMI
  // =========================================================================
  function initAuthModal() {
    function openAuth() {
      if (state.currentUser) {
        // Agar kiringan bo'lsa profil ma'lumotlari
        showToast(`Siz tizimga kirdingiz: ${state.currentUser.phone}`, 'info');
        return;
      }
      dom.authModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      dom.authPhoneInput.focus();
    }

    function closeAuth() {
      dom.authModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    dom.authBtn.addEventListener('click', openAuth);
    dom.mobNavProfile.addEventListener('click', openAuth);
    dom.authCloseBtn.addEventListener('click', closeAuth);

    // Telefon raqam formati
    dom.authPhoneInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.length > 9) val = val.slice(0, 9);
      e.target.value = val;
    });

    dom.authPhoneForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const num = dom.authPhoneInput.value.trim();
      if (num.length < 9) {
        showToast("Iltimos, to'liq telefon raqamingizni kiriting (9 xona)", 'error');
        return;
      }

      state.currentUser = {
        phone: `+998 ${num}`,
        name: 'Foydalanuvchi'
      };

      saveToStorage('uzum_user', state.currentUser);
      dom.authBtnText.textContent = "Kabinet";
      closeAuth();
      showToast("Muvaffaqiyatli kirdingiz! Xush kelibsiz!", 'success');
    });

    if (state.currentUser) {
      dom.authBtnText.textContent = "Kabinet";
    }
  }

  // =========================================================================
  // 16. SHAHAR TANLASH TIZIMI
  // =========================================================================
  function initCitySelector() {
    dom.currentCityName.textContent = state.currentCity;

    function openCityModal() {
      dom.cityModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeCityModal() {
      dom.cityModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    dom.citySelectorBtn.addEventListener('click', openCityModal);
    dom.pickupPointsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCityModal();
    });
    dom.cityCloseBtn.addEventListener('click', closeCityModal);

    dom.cityListGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('.city-option-btn');
      if (btn) {
        const city = btn.dataset.city;
        state.currentCity = city;
        saveToStorage('uzum_city', city);
        dom.currentCityName.textContent = city;

        dom.cityListGrid.querySelectorAll('.city-option-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        closeCityModal();
        showToast(`Shahar o'zgartirildi: ${city}`, 'info');
      }
    });
  }

  // =========================================================================
  // 17. TIL VA BOSHQA HEADER TUGMALARI
  // =========================================================================
  function initHeaderExtras() {
    let currentLang = 'uz';
    dom.langSwitchBtn.addEventListener('click', () => {
      if (currentLang === 'uz') {
        currentLang = 'ru';
        dom.currentLangLabel.textContent = "Русский";
        showToast("Язык интерфейса изменен на Русский", 'info');
      } else {
        currentLang = 'uz';
        dom.currentLangLabel.textContent = "O'zbekcha";
        showToast("Til O'zbekchaga o'zgartirildi", 'info');
      }
    });

    dom.faqBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast("Savol-javoblar bo'limi: 1 kunda yetkazish bepul, kafolat 1 yil!", 'info');
    });

    dom.myOrdersBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!state.currentUser) {
        dom.authBtn.click();
      } else {
        showToast("Sizda faol buyurtmalar mavjud emas.", 'info');
      }
    });

    // Quick View modali yopish
    dom.quickViewCloseBtn.addEventListener('click', closeQuickView);
    dom.quickViewModal.addEventListener('click', (e) => {
      if (e.target === dom.quickViewModal) {
        closeQuickView();
      }
    });

    // Checkout modali foniga bosilganda
    dom.checkoutModal.addEventListener('click', (e) => {
      if (e.target === dom.checkoutModal) {
        closeCheckoutModal();
      }
    });

    // Shahar modali foni
    dom.cityModal.addEventListener('click', (e) => {
      if (e.target === dom.cityModal) {
        dom.cityModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Auth modal foni
    dom.authModal.addEventListener('click', (e) => {
      if (e.target === dom.authModal) {
        dom.authModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // =========================================================================
  // 18. ILOVANI BOSHLASH (APP INITIALIZATION)
  // =========================================================================
  function init() {
    initHeroSlider();
    initCatalogMenu();
    initLiveSearch();
    initProductInteractions();
    initCartDrawerInteractions();
    initCheckoutForm();
    initAuthModal();
    initCitySelector();
    initFilterAndSort();
    initHeaderExtras();

    // Dastlabki ma'lumotlarni chizish
    updateCartBadges();
    updateFavoritesBadges();
    renderProducts();

    console.log("🍇 Uzum Market muvaffaqiyatli yuklandi!");
  }

  // Sahifa yuklanganda ishga tushirish
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
