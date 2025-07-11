// Infinite-loop slider logic for references section with autoplay and dots
// (c) minimalist, vanilla JS

document.addEventListener('DOMContentLoaded', function() {
  // Tüm görseller WebP formatında olduğu için WebP desteği kontrolü kaldırıldı
  
  // Custom file input filename display
  const fileInput = document.getElementById('attachment');
  const fileChosen = document.getElementById('file-chosen');
  if (fileInput && fileChosen) {
    fileInput.addEventListener('change', function() {
      fileChosen.textContent = this.files && this.files.length > 0 ? this.files[0].name : 'Dosya seçilmedi';
    });
  }

  // Contact form validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const fields = [
      { id: 'firstName',    errorMsg: 'İsim zorunludur.' },
      { id: 'lastName',     errorMsg: 'Soyisim zorunludur.' },
      { id: 'phone',        errorMsg: 'Geçerli bir telefon numarası girin.' },
      { id: 'email',        errorMsg: 'Geçerli bir e-posta girin.' },
      { id: 'message',      errorMsg: 'Mesaj zorunludur.' }
    ];

    contactForm.addEventListener('submit', function(e) {
      let isValid = true;
      fields.forEach(field => {
        const input = document.getElementById(field.id);
        const errorEl = input.parentElement.querySelector('.error-message');
        if (!input.checkValidity()) {
          errorEl.textContent = field.errorMsg;
          errorEl.classList.add('error-visible');
          isValid = false;
        } else {
          errorEl.classList.remove('error-visible');
        }
      });

      const phoneInput   = document.getElementById('phone');
      const phonePattern = /^05\d{9}$/;
      const phoneErrorEl = phoneInput.parentElement.querySelector('.error-message');
      if (phoneInput.value && !phonePattern.test(phoneInput.value.trim())) {
        phoneErrorEl.textContent = 'Geçerli bir telefon numarası girin.';
        phoneErrorEl.classList.add('error-visible');
        isValid = false;
      }

      const emailInput   = document.getElementById('email');
      const emailErrorEl = emailInput.parentElement.querySelector('.error-message');
      if (emailInput.value && !emailInput.checkValidity()) {
        emailErrorEl.textContent = 'Geçerli bir e-posta girin.';
        emailErrorEl.classList.add('error-visible');
        isValid = false;
      }

      if (!isValid) {
        e.preventDefault(); // Only prevent submission when validation fails
      }
      // If isValid remains true, allow default form submit to Formspree
    });
  }
  
  // Carousel functionality
  initCarousel();
  
  // Modal functionality
  initModal();
});

// WebP fonksiyonu kaldırıldı - tüm görseller WebP formatında

// Modal initialization function
function initModal() {
  const modal = document.getElementById('imageModal');
  const closeBtn = modal.querySelector('.modal-close');
  
  // Çarpı butonuna tıklama
  closeBtn.addEventListener('click', closeModal);
  
  // Modal dışına tıklama
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // ESC tuşuna basma
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
}

// Global carousel variables
let autoplayInterval;
let currentSlide = 0;
let isAnimating = false;
let isModalOpen = false;

