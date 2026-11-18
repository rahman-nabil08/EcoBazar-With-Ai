/**
 * EcoBazar - Organic Grocery E-Commerce
 * Main Application JavaScript
 * Requires: jQuery 3.7.1, Bootstrap 5, Bootstrap Icons
 */

$(document).ready(function () {

    /* =========================================================
       0. INJECT TOAST & UTILITY CSS
    ========================================================= */
    $('head').append(`
        <style id="eco-dynamic-styles">
            /* Sticky Header */
            .header-scrolled {
                box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1) !important;
                transition: box-shadow 0.3s ease;
            }

            /* Toast Notification */
            .eco-toast {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #00b207;
                color: #fff;
                padding: 12px 24px;
                border-radius: 25px;
                font-size: 14px;
                font-weight: 500;
                opacity: 0;
                transform: translateY(0);
                transition: opacity 0.3s ease, transform 0.3s ease;
                z-index: 9999;
                pointer-events: none;
                box-shadow: 0 4px 15px rgba(0, 178, 7, 0.35);
            }
            .eco-toast.show {
                opacity: 1;
                transform: translateY(-10px);
            }

            /* Cart Badge Bounce */
            @keyframes cartBounce {
                0%   { transform: scale(1); }
                40%  { transform: scale(1.4); }
                70%  { transform: scale(0.9); }
                100% { transform: scale(1); }
            }
            .cart-count.bounce {
                animation: cartBounce 0.5s ease;
            }

            /* Wishlist wishlisted state */
            .btn-wishlist.wishlisted {
                background: #ea4b48 !important;
                border-color: #ea4b48 !important;
                color: #fff !important;
            }

            /* Hero dot active */
            .hero-dot.active {
                background: #00b207 !important;
                transform: scale(1.3);
            }

            /* Mobile hamburger active */
            .navbar-toggler.active .navbar-toggler-icon {
                filter: invert(1);
            }
        </style>
    `);


    /* =========================================================
       1. STICKY HEADER ON SCROLL
    ========================================================= */
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 100) {
            $('.header-main').addClass('header-scrolled');
        } else {
            $('.header-main').removeClass('header-scrolled');
        }
    });


    /* =========================================================
       2. HERO SLIDER (Manual Dots + Auto-Rotate)
    ========================================================= */
    var currentSlide = 0;

    var heroSlides = [
        {
            badge:   '100% Natural',
            title:   'Fresh & Healthy<br>Organic Food',
            text:    'Sale up to 30% OFF on all Organic products. Free delivery on all orders over $100.00',
            btnText: 'Shop Now',
            image:   './assets/images/Image.png'
        },
        {
            badge:   'Fresh Daily',
            title:   'Premium Quality<br>Fresh Vegetables',
            text:    'Get the freshest organic vegetables delivered to your doorstep every morning.',
            btnText: 'Explore Now',
            image:   './assets/images/Image (9).png'
        },
        {
            badge:   'Best Deal',
            title:   'Healthy Living<br>Starts Here',
            text:    'Discover our wide range of organic produce, carefully sourced from local farms.',
            btnText: 'Shop Now',
            image:   './assets/images/Image (1).png'
        }
    ];

    /**
     * goToSlide — fade out current content, swap data, fade back in.
     * @param {number} n  Slide index (0-based)
     */
    function goToSlide(n) {
        currentSlide = n;
        var slide = heroSlides[n];

        $('.hero-content-inner').fadeOut(200, function () {
            $('.hero-badge').text(slide.badge);
            $('.hero-title').html(slide.title);
            $('.hero-desc').text(slide.text);
            $('.btn-shop-now').text(slide.btnText);
            $('.hero-main-img').attr('src', slide.image);
            $(this).fadeIn(300);
        });

        // Update active dot
        $('.hero-dot').removeClass('active');
        $('.hero-dot[data-slide="' + n + '"]').addClass('active');
    }

    // Dot click handler
    $('.hero-dot').on('click', function () {
        goToSlide(parseInt($(this).data('slide'), 10));
    });

    // Auto-rotate every 5 seconds
    var sliderInterval = setInterval(function () {
        goToSlide((currentSlide + 1) % heroSlides.length);
    }, 5000);

    // Pause auto-rotate on manual dot interaction (resume after 8 s)
    $('.hero-dot').on('click', function () {
        clearInterval(sliderInterval);
        sliderInterval = setInterval(function () {
            goToSlide((currentSlide + 1) % heroSlides.length);
        }, 5000);
    });

    // Initialise first slide dot as active
    $('.hero-dot[data-slide="0"]').addClass('active');


    /* =========================================================
       3. PRODUCT TAB FILTERING
    ========================================================= */
    $('.tab-btn').on('click', function () {
        // Update active tab
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');

        var filter = $(this).data('filter');

        if (filter === 'all') {
            $('.product-item').fadeIn(300);
        } else {
            $('.product-item').each(function () {
                if ($(this).data('category') === filter) {
                    $(this).fadeIn(300);
                } else {
                    $(this).fadeOut(200);
                }
            });
        }
    });


    /* =========================================================
       4. COUNTDOWN TIMER (Deal of the Month — 30 days)
    ========================================================= */
    function startCountdown() {
        // Target = 30 days from right now
        var target = new Date();
        target.setDate(target.getDate() + 30);

        var timer = setInterval(function () {
            var now      = new Date().getTime();
            var distance = target - now;

            if (distance < 0) {
                clearInterval(timer);
                $('#cd-days, #countdown-days').text('00');
                $('#cd-hours, #countdown-hours').text('00');
                $('#cd-mins, #countdown-mins').text('00');
                $('#cd-secs, #countdown-secs').text('00');
                return;
            }

            var days  = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var mins  = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var secs  = Math.floor((distance % (1000 * 60)) / 1000);

            $('#cd-days, #countdown-days').text(String(days).padStart(2, '0'));
            $('#cd-hours, #countdown-hours').text(String(hours).padStart(2, '0'));
            $('#cd-mins, #countdown-mins').text(String(mins).padStart(2, '0'));
            $('#cd-secs, #countdown-secs').text(String(secs).padStart(2, '0'));
        }, 1000);
    }

    startCountdown();


    /* =========================================================
       5. TOAST NOTIFICATION UTILITY
    ========================================================= */
    /**
     * showToast — appends a temporary floating notification.
     * @param {string} message  Text to display
     */
    function showToast(message) {
        var toast = $('<div class="eco-toast"></div>').text(message);
        $('body').append(toast);

        // Trigger transition on next paint
        setTimeout(function () { toast.addClass('show'); }, 10);

        // Hide and remove after 2.5 s
        setTimeout(function () {
            toast.removeClass('show');
            setTimeout(function () { toast.remove(); }, 400);
        }, 2500);
    }


    /* =========================================================
       6. ADD TO CART
    ========================================================= */
    var cartCount = 0;

    $(document).on('click', '.btn-add-cart', function () {
        cartCount++;

        // Update badge with bounce animation
        $('.cart-count')
            .text(cartCount)
            .addClass('bounce');

        setTimeout(function () {
            $('.cart-count').removeClass('bounce');
        }, 500);

        showToast('Product added to cart!');
    });


    /* =========================================================
       7. WISHLIST TOGGLE
    ========================================================= */
    $(document).on('click', '.btn-wishlist', function () {
        $(this).toggleClass('wishlisted');
        var $icon = $(this).find('i');

        if ($(this).hasClass('wishlisted')) {
            $icon.removeClass('bi-heart').addClass('bi-heart-fill');
            $(this).css({ background: '#ea4b48', 'border-color': '#ea4b48', color: 'white' });
            showToast('Added to wishlist!');
        } else {
            $icon.removeClass('bi-heart-fill').addClass('bi-heart');
            $(this).css({ background: 'white', 'border-color': '#eee', color: '#666' });
        }
    });


    /* =========================================================
       8. NEWSLETTER FORM
    ========================================================= */
    $('#newsletter-form').on('submit', function (e) {
        e.preventDefault();
        var email = $('#newsletter-email').val().trim();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email && emailRegex.test(email)) {
            showToast('Successfully subscribed! Thank you.');
            $('#newsletter-email').val('');
        } else {
            showToast('Please enter a valid email address.');
        }
    });


    /* =========================================================
       9. SEARCH BAR FUNCTIONALITY
    ========================================================= */
    $('.search-btn').on('click', function () {
        var query = $('.search-input').val().trim();
        if (query) {
            showToast('Searching for: ' + query);
        } else {
            showToast('Please enter a search term.');
        }
    });

    $('.search-input').on('keypress', function (e) {
        if (e.which === 13) {
            $('.search-btn').trigger('click');
        }
    });


    /* =========================================================
       10. SMOOTH SCROLLING (Anchor links)
    ========================================================= */
    $('a[href^="#"]').on('click', function (e) {
        var hash   = this.hash;
        var target = $(hash);

        if (target.length) {
            e.preventDefault();
            $('html, body').animate(
                { scrollTop: target.offset().top - 80 },
                600,
                'swing'
            );
        }
    });


    /* =========================================================
       11. MOBILE MENU TOGGLE (hamburger active class)
    ========================================================= */
    $('.navbar-toggler').on('click', function () {
        $(this).toggleClass('active');
    });


    /* =========================================================
       12. PRODUCT QUICK VIEW (Bootstrap Modal)
    ========================================================= */
    $(document).on('click', '.btn-quickview', function () {
        var $card = $(this).closest('.product-card');

        var productName  = $card.find('.product-name').text();
        var productPrice = $card.find('.price-sale').text();
        var productImg   = $card.find('img').attr('src');

        // Populate modal fields
        $('#quickViewModal .modal-product-name').text(productName);
        $('#quickViewModal .modal-product-price').text(productPrice);
        $('#quickViewModal .modal-product-img').attr('src', productImg);

        // Show Bootstrap 5 modal
        var modalEl = document.getElementById('quickViewModal');
        if (modalEl) {
            var bsModal = new bootstrap.Modal(modalEl);
            bsModal.show();
        }
    });


    /* =========================================================
       END OF DOCUMENT READY
    ========================================================= */

}); // end $(document).ready
