import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryRef = document.querySelector(".gallery");

// создание разметки
function createItemsGalleryMarkup(galleryItems) {
  const itemsGalleryMarkup = galleryItems
    .map(
      ({ original, preview, description }) =>
        `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
          class="lazyload gallery__image"
          loading="lazy"
          data-src="${preview}"
          data-source="${original}"
          alt="${description}"
          />
        </a>
      </div>`
    )
    .join("");

  return itemsGalleryMarkup;
}

// рендер разметки
galleryRef.innerHTML = createItemsGalleryMarkup(galleryItems);

// проверка поддержки "ленивой загрузки" браузером
if ("loading" in HTMLImageElement.prototype) {
  addSrcAtrToLazyImg();
} else {
  addLazySizesScript();
}

// добавление атрибута src колекции
function addSrcAtrToLazyImg() {
  const lazyImagesRef = document.querySelectorAll("[loading='lazy']");

  lazyImagesRef.forEach((img) => (img.src = img.dataset.src));
}

// подключение скрипта
function addLazySizesScript() {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  script.integrity =
    "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
  script.crossOrigin = "anonymous";
  script.referrerPolicy = "no-referrer";

  document.body.appendChild(script);
}

galleryRef.addEventListener("click", onGalleryClick);

function onGalleryClick(e) {
  e.preventDefault();

  const isGalleryImage = e.target.classList.contains("gallery__image");

  if (!isGalleryImage) {
    return;
  }
  const { target: galleryImgEl } = e;

  showModal(galleryImgEl);
}

let instance;

function showModal({ dataset: { source }, alt }) {
  instance = basicLightbox.create(`<img src="${source}" alt="${alt}">`, {
    onShow: onOpeningModal,
    onClose: onClosingModal,
  });

  instance.show();
}

// действия при открытии модалки
function onOpeningModal() {
  window.addEventListener("keydown", onKeyPress);

  bodyLock();
}

// действия при закрытии модалки
function onClosingModal() {
  window.removeEventListener("keydown", onKeyPress);

  bodyUnlock();
}

// блокировка скроллбара на боди, без "дергания" контента
function bodyLock() {
  const bodyRef = document.querySelector("body");
  const bodyStyle = window.getComputedStyle(bodyRef);
  const bodyWidth =
    bodyRef.offsetWidth +
    parseInt(bodyStyle.marginLeft) +
    parseInt(bodyStyle.marginRight); // получаем ширину боди с учетом маржинов

  const widthVerticalScrollBar = window.innerWidth - bodyWidth; // получаем ширину скроллбара

  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = widthVerticalScrollBar + "px"; // добавляем ширину скроллбара в виде паддинга
}

function bodyUnlock() {
  setTimeout(() => {
    document.body.style.paddingRight = "";
    document.body.style.overflow = "auto";
  }, 250); // ждем пока пройдет анимация закрытия модалки и разблокирываем боди
}

function onKeyPress(e) {
  if (e.code !== "Escape") {
    return;
  }

  instance.close();
}
