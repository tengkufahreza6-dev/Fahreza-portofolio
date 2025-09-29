document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const modeToggle = document.getElementById('mode-toggle');
    const icon = modeToggle ? modeToggle.querySelector('i') : null;

    // ==========================================================
    // 1. LOGIKA DARK MODE (dengan fitur Persistence/Penyimpanan)
    // ==========================================================
    if (modeToggle) {
        // Cek preferensi dari localStorage atau preferensi sistem
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const currentTheme = localStorage.getItem('theme');

        // Terapkan tema yang disimpan, atau default ke preferensi sistem
        if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme)) {
            body.classList.add('dark-mode');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        } else {
            // Pastikan ikon awal benar jika tema adalah light
            if (icon) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }

        modeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            // Simpan preferensi ke localStorage
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                if (icon) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                }
            } else {
                localStorage.setItem('theme', 'light');
                if (icon) {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
        });
    }

    // ==========================================================
    // 2. EFEK PARALLAX PADA GAMBAR PROFIL
    // ==========================================================
    const profilePicture = document.getElementById('profile-picture');
    if (profilePicture) {
        window.addEventListener('scroll', () => {
            // Efek parallax dibuat lebih ringan (0.2x)
            const scrolled = window.pageYOffset;
            profilePicture.style.transform = `translateY(${scrolled * 0.2}px)`;
        });
    }

    // ==========================================================
    // 3. LOGIKA UNTUK TOMBOL BERBAGI (SHARE)
    // ==========================================================
    const shareButtons = document.querySelectorAll('.share-button');
    shareButtons.forEach(button => {
        button.addEventListener('click', () => {
            const platform = button.getAttribute('data-platform');
            // Menggunakan window.location.origin + window.location.pathname untuk URL yang lebih stabil
            const url = encodeURIComponent(window.location.origin + window.location.pathname); 
            const title = encodeURIComponent(document.title);
            let shareUrl = '';

            if (platform === 'twitter') {
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}%20- Portofolio%20T.Fahreza`;
            } else if (platform === 'whatsapp') {
                // Menggunakan teks deskriptif untuk WhatsApp
                shareUrl = `https://api.whatsapp.com/send?text=${title}%20-%20Portofolio%20T.Fahreza.%20Lihat%20di%20sini:%20${url}`;
            } else if (platform === 'facebook') {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            } else if (platform === 'email') {
                shareUrl = `mailto:?subject=Lihat Portofolio%20T.Fahreza&body=Halo,%20silakan%20cek%20portofolio%20online%20saya%20di%20sini:%20${url}`;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank');
            }
        });
    });

    // ==========================================================
    // 4. LOGIKA EFEK KETIK PADA JUDUL
    // ==========================================================
    const typedTextSpan = document.getElementById('typing-text');
    const textToType = "T.Fahreza";
    let charIndex = 0;

    function type() {
        if (!typedTextSpan) return;
        if (charIndex < textToType.length) {
            typedTextSpan.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, 150);
        }
    }
    type();

    // ==========================================================
    // 5. LOGIKA ANIMASI SAAT SCROLL (Intersection Observer)
    // ==========================================================
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // ==========================================================
    // 6. LOGIKA UNTUK SEMUA BAGIAN YANG DAPAT DILIPAT (COLLAPSIBLE)
    // ==========================================================
    const collapsibleSections = document.querySelectorAll('.collapsible-group');

    collapsibleSections.forEach(section => {
        const articles = section.querySelectorAll('article');
        articles.forEach(article => {
            const header = article.querySelector('h3');
            if (header) {
                header.addEventListener('click', () => {
                    article.classList.toggle('active');
                });
            }
        });
    });
});