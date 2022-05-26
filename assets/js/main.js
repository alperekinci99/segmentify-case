class UI {
    static alerts(type, icon, message) {
        const alertDiv = document.querySelector(".alert");
        alertDiv.innerHTML += `
        <div class="alert-content">
            <div class="alert-info">
                <div class="info-icon">
                    <span class="${type}">
                        <i class="fas fa-${icon}"></i>
                    </span>
                </div>
                <div class="info-text">
                    <div class="text-desc">${message}</div>
                    <a href="#">Sepete Git</a>
                </div>
            </div>
            <div class="alert-close">
                <i class="fas fa-times"></i>
            </div>
        </div>

        `
        alertDiv.classList.add("active");
        const alert = document.querySelectorAll(".alert .alert-content");
        const close = document.querySelectorAll(".alert-close");
        const link = document.querySelectorAll(".alert-content .info-text a");
        for(let a=0;a<link.length;a++){
            link[a].addEventListener("click",preventLink);
        }
        for (let i = 0; i < alert.length; i++) {
            setTimeout(() => {
                alert[i].remove();
            }, 3500);
            for (let j=0; j<close.length; j++){
                closeModal(alert[i], close[j], alertDiv);
            }
        }
    }
}

// Sepete git linkine tıklayınca sayfanın değişmemesi
function preventLink(e){
    e.preventDefault();
}

// Açılan "ürün sepete eklendi" bilgisi penceresinin tıklayınca kapanması
function closeModal(div, icon, alert) {
    icon.addEventListener("click", function () {
        div.remove();
        alert.classList.remove("active");
    })
}

const product_swiper = new Swiper(".product_swiper", {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    loopFillGroupWithBlank: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
    },
});


/**************/
function getLists(categories) {
    const links = document.querySelector(".content-side .side-links");
    categories.forEach(function (el) {
        links.innerHTML += `
            <li data-tab='${el}'><span>${el}</span></li>
            `
    });
    const side = document.querySelectorAll(".content-side .side-links li");
    getSides(side);
    getElements(side);

}

/**************/
document.addEventListener("DOMContentLoaded", getElements);

function getElements(el) {
    for (let i = 0; i < 1; i++) {
        el[i].classList.add("active");
    }
}


/**************/
function getSides(side) {
    [].forEach.call(side, function (el, i, side) {
        el.addEventListener('click', function (e) {
            [].forEach.call(side, function (el) {
                if (el !== this) {
                    el.removeAttribute("class");
                } else {
                    el.classList.add("active");
                }
            }, this);
            getProd(e.target.parentElement.dataset.tab, "");
        });
    });
}



/****************/
function alertify(addCart) {
    for (let i = 0; i < addCart.length; i++) {
        addCart[i].addEventListener("click", function () {
            UI.alerts("success", "check", "Ürün sepete eklendi.")
        })
    };
}


/*******************/
function getProd(key, product) {
    const items = document.querySelector(".content-items .heades .swiper.product_swiper .swiper-wrapper");
    const div = document.querySelector(".content-items .heades");
    div.dataset.id = key;
    items.innerHTML += `

        <div class="swiper-slide">
            <div class="item" data-cart="no">
                <div class="item-img">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="item-head">
                    <a href="${product.url}" target="_blank">
                        ${product.name}
                    </a>
                </div>
                <div class="item-price">
                    <span>${product.price} TL</span>
                </div>
                ${[product.params.shippingFee === "FREE" ? `<div class="item-info"><i class="fas fa-truck"></i>&nbsp;<span>Ücretsiz Kargo</span></div>` : ""]}
                <div class="item-action">
                    <span>Sepete Ekle</span>
                </div>
            </div>
        </div>
        `
    const addCart = document.querySelectorAll(".item-action");
    alertify(addCart);
}