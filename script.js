document.addEventListener("DOMContentLoaded", () => {

    // =================================
    // SMOOTH SCROLLING
    // =================================

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // =================================
    // SHOPPING BAG
    // =================================

    const bagButton = document.querySelector(".bag-button");

    let bagCount = 0;

    document.querySelectorAll(".product-card").forEach(product => {

        product.addEventListener("click", () => {

            bagCount++;

            bagButton.innerHTML = `🛍 <span>Bag (${bagCount})</span>`;

            // Little visual feedback
            product.style.transform = "translateY(-5px)";

            setTimeout(() => {
                product.style.transform = "";
            }, 250);

        });

    });


    // =================================
    // NEWSLETTER BUTTON
    // =================================

    const newsletterButton = document.querySelector(".newsletter-button");

    newsletterButton.addEventListener("click", () => {

        newsletterButton.textContent = "You're on the list! ✿";

        newsletterButton.style.background = "#52684f";
        newsletterButton.style.color = "#fffdf7";

    });


    // =================================
    // HERO FADE-IN
    // =================================

    const heroContent = document.querySelector(".hero-content");

    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateY(20px)";

    setTimeout(() => {

        heroContent.style.transition =
            "opacity 1s ease, transform 1s ease";

        heroContent.style.opacity = "1";
        heroContent.style.transform = "translateY(0)";

    }, 150);


    // =================================
    // PRODUCT REVEAL
    // =================================

    const products = document.querySelectorAll(".product-card");

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    products.forEach((product, index) => {

        product.style.opacity = "0";
        product.style.transform = "translateY(25px)";

        product.style.transition =
            `opacity 0.7s ease ${index * 0.15}s,
             transform 0.7s ease ${index * 0.15}s`;

        observer.observe(product);

    });

});
