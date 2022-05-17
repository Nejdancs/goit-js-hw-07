import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryRef = document.querySelector(".gallery");

// создание разметки
function createItemsGalleryMarkup(galleryItems) {
  const itemsGalleryMarkup = galleryItems
    .map(
      ({ original, preview, description }) =>
        `<a class="gallery__item" href="${original}">
          <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>`
    )
    .join("");

  return itemsGalleryMarkup;
}

galleryRef.innerHTML = createItemsGalleryMarkup(galleryItems);

galleryRef.addEventListener("mouseover", onGalleryItem);
galleryRef.addEventListener("mouseout", onGalleryItem);

function onGalleryItem(e) {
  const { target: item } = e;

  if (!item.classList.contains("gallery__image")) {
    return;
  }

  if (e.type === "mouseover") {
    createOverlayImgMarkup(item);
    return;
  }

  if (e.type === "mouseout") {
    removeOverlayImgMarkup(item);
    return;
  }
}

function removeOverlayImgMarkup(item) {
  item.nextSibling.classList.remove("visible");

  setTimeout(() => {
    item.parentNode.lastElementChild.remove();
  }, 250);
}

function createOverlayImgMarkup(item) {
  const overlay = `<p class="gallery_overlay">${item.alt}</p>`;

  item.insertAdjacentHTML("afterend", overlay);

  setTimeout(() => {
    item.nextSibling.classList.add("visible");
  }, 10);
}

var lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
  overlayOpacity: 0.8,
});
