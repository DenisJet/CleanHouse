// menu-nav

const header = document.querySelector(".header");
const mainNav = header.querySelector(".main-nav");
const toggleButton = header.querySelector(".header__toggle-button");

mainNav.classList.remove("main-nav--nojs");
toggleButton.classList.remove("header__toggle-button--nojs");

const setNavOpened = () => {
  mainNav.classList.remove("main-nav--closed");
  mainNav.classList.add("main-nav--opened");
  toggleButton.classList.remove("header__toggle-button--closed");
  toggleButton.classList.add("header__toggle-button--opened");
  document.addEventListener("click", windowClickHandler);
  mainNav.addEventListener("click", navClickHandler);
};

const setNavClosed = () => {
  mainNav.classList.add("main-nav--closed");
  mainNav.classList.remove("main-nav--opened");
  toggleButton.classList.remove("header__toggle-button--opened");
  toggleButton.classList.add("header__toggle-button--closed");
  document.removeEventListener("click", windowClickHandler);
  mainNav.removeEventListener("click", navClickHandler);
};

const windowClickHandler = (evt) => {
  if (!evt.composedPath().includes(header)) {
    setNavClosed();
  }
};

const navClickHandler = (evt) => {
  if (evt.composedPath().includes(mainNav)) {
    setNavClosed();
  }
};

toggleButton.addEventListener("click", function () {
  if (mainNav.classList.contains("main-nav--closed")) {
    setNavOpened();
  } else {
    setNavClosed();
  }
});

// popup form

if (window.location.href !== "https://cleanhouse-ses.ru/thanks.html") {
  const popup = document.querySelector(".pop-up");
  const popupContainer = popup.querySelector(".pop-up__container");
  const popupForm = popup.querySelector(".pop-up__form");
  const closeButton = popup.querySelector(".pop-up__close");

  const escKeyHandler = (evt) => {
    if (evt.key === "Escape" || evt.key === "Esc") {
      closePopup();
    }
  };

  const clickHandler = (evt) => {
    if (!evt.composedPath().includes(popupContainer)) {
      closePopup();
    }
  };

  const closeButtonHandler = () => {
    closePopup();
  };

  const openPopup = () => {
    popupForm.reset();
    popup.classList.add("pop-up--active");
    document.addEventListener("keydown", escKeyHandler);
    popup.addEventListener("click", clickHandler);
    closeButton.addEventListener("click", closeButtonHandler);
  };

  const closePopup = () => {
    popup.classList.remove("pop-up--active");
    document.removeEventListener("keydown", escKeyHandler);
    popup.removeEventListener("click", clickHandler);
    closeButton.removeEventListener("click", closeButtonHandler);
  };

  document.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("button") ||
      evt.target.classList.contains("filials__item")
    ) {
      openPopup();
    }
  });
}

// telegram chat

const TOKEN = "6255542939:AAHERS28Vi18xML8uUg2v1GnJC9OKph6zwg";
const CHAT_ID = "-1001650046621";
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

const formHandler = (formId) => {
  document.getElementById(formId).addEventListener("submit", function (evt) {
    evt.preventDefault();

    let message = `<b>Заявка с сайта CleanHouse</b>\n`;
    message += `<b>Номер телефона: ${this.number.value}\n </b>`;

    axios
      .post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: "html",
        text: message,
      })
      .then((response) => {
        this.number.value = "";
        window.location = "../../thanks.html";
      })
      .catch(() => {});
  });
};

if (document.getElementById("intro-form")) {
  formHandler("intro-form");
}

if (document.getElementById("intro-form")) {
  formHandler("questions-form");
}

formHandler("pop-up-form");

// sertificats slider

if (document.querySelector(".o-kompanii")) {
  const sertificats = document.querySelectorAll(".sertificats__item");
  const slider = document.querySelector(".slider-sertificats");
  const sliderContainer = slider.querySelector(
    ".slider-sertificats__container"
  );
  const slides = slider.querySelectorAll(".slider-sertificats__item");
  const sliderCloseButton = slider.querySelector(
    ".slider-sertificats__button--close"
  );
  const sliderButtonPrev = slider.querySelector(
    ".slider-sertificats__swiper-button--prev"
  );
  const sliderButtonNext = slider.querySelector(
    ".slider-sertificats__swiper-button--next"
  );

  const sliderEscKeyHandler = (evt) => {
    if (evt.key === "Escape" || evt.key === "Esc") {
      closeSlider();
    }
  };

  const sliderWindowClickHandler = (evt) => {
    if (
      !evt.composedPath().includes(sliderContainer) &&
      !evt.composedPath().includes(sliderButtonPrev) &&
      !evt.composedPath().includes(sliderButtonNext)
    ) {
      closeSlider();
    }
  };

  const sliderCloseButtonHandler = () => {
    closeSlider();
  };

  const openSlider = () => {
    slider.classList.add("slider-sertificats--active");
    document.addEventListener("keydown", sliderEscKeyHandler);
    slider.addEventListener("click", sliderWindowClickHandler);
    sliderCloseButton.addEventListener("click", sliderCloseButtonHandler);
  };

  const closeSlider = () => {
    slider.classList.remove("slider-sertificats--active");
    document.removeEventListener("keydown", sliderEscKeyHandler);
    slider.removeEventListener("click", sliderWindowClickHandler);
    sliderCloseButton.removeEventListener("click", sliderCloseButtonHandler);
  };

  sertificats.forEach((sertificat) => {
    sertificat.addEventListener("click", () => {
      openSlider();
    });
  });

  new Swiper(".slider-sertificats__swiper", {
    loop: true,
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

// peoples reviews slider

new Swiper(".reviews__peoples-reviews-swiper", {
  loop: true,
  spaceBetween: 20,
  slidesPerView: 1,
  grabCursor: true,
  pagination: {
    el: ".reviews__peoples-reviews-pagination",
    dynamicBullets: true,
    clickable: true,
  },
});

// set year

function replaceYearInDocument() {
  // Получаем текущий год
  const currentYear = new Date().getFullYear().toString();

  // Регулярное выражение для поиска конкретно 2023 года
  const yearRegex = /\b2023\b/g;

  // Рекурсивная функция для обхода всех узлов
  function walkNodes(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      // Если узел текстовый, проверяем на наличие года
      if (yearRegex.test(node.nodeValue)) {
        // Заменяем все вхождения года на текущий
        node.nodeValue = node.nodeValue.replace(yearRegex, currentYear);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Если элемент, проверяем его дочерние узлы
      for (let child of node.childNodes) {
        walkNodes(child);
      }
    }
  }

  // Начинаем обход с body (или другого элемента)
  walkNodes(document.body);
}

// Вызываем функцию при загрузке страницы
document.addEventListener("DOMContentLoaded", replaceYearInDocument);
