
document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =====================================================
       HELPERS
       ===================================================== */

    const body = document.body;

    const header = document.querySelector("header");

    const menuToggle =
        document.querySelector(".menuToggle") ||
        document.querySelector("#menuBtn") ||
        document.querySelector(".menu-btn");

    const nav =
        document.querySelector("nav") ||
        document.querySelector(".navbar") ||
        document.querySelector(".nav-links") ||
        document.querySelector(".navigation");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =====================================================
       MOBILE MENU
       ===================================================== */

   function openMenu() {
    if (!header) return;

    header.classList.add("active");

    if (nav) {
        const navList = nav.querySelector("ul");

        if (navList) {
            navList.classList.add("active");
        }
    }

    if (menuToggle) {
        menuToggle.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");
    }

    body.classList.add("menu-open");
}


function closeMenu() {
    if (!header) return;

    header.classList.remove("active");

    if (nav) {
        const navList = nav.querySelector("ul");

        if (navList) {
            navList.classList.remove("active");
        }
    }

    if (menuToggle) {
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    }

    body.classList.remove("menu-open");
}

    function toggleMenu() {
        if (!header) return;

        const isOpen = header.classList.contains("active");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }


    if (menuToggle) {

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", (event) => {
            event.preventDefault();
            toggleMenu();
        });
    }


    /* =====================================================
       CLOSE MOBILE MENU WHEN CLICKING NAV LINK
       ===================================================== */

    const navigationLinks = document.querySelectorAll(
        "nav a, .navbar a, .nav-links a, .navigation a"
    );

    navigationLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (window.innerWidth <= 900) {
                closeMenu();
            }

        });

    });


    /* =====================================================
       CLOSE MENU WITH ESCAPE
       ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
       ===================================================== */

    document.addEventListener("click", (event) => {

        if (!header || !menuToggle) return;

        if (window.innerWidth > 900) return;

        const clickedInsideHeader = header.contains(event.target);

        if (!clickedInsideHeader) {
            closeMenu();
        }

    });


    /* =====================================================
       HANDLE WINDOW RESIZE
       ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {
            closeMenu();
        }

    });


    /* =====================================================
       STICKY HEADER
       ===================================================== */

    function handleStickyHeader() {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }


    handleStickyHeader();

    window.addEventListener(
        "scroll",
        handleStickyHeader,
        { passive: true }
    );


    /* =====================================================
       SMOOTH ANCHOR SCROLL
       ===================================================== */

    const anchorLinks = document.querySelectorAll(
        'a[href^="#"]:not([href="#"])'
    );

    anchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId) return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: prefersReducedMotion
                    ? "auto"
                    : "smooth"
            });

        });

    });


    /* =====================================================
       SCROLL REVEAL ANIMATION
       ===================================================== */

    const revealElements = document.querySelectorAll(
        [
            ".services-heading",
            ".ser-box",
            ".ser-box .box",
            ".DiscountSection",
            ".imgslidertext",
            ".slideText",
            ".textinfo",
            ".bridal-cta",
            ".services-cta",
            ".gallery-item",
            ".before-after-card",
            ".portfolio-cta",
            ".contact-info-card",
            ".contact-form",
            ".map-container",
            ".stats-strip",
            ".process-step",
            ".showcase-copy",
            ".showcase-gallery",
            ".testimonial-card"
        ].join(",")
    );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

    });


    if (!prefersReducedMotion && "IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add(
                        "reveal-visible"
                    );

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("reveal-visible");

        });

    }


    /* =====================================================
       STAGGER CARD ANIMATION
       ===================================================== */

    const cardGroups = [
        ".ser-box",
        ".ser-box .box",
        ".gallery",
        ".portfolio-gallery",
        ".contact-info",
        ".before-after",
        ".bridal-grid"
    ];


    cardGroups.forEach((selector) => {

        const cards = document.querySelectorAll(
            `${selector} > *`
        );

        cards.forEach((card, index) => {

            card.style.setProperty(
                "--animation-delay",
                `${index * 90}ms`
            );

            card.classList.add("stagger-item");

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION LINK
       ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase() || "index.html";


    navigationLinks.forEach((link) => {

        const href = link.getAttribute("href");

        if (!href) return;

        if (
            href.startsWith("#") ||
            href.startsWith("tel:") ||
            href.startsWith("mailto:")
        ) {
            return;
        }

        const linkPage =
            href.split("/")
                .pop()
                .split("?")[0]
                .split("#")[0]
                .toLowerCase();

        if (
            linkPage === currentPage ||
            (currentPage === "" && linkPage === "index.html")
        ) {
            link.classList.add("active");
        }

    });


    /* =====================================================
       LAZY LOAD IMAGES
       ===================================================== */

    const images = document.querySelectorAll("img");

    images.forEach((image) => {

        if (!image.hasAttribute("loading")) {
            image.setAttribute("loading", "lazy");
        }

        if (!image.hasAttribute("decoding")) {
            image.setAttribute("decoding", "async");
        }

    });


    /* =====================================================
       IMAGE AND BACKGROUND PARALLAX
       ===================================================== */

    if (!prefersReducedMotion) {
        const parallaxImages = Array.from(images);
        const parallaxBackgrounds = Array.from(
            document.querySelectorAll(".hero, .sectionFirst")
        );
        let parallaxFrame = null;

        function updateImageParallax() {
            parallaxFrame = null;

            const viewportCenter = window.innerHeight / 2;

            parallaxImages.forEach((image) => {
                const imageRect = image.getBoundingClientRect();

                if (
                    imageRect.bottom < -imageRect.height ||
                    imageRect.top > window.innerHeight + imageRect.height
                ) {
                    return;
                }

                const imageCenter =
                    imageRect.top + imageRect.height / 2;
                const offset = (viewportCenter - imageCenter) * 0.08;

                image.style.setProperty(
                    "--parallax-y",
                    `${Math.max(-24, Math.min(24, offset))}px`
                );
            });

            parallaxBackgrounds.forEach((section) => {
                const sectionRect = section.getBoundingClientRect();

                if (
                    sectionRect.bottom < -sectionRect.height ||
                    sectionRect.top > window.innerHeight + sectionRect.height
                ) {
                    return;
                }

                const sectionCenter =
                    sectionRect.top + sectionRect.height / 2;
                const offset =
                    (viewportCenter - sectionCenter) * 0.06;

                section.style.setProperty(
                    "--background-parallax-y",
                    `${Math.max(-18, Math.min(18, offset))}px`
                );
            });
        }

        function requestImageParallaxUpdate() {
            if (parallaxFrame !== null) return;

            parallaxFrame = window.requestAnimationFrame(
                updateImageParallax
            );
        }

        parallaxImages.forEach((image) => {
            image.classList.add("parallax-image");
        });

        parallaxBackgrounds.forEach((section) => {
            section.classList.add("parallax-background");
        });

        requestImageParallaxUpdate();

        window.addEventListener(
            "scroll",
            requestImageParallaxUpdate,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            requestImageParallaxUpdate,
            { passive: true }
        );
    }


    /* =====================================================
       IMAGE ERROR HANDLING
       ===================================================== */

    images.forEach((image) => {

        image.addEventListener("error", () => {

            image.classList.add("image-error");

            image.setAttribute(
                "aria-label",
                "Image unavailable"
            );

        });

    });


    /* =====================================================
       SERVICES / PORTFOLIO SLIDER
       ===================================================== */

    const slider = document.querySelector(
        ".imgslider"
    );

    const slides = document.querySelectorAll(
        ".imgslider .slide"
    );

    const previousButton = document.querySelector(
        ".prev"
    );

    const nextButton = document.querySelector(
        ".next"
    );


    let counter = 0;
    let sliderInterval = null;


    function showSlide(index) {

        if (!slides.length) return;

        if (index >= slides.length) {
            counter = 0;
        }

        if (index < 0) {
            counter = slides.length - 1;
        }


        slides.forEach((slide, slideIndex) => {

            slide.classList.remove("active");

            slide.setAttribute(
                "aria-hidden",
                slideIndex === counter
                    ? "false"
                    : "true"
            );


            slide.style.transform =
                `translateX(-${counter * 100}%)`;

        });


        slides[counter].classList.add("active");

    }


    function goPrev() {

        if (!slides.length) return;

        counter--;

        showSlide(counter);

        restartSlider();

    }


    function goNext() {

        if (!slides.length) return;

        counter++;

        showSlide(counter);

        restartSlider();

    }


    /* =====================================================
       INITIALIZE SLIDER
       ===================================================== */

    if (slides.length) {

        slides.forEach((slide, index) => {

            slide.style.left = `${index * 100}%`;

        });


        showSlide(0);

    }


    /* =====================================================
       PREVIOUS / NEXT BUTTONS
       ===================================================== */

    if (previousButton) {

        previousButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                goPrev();

            }
        );

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                goNext();

            }
        );

    }


    /* =====================================================
       AUTOMATIC SLIDER
       ===================================================== */

    function startSlider() {

        if (
            slides.length <= 1 ||
            prefersReducedMotion
        ) {
            return;
        }


        stopSlider();


        sliderInterval = setInterval(() => {

            counter++;

            showSlide(counter);

        }, 5000);

    }


    function stopSlider() {

        if (sliderInterval) {

            clearInterval(sliderInterval);

            sliderInterval = null;

        }

    }


    function restartSlider() {

        if (
            slides.length <= 1 ||
            prefersReducedMotion
        ) {
            return;
        }

        startSlider();

    }


    if (slider) {

        slider.addEventListener(
            "mouseenter",
            stopSlider
        );

        slider.addEventListener(
            "mouseleave",
            startSlider
        );

        slider.addEventListener(
            "focusin",
            stopSlider
        );

        slider.addEventListener(
            "focusout",
            startSlider
        );

    }


    startSlider();


    /* =====================================================
       KEYBOARD SLIDER CONTROLS
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (!slides.length) return;

            const activeElement =
                document.activeElement;

            const isTyping =
                activeElement &&
                (
                    activeElement.tagName === "INPUT" ||
                    activeElement.tagName === "TEXTAREA" ||
                    activeElement.tagName === "SELECT"
                );

            if (isTyping) return;


            if (event.key === "ArrowLeft") {

                goPrev();

            }


            if (event.key === "ArrowRight") {

                goNext();

            }

        }
    );


    /* =====================================================
       GLOBAL SLIDER FUNCTIONS
       Supports old HTML such as:

       onclick="goPrev()"
       onclick="goNext()"
       ===================================================== */

    window.goPrev = goPrev;
    window.goNext = goNext;


    /* =====================================================
       BUTTON PRESS FEEDBACK
       ===================================================== */

    const buttons = document.querySelectorAll(
        "button, .btn, .button, .cta-button, .service-link"
    );


    buttons.forEach((button) => {

        button.addEventListener(
            "mousedown",
            () => {

                button.classList.add("button-pressed");

            }
        );


        button.addEventListener(
            "mouseup",
            () => {

                button.classList.remove(
                    "button-pressed"
                );

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.classList.remove(
                    "button-pressed"
                );

            }
        );

    });


    /* =====================================================
       BACK TO TOP BUTTON
       ===================================================== */

    let backToTop =
        document.querySelector("#backToTop") ||
        document.querySelector(".back-to-top");


    if (!backToTop) {

        backToTop = document.createElement("button");

        backToTop.type = "button";

        backToTop.id = "backToTop";

        backToTop.className = "back-to-top";

        backToTop.setAttribute(
            "aria-label",
            "Back to top"
        );

        backToTop.innerHTML = "↑";

        body.appendChild(backToTop);

    }


    function updateBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }


    updateBackToTop();


    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion
                    ? "auto"
                    : "smooth"
            });

        }
    );


    /* =====================================================
       CONTACT FORM
       ===================================================== */

    const contactForm =
        document.querySelector(
            ".contact-form form"
        ) ||
        document.querySelector(
            "form.contact-form"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                const submitButton =
                    contactForm.querySelector(
                        'button[type="submit"], input[type="submit"]'
                    );


                if (submitButton) {

                    submitButton.classList.add(
                        "is-submitting"
                    );

                    submitButton.setAttribute(
                        "aria-busy",
                        "true"
                    );

                }

            }
        );

    }


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "#currentYear, .current-year"
        );


    yearElements.forEach((element) => {

        element.textContent =
            new Date().getFullYear();

    });




   


   
    /* Run decorative wave */

    // addDecorativeWaveStyles();

    // addDecorativeWave();


    /* =====================================================
       ADD SMALL INTERACTION STYLES
       ===================================================== */

    if (
        !document.getElementById(
            "js-small-interaction-styles"
        )
    ) {

        const interactionStyle =
            document.createElement("style");


        interactionStyle.id =
            "js-small-interaction-styles";


        interactionStyle.textContent = `

            /* =========================================
               SCROLL REVEAL
               ========================================= */

            .reveal {

                opacity: 0;

                transform:
                    translateY(35px);

                transition:
                    opacity .75s ease,
                    transform .75s ease;

            }


            .reveal-visible {

                opacity: 1;

                transform:
                    translateY(0);

            }


            /* =========================================
               STAGGER ITEMS
               ========================================= */

            .stagger-item {

                animation:
                    staggerUp
                    .7s
                    ease
                    both;

                animation-delay:
                    var(--animation-delay, 0ms);

            }


            @keyframes staggerUp {

                from {

                    opacity: 0;

                    transform:
                        translateY(30px);

                }

                to {

                    opacity: 1;

                    transform:
                        translateY(0);

                }

            }


            /* =========================================
               BUTTON PRESS
               ========================================= */

            .button-pressed {

                transform:
                    scale(.97);

            }


            /* =========================================
               BACK TO TOP
               ========================================= */

            .back-to-top {

                position: fixed;

                right: 22px;
                bottom: 22px;

                width: 45px;
                height: 45px;

                border: none;

                border-radius: 50%;

                cursor: pointer;

                opacity: 0;

                visibility: hidden;

                transform:
                    translateY(15px);

                transition:
                    opacity .3s ease,
                    visibility .3s ease,
                    transform .3s ease;

                z-index: 9999;

            }


            .back-to-top.show {

                opacity: 1;

                visibility: visible;

                transform:
                    translateY(0);

            }


            /* =========================================
               FORM SUBMITTING
               ========================================= */

            .is-submitting {

                opacity: .7;

                pointer-events: none;

            }


            /* =========================================
               MENU BODY LOCK
               ========================================= */

            body.menu-open {

                overflow: hidden;

            }


            /* =========================================
               IMAGE ERROR
               ========================================= */

            .image-error {

                object-fit: contain;

            }


            /* =========================================
               SLIDER
               ========================================= */

            .imgslider {

                position: relative;

                overflow: hidden;

            }


            .imgslider .slide {

                position: absolute;

                top: 0;

                width: 100%;
                height: 100%;

                transition:
                    opacity .6s ease,
                    transform .6s ease;

            }


            .imgslider .slide.active {

                opacity: 1;

            }


            .imgslider .slide[aria-hidden="true"] {

                pointer-events: none;

            }


            /* =========================================
               REDUCED MOTION
               ========================================= */

            @media (prefers-reduced-motion: reduce) {

                .reveal,
                .reveal-visible {

                    opacity: 1;

                    transform: none;

                    transition: none;

                }


                .stagger-item {

                    animation: none;

                }


                .imgslider .slide {

                    transition: none;

                }

            }

        `;


        document.head.appendChild(
            interactionStyle
        );

    }


    /* =====================================================
       FINAL INITIALIZATION
       ===================================================== */

    handleStickyHeader();

    updateBackToTop();


    console.log(
        "PK Beauty Salon website JavaScript loaded successfully."
    );

});