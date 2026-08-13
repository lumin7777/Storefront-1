document.addEventListener("DOMContentLoaded", () => {

    // =================================
    // ELEMENTS
    // =================================

    const bagButton = document.querySelector(".bag-button");
    const bagPanel = document.querySelector(".bag-panel");
    const bagOverlay = document.querySelector(".bag-overlay");
    const closeBag = document.querySelector(".close-bag");

    const bagItemsContainer = document.querySelector(".bag-items");
    const bagTotal = document.querySelector(".bag-total strong");

    const products = document.querySelectorAll(".product-card");


    // =================================
    // SHOPPING BAG
    // =================================

    let bag = [];


    // =================================
    // OPEN / CLOSE BAG
    // =================================

    function openBag() {
        bagPanel.classList.add("open");
        bagOverlay.classList.add("open");
        document.body.classList.add("bag-open");
    }

    function closeShoppingBag() {
        bagPanel.classList.remove("open");
        bagOverlay.classList.remove("open");
        document.body.classList.remove("bag-open");
    }

    bagButton.addEventListener("click", openBag);

    closeBag.addEventListener("click", closeShoppingBag);

    bagOverlay.addEventListener("click", closeShoppingBag);


    // =================================
    // ADD PRODUCTS
    // =================================

    products.forEach(product => {

        product.addEventListener("click", () => {

            const name = product.querySelector("h3").textContent;

            const price = parseFloat(
                product
                    .querySelector(".price")
                    .textContent
                    .replace("$", "")
            );

            const existingItem = bag.find(
                item => item.name === name
            );

            if (existingItem) {

                existingItem.quantity++;

            } else {

                bag.push({
                    name: name,
                    price: price,
                    quantity: 1
                });

            }

            updateBag();

        });

    });


    // =================================
    // UPDATE BAG
    // =================================

    function updateBag() {

        bagItemsContainer.innerHTML = "";


        // Empty bag

        if (bag.length === 0) {

            bagItemsContainer.innerHTML = `
                <p class="empty-bag">
                    Your bag is feeling a little empty 🌿
                </p>
            `;

        }


        // Items

        else {

            bag.forEach((item, index) => {

                const bagItem = document.createElement("div");

                bagItem.classList.add("bag-item");

                bagItem.innerHTML = `

                    <div class="bag-item-details">

                        <h3>${item.name}</h3>

                        <span class="bag-item-price">
                            $${(item.price * item.quantity).toFixed(2)}
                        </span>

                        <div class="quantity-controls">

                            <button
                                class="decrease"
                                data-index="${index}">
                                −
                            </button>

                            <span>${item.quantity}</span>

                            <button
                                class="increase"
                                data-index="${index}">
                                +
                            </button>

                        </div>

                    </div>

                `;

                bagItemsContainer.appendChild(bagItem);

            });

        }


        // =================================
        // TOTAL
        // =================================

        const total = bag.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );

        bagTotal.textContent = `$${total.toFixed(2)}`;


        // =================================
        // BAG COUNT
        // =================================

        const itemCount = bag.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );

        bagButton.innerHTML =
            `🛍 <span>Bag (${itemCount})</span>`;


        // =================================
        // INCREASE QUANTITY
        // =================================

        document
            .querySelectorAll(".increase")
            .forEach(button => {

                button.addEventListener("click", event => {

                    event.stopPropagation();

                    const index = button.dataset.index;

                    bag[index].quantity++;

                    updateBag();

                });

            });


        // =================================
        // DECREASE QUANTITY
        // =================================

        document
            .querySelectorAll(".decrease")
            .forEach(button => {

                button.addEventListener("click", event => {

                    event.stopPropagation();

                    const index = button.dataset.index;

                    bag[index].quantity--;

                    if (bag[index].quantity <= 0) {
                        bag.splice(index, 1);
                    }

                    updateBag();

                });

            });

    }


    // =================================
    // NEWSLETTER
    // =================================

    const newsletterButton =
        document.querySelector(".newsletter-button");

    newsletterButton.addEventListener("click", () => {

        newsletterButton.textContent =
            "You're on the list! ✿";

        newsletterButton.style.background = "#52684f";
        newsletterButton.style.color = "#fffdf7";

    });


    // =================================
    // HERO FADE-IN
    // =================================

    const heroContent =
        document.querySelector(".hero-content");

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

        product.style.transform =
            "translateY(25px)";

        product.style.transition =
            `opacity 0.7s ease ${index * 0.15}s,
             transform 0.7s ease ${index * 0.15}s`;

        observer.observe(product);

    });

});