// Carousel setup - Performans iyileştirmesi için optimize edildi
function initCarousel() {
  const carouselTrack = document.querySelector('.carousel-track');
  if (!carouselTrack) return;
  
  // Tüm görseller WebP formatında olduğu için WebP desteği kontrolü kaldırıldı
  
  // Carousel images - Tüm görseller WebP formatında
  const carouselImages = [
    {
      src: 'assets/carousel-images/project1.webp',
      alt: 'Aşkaabat Olimpik Stadyum - Türkmenistan',
      note: 'Aşkaabat Olimpik Stadyum / Türkmenistan'
    },
    {
      src: 'assets/carousel-images/project2.webp',
      alt: 'Aşkaabat Olimpik Stadyum - Türkmenistan',
      note: 'Aşkaabat Olimpik Stadyum / Türkmenistan'
    },
    {
      src: 'assets/carousel-images/project3.webp',
      alt: 'Aşkaabat Olimpik Stadyum - Türkmenistan',
      note: 'Aşkaabat Olimpik Stadyum / Türkmenistan'
    },
    {
      src: 'assets/carousel-images/project4.webp',
      alt: 'Milli Sazlı Drama Tiyatro - Aşkaabat, Türkmenistan',
      note: 'Milli Sazlı Drama Tiyatro / Aşkaabat, Türkmenistan'
    },
    {
      src: 'assets/carousel-images/project5.webp',
      alt: 'Milli Sazlı Drama Tiyatro - Aşkaabat, Türkmenistan',
      note: 'Milli Sazlı Drama Tiyatro / Aşkaabat, Türkmenistan'
    },
    {
      src: 'assets/carousel-images/project6.webp',
      alt: 'Milli Sazlı Drama Tiyatro - Aşkaabat, Türkmenistan',
      note: 'Milli Sazlı Drama Tiyatro / Aşkaabat, Türkmenistan'
    },
    {
      src: 'assets/carousel-images/project7.webp',
      alt: 'Tümay Koleji - İncek, Ankara',
      note: 'Tümay Koleji / İncek, Ankara'
    },
    {
      src: 'assets/carousel-images/project8.webp',
      alt: 'Milas Havaalanı',
      note: 'Milas Havaalanı'
    },
    {
      src: 'assets/carousel-images/project9.webp',
      alt: 'Hoca Ahmet Yesevi Üniversitesi - Kazakistan',
      note: 'Hoca Ahmet Yesevi Üniversitesi / Kazakistan'
    },
    {
      src: 'assets/carousel-images/project10.webp',
      alt: 'FTZ Alışveriş Merkezi Havuzları - Keçiören, Ankara',
      note: 'FTZ Alışveriş Merkezi Havuzları / Keçiören, Ankara'
    },
    {
      src: 'assets/carousel-images/project11.webp',
      alt: 'FTZ Alışveriş Merkezi Havuzları - Keçiören, Ankara',
      note: 'FTZ Alışveriş Merkezi Havuzları / Keçiören, Ankara'
    },
    {
      src: 'assets/carousel-images/project12.webp',
      alt: 'Tubitak Merkez Bina - Kavaklıdere, Ankara',
      note: 'Tubitak Merkez Bina / Kavaklıdere, Ankara'
    },
    {
      src: 'assets/carousel-images/project13.webp',
      alt: 'Tubitak Merkez Bina - Kavaklıdere, Ankara',
      note: 'Tubitak Merkez Bina / Kavaklıdere, Ankara'
    },
    {
      src: 'assets/carousel-images/project14.webp',
      alt: 'Tubitak Merkez Bina - Kavaklıdere, Ankara',
      note: 'Tubitak Merkez Bina / Kavaklıdere, Ankara'
    },
    {
      src: 'assets/carousel-images/project15.webp',
      alt: 'MNG İş Merkezi - Gop, Ankara',
      note: 'MNG İş Merkezi / Gop, Ankara'
    },
    {
      src: 'assets/carousel-images/project16.webp',
      alt: 'MNG İş Merkezi - Gop, Ankara',
      note: 'MNG İş Merkezi / Gop, Ankara'
    },
    {
      src: 'assets/carousel-images/project17.webp',
      alt: 'A.Ü Ziraat Fakültesi, Fermantasyon Teknolojileri Binası - Ankara',
      note: 'A.Ü Ziraat Fakültesi, Fermantasyon Teknolojileri Binası / Ankara'
    },
    {
      src: 'assets/carousel-images/project18.webp',
      alt: 'A.Ü Ziraat Fakültesi, Et Mamülleri Binası - Ankara',
      note: 'A.Ü Ziraat Fakültesi, Et Mamülleri Binası / Ankara'
    },
    {
      src: 'assets/carousel-images/project19.webp',
      alt: 'A.Ü Ziraat Fakültesi, Mikrobiyoloji Binası - Ankara',
      note: 'A.Ü Ziraat Fakültesi, Mikrobiyoloji Binası / Ankara'
    },
    {
      src: 'assets/carousel-images/project20.webp',
      alt: 'Bilkent Üniversitesi Kampüsü, Bilkent Özel Lisesi - Ankara',
      note: 'Bilkent Üniversitesi Kampüsü, Bilkent Özel Lisesi / Ankara'
    },
    {
      src: 'assets/carousel-images/project21.webp',
      alt: 'Bilkent Üniversitesi Kampüsü, Bilkent Özel Ortaokulu - Ankara',
      note: 'Bilkent Üniversitesi Kampüsü, Bilkent Özel Ortaokulu / Ankara'
    },
    {
      src: 'assets/carousel-images/project22.webp',
      alt: 'Bilkent Üniversitesi Merkez Kampüsü, Lojman Blokları - Ankara',
      note: 'Bilkent Üniversitesi Merkez Kampüsü, Lojman Blokları / Ankara'
    },
    {
      src: 'assets/carousel-images/project23.webp',
      alt: 'A.Ü Ziraat Fakültesi, Uçucu Yağlar Binası - Ankara',
      note: 'A.Ü Ziraat Fakültesi, Uçucu Yağlar Binası / Ankara'
    },
    {
      src: 'assets/carousel-images/project24.webp',
      alt: 'Bilkent Üniversitesi Doğu Kampüsü, Öğretim Üyeleri Lojmanları ve Kreş - Ankara',
      note: 'Bilkent Üniversitesi Doğu Kampüsü, Öğretim Üyeleri Lojmanları ve Kreş / Ankara'
    },
    {
      src: 'assets/carousel-images/project25.webp',
      alt: 'Bilkent Üniversitesi Merkez Kampüsü, Öğrenci Yurtları - Ankara',
      note: 'Bilkent Üniversitesi Merkez Kampüsü, Öğrenci Yurtları / Ankara'
    },
    {
      src: 'assets/carousel-images/project26.webp',
      alt: 'Bilkent Üniversitesi, Müzik Fakültesi - Ankara',
      note: 'Bilkent Üniversitesi, Müzik Fakültesi / Ankara'
    },
    {
      src: 'assets/carousel-images/project27.webp',
      alt: 'Bilkent Üniversitesi, Müzik Fakültesi Kafeterya - Ankara',
      note: 'Bilkent Üniversitesi, Müzik Fakültesi Kafeterya / Ankara'
    },
    {
      src: 'assets/carousel-images/project28.webp',
      alt: 'Bilkent Üniversitesi, Müzik Fakültesi Giriş Holü - Ankara',
      note: 'Bilkent Üniversitesi, Müzik Fakültesi Giriş Holü / Ankara'
    },
    {
      src: 'assets/carousel-images/project29.webp',
      alt: 'Bilkent Üniversitesi, Müzik Fakültesi Konser Salonu - Ankara',
      note: 'Bilkent Üniversitesi, Müzik Fakültesi Konser Salonu / Ankara'
    },
    {
      src: 'assets/carousel-images/project30.webp',
      alt: 'Milli Piyango İdaresi, Gölbaşı Sosyal Tesisleri - Ankara',
      note: 'Milli Piyango İdaresi, Gölbaşı Sosyal Tesisleri / Ankara'
    },
    {
      src: 'assets/carousel-images/project31.webp',
      alt: 'Çankaya Belediyesi, Ahlatlıbel Sosyal Tesisleri - Ankara',
      note: 'Çankaya Belediyesi, Ahlatlıbel Sosyal Tesisleri / Ankara'
    },
    {
      src: 'assets/carousel-images/project32.webp',
      alt: 'MNG Günal İnşaat, Ankara Hilton Oteli',
      note: 'MNG Günal İnşaat, Ankara Hilton Oteli'
    },
    {
      src: 'assets/carousel-images/project33.webp',
      alt: 'TV8 Binası - Ankara',
      note: 'TV8 Binası / Ankara'
    },
    {
      src: 'assets/carousel-images/project34.webp',
      alt: 'MNG Günal Ticaret Merkezi - Ankara',
      note: 'MNG Günal Ticaret Merkezi / Ankara'
    }
  ];
  
  // Placeholder olarak kullanılacak varsayılan resim (gerçek resimler ekleninceye kadar)
  const placeholderImage = 'https://via.placeholder.com/1000x600/f9f9f9/555555?text=İz-Kim+Proje+Fotoğrafı';
  
  // DOM manipülasyonlarını azaltmak için fragment kullanımı
  const fragment = document.createDocumentFragment();
  const dotsFragment = document.createDocumentFragment();
  
  // Carousel slide'larını oluştur
  carouselImages.forEach((image, index) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    
    // Tüm dosyalar için aynı kod (resim veya PDF placeholder)
    const img = document.createElement('img');
    // Lazy loading kullan
    img.loading = 'lazy';
    // Görsel yüklenene kadar boyut bilgisi ver
    img.width = 1000;
    img.height = 600;
    img.alt = image.alt;
    
    // Görsel yüklenmesi için event listener ekle
    img.onload = function() {
      // Görsel yüklendiğinde animasyon ekle
      this.classList.add('loaded');
    };
    
    img.onerror = function() {
      // Görsel yüklenemezse placeholder kullan
      this.src = placeholderImage;
      console.log('Görsel yüklenemedi: ' + image.src);
    };
    
    // Tüm görseller WebP formatında
    img.src = image.src;
    
    // Slide'ı tıklanabilir hale getir
    slide.addEventListener('click', function() {
      openModal(image.src, image.alt, image.note);
    });
    
    slide.appendChild(img);
    
    // Görsel notu ekle
    if (image.note) {
      const noteElement = document.createElement('div');
      noteElement.className = 'carousel-image-note';
      noteElement.textContent = image.note;
      slide.appendChild(noteElement);
    }
    
    fragment.appendChild(slide);
    
    // Dot oluştur
    const dot = document.createElement('div');
    dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
    dot.dataset.index = index;
    dotsFragment.appendChild(dot);
  });
  
  // Tüm slide'ları bir kerede DOM'a ekle
  carouselTrack.appendChild(fragment);
  
  // Dots oluştur
  const dotsContainer = document.querySelector('.carousel-dots');
  if (dotsContainer) {
    dotsContainer.appendChild(dotsFragment);
    
    // Event delegation kullanarak tek bir event listener ekle
    dotsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('carousel-dot')) {
        currentSlide = parseInt(e.target.dataset.index, 10);
        updateCarousel();
      }
    });
  }
  
  // Navigasyon butonları
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  
  // Global değişkenler artık yukarıda tanımlandı
  
  // Carousel'i güncelle - Throttling eklenmiş
  function updateCarousel() {
    if (isAnimating) return;
    
    isAnimating = true;
    
    // Track'i kaydır
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Aktif noktayı güncelle
    document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
    
    // Animasyon bittikten sonra isAnimating'i false yap
    setTimeout(() => {
      isAnimating = false;
    }, 500); // CSS transition süresi ile eşleştir
    
    // Otoplay'i yeniden başlat
    resetAutoplay();
  }
  
  // Önceki slide
  function prevSlide() {
    if (isAnimating) return;
    currentSlide = (currentSlide === 0) ? carouselImages.length - 1 : currentSlide - 1;
    updateCarousel();
  }
  
  // Sonraki slide
  function nextSlide() {
    if (isAnimating) return;
    currentSlide = (currentSlide === carouselImages.length - 1) ? 0 : currentSlide + 1;
    updateCarousel();
  }
  
  // Otomatik oynat
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000); // 5 saniye
  }
  
  // Otoplay'i durdur ve yeniden başlat
  function resetAutoplay() {
    clearInterval(autoplayInterval);
    // Modal açık değilse otomatik geçişi başlat
    if (!isModalOpen) {
      startAutoplay();
    }
  }
  
  // Global fonksiyonlar - modal'dan erişilebilir
  window.startCarouselAutoplay = startAutoplay;
  window.stopCarouselAutoplay = function() {
    clearInterval(autoplayInterval);
  };
  
  // Buton event listener'ları - Passive true ekle
  if (prevButton) prevButton.addEventListener('click', prevSlide, { passive: true });
  if (nextButton) nextButton.addEventListener('click', nextSlide, { passive: true });
  
  // Otomatik oynatmayı başlat
  startAutoplay();
  
  // Dokunma kontrolü için
  let touchStartX = 0;
  let touchEndX = 0;
  
  // Dokunma başlangıcı
  carouselTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    if (!isModalOpen) {
      clearInterval(autoplayInterval); // Dokunduğunda otomatik oynatmayı durdur
    }
  }, { passive: true });
  
  // Dokunma bitişi
  carouselTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    if (!isModalOpen) {
      startAutoplay(); // Dokunma bittikten sonra otomatik oynatmayı başlat
    }
  }, { passive: true });
  
  // Kaydırma işlemini ele al
  function handleSwipe() {
    if (isAnimating) return;
    
    const difference = touchStartX - touchEndX;
    const threshold = 50; // Minimum kaydırma mesafesi
    
    if (difference > threshold) {
      nextSlide(); // Sola kaydırma
    } else if (difference < -threshold) {
      prevSlide(); // Sağa kaydırma
    }
  }
  
  // Carousel üzerine gelince otomatik oynatmayı durdur
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
      if (!isModalOpen) {
        clearInterval(autoplayInterval);
      }
    }, { passive: true });
    
    // Carousel'den çıkınca otomatik oynatmayı devam ettir
    carouselContainer.addEventListener('mouseleave', () => {
      if (!isModalOpen) {
        startAutoplay();
      }
    }, { passive: true });
  }
  
  // İlk slide'ı göster
  updateCarousel();
  
  // Modal açma fonksiyonu
  window.openModal = function(imageSrc, imageAlt, imageNote) {
    // Modal durumunu güncelle
    isModalOpen = true;
    
    // Otomatik oynatmayı durdur
    if (window.stopCarouselAutoplay) {
      window.stopCarouselAutoplay();
    }
    
    const modal = document.getElementById('imageModal');
    const modalImage = modal.querySelector('.modal-image');
    const modalTitle = modal.querySelector('#modal-title');
    const modalContent = modal.querySelector('.modal-content');
    
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt || 'Proje Görseli';
    
    // SEO için title güncelle
    if (modalTitle) {
      modalTitle.textContent = imageAlt || 'Proje Görseli Büyütülmüş Görünüm';
    }
    
    // Eski modal notunu temizle
    const existingNote = modalContent.querySelector('.modal-image-note');
    if (existingNote) {
      existingNote.remove();
    }
    
    // Yeni modal notu ekle
    if (imageNote) {
      const modalNoteElement = document.createElement('div');
      modalNoteElement.className = 'modal-image-note';
      modalNoteElement.textContent = imageNote;
      modalContent.appendChild(modalNoteElement);
    }
    
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    
    // Body scroll'unu engelle
    document.body.style.overflow = 'hidden';
    
    // Focus yönetimi - erişilebilirlik için
    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) {
      closeButton.focus();
    }
    
    // Google Analytics event (eğer varsa)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'image_view', {
        event_category: 'Gallery',
        event_label: imageAlt || 'Proje Görseli',
        value: 1
      });
    }
  };
  
  // Modal kapama fonksiyonu
  window.closeModal = function() {
    const modal = document.getElementById('imageModal');
    const modalImage = modal.querySelector('.modal-image');
    const modalContent = modal.querySelector('.modal-content');
    
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    
    // Body scroll'unu tekrar etkinleştir
    document.body.style.overflow = 'auto';
    
    // Modal durumunu güncelle
    isModalOpen = false;
    
    // Görsel kaynağını ve notları temizle - performans için
    setTimeout(() => {
      if (modalImage) {
        modalImage.src = '';
        modalImage.alt = '';
      }
      
      // Modal notunu temizle
      const modalNote = modalContent.querySelector('.modal-image-note');
      if (modalNote) {
        modalNote.remove();
      }
    }, 300);
    
    // Otomatik oynatmayı tekrar başlat
    setTimeout(() => {
      if (window.startCarouselAutoplay) {
        window.startCarouselAutoplay();
      }
    }, 100);
    
    // Focus'u carousel'e geri döndür - erişilebilirlik için
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
      carousel.focus();
    }
  };
} 