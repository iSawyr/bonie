// ---------- Intro pop-up ----------
const intro = document.getElementById("intro");
const hiButton = document.getElementById("intro-hi");

document.body.classList.add("intro-open");
hiButton.focus();

// Click anywhere on the intro to show the site
intro.addEventListener("click", () => {
  intro.classList.add("closing");
  document.body.classList.remove("intro-open");
  setTimeout(() => intro.remove(), 800);
}, { once: true });

// ---------- Slideshow ----------
const storageKey = "bonnie-slides-v1";
const placeholderSlides = [
  {
    title: "A little something for you",
    message: "This is your first slide. Open “Manage slides” to write your message and add a picture.",
    image: "",
    background: "",
    pageBackground: "",
    pageBackgroundOpacity: 70,
    pageBackgroundBlur: 0,
    spotify: "",
    blurAmount: 12,
    backgroundBlur: 0,
    backgroundOpacity: 100,
    font: "modern",
    color: "",
    width: 68,
    height: 28,
    imagePosition: { x: 50, y: 50 },
    backgroundPosition: { x: 50, y: 50 },
    art: "moon",
  },
  {
    title: "A favorite memory",
    message: "Add another slide for a photo, a story, or a moment you want to remember.",
    image: "",
    background: "",
    pageBackground: "",
    pageBackgroundOpacity: 70,
    pageBackgroundBlur: 0,
    spotify: "",
    blurAmount: 12,
    backgroundBlur: 0,
    backgroundOpacity: 100,
    font: "modern",
    color: "",
    width: 68,
    height: 28,
    imagePosition: { x: 50, y: 50 },
    backgroundPosition: { x: 50, y: 50 },
    art: "blue",
  },
  {
    title: "One more thing",
    message: "Keep adding slides to make this little slideshow your own.",
    image: "",
    background: "",
    pageBackground: "",
    pageBackgroundOpacity: 70,
    pageBackgroundBlur: 0,
    spotify: "",
    blurAmount: 12,
    backgroundBlur: 0,
    backgroundOpacity: 100,
    font: "modern",
    color: "",
    width: 68,
    height: 28,
    imagePosition: { x: 50, y: 50 },
    backgroundPosition: { x: 50, y: 50 },
    art: "rose",
  },
];
const slideTitle = document.getElementById("slide-title");
const slideMessage = document.getElementById("slide-message");
const slideshow = document.querySelector(".slideshow");
const siteBackgroundState = {
  layers: [
    document.getElementById("site-background-first"),
    document.getElementById("site-background-second"),
  ],
  activeLayer: 0,
  source: "",
  transitionTimer: 0,
};
const slidePageBackground = document.getElementById("slide-page-background");
const slidePageBackgroundState = {
  layers: [
    document.getElementById("slide-page-background-first"),
    document.getElementById("slide-page-background-second"),
  ],
  activeLayer: 0,
  source: "",
  transitionTimer: 0,
};
const blurAmountInput = document.getElementById("slide-blur");
const blurAmountValue = document.getElementById("blur-amount-value");
const backgroundBlurInput = document.getElementById("slide-background-blur");
const backgroundBlurValue = document.getElementById("background-blur-value");
const backgroundOpacityInput = document.getElementById("slide-background-opacity");
const backgroundOpacityValue = document.getElementById("background-opacity-value");
const pageBackgroundOpacityInput = document.getElementById("slide-page-background-opacity");
const pageBackgroundOpacityValue = document.getElementById("page-background-opacity-value");
const pageBackgroundBlurInput = document.getElementById("slide-page-background-blur");
const pageBackgroundBlurValue = document.getElementById("page-background-blur-value");
const slideFontInput = document.getElementById("slide-font");
const slideColorEnabledInput = document.getElementById("slide-color-enabled");
const slideColorInput = document.getElementById("slide-color");
const slideColorOpacityInput = document.getElementById("slide-color-opacity");
const slideColorOpacityValue = document.getElementById("slide-color-opacity-value");
const slideTextColorEnabledInput = document.getElementById("slide-text-color-enabled");
const slideTextColorInput = document.getElementById("slide-text-color");
const slideTextSizeInput = document.getElementById("slide-text-size");
const slideTextSizeValue = document.getElementById("slide-text-size-value");
const slideTextAlignInput = document.getElementById("slide-text-align");
const slideTextBoldInput = document.getElementById("slide-text-bold");
const slideTextItalicInput = document.getElementById("slide-text-italic");
const slideWidthInput = document.getElementById("slide-width");
const slideWidthValue = document.getElementById("slide-width-value");
const slideHeightInput = document.getElementById("slide-height");
const slideHeightValue = document.getElementById("slide-height-value");
const siteBackgroundColorInput = document.getElementById("site-background-color");
const siteBackgroundImageInput = document.getElementById("site-background-image");
const removeSiteBackgroundImageButton = document.getElementById("remove-site-background-image");
const resetSiteBackgroundButton = document.getElementById("reset-site-background");
const spotifyContainer = document.getElementById("spotify-container");
const spotifyEmbed = document.getElementById("spotify-embed");
const slideKicker = document.getElementById("slide-kicker");
const slideCard = document.querySelector(".slide-card");
const slideArt = document.getElementById("slide-art");
const artPlaceholder = document.querySelector(".art-placeholder");
const slideImage = document.getElementById("slide-image");
const slideBackgroundImage = document.getElementById("slide-background");
const slideCount = document.getElementById("slide-count");
const slideDots = document.getElementById("slide-dots");
const slideStatus = document.getElementById("slide-status");
const previousSlideButton = document.getElementById("previous-slide");
const nextSlideButton = document.getElementById("next-slide");
const deleteSlideButton = document.getElementById("delete-slide");
const addSlideButton = document.getElementById("add-slide");
const editSlideButton = document.getElementById("edit-slide");
const movePictureButton = document.getElementById("move-picture");
const moveBackgroundButton = document.getElementById("move-background");
const finishMovingButton = document.getElementById("finish-moving");
const moveHint = document.getElementById("move-hint");
const slideForm = document.getElementById("slide-form");
const slideKickerInput = document.getElementById("slide-kicker-input");
const slideTitleInput = document.getElementById("slide-title-input");
const slideMessageInput = document.getElementById("slide-message-input");
const spotifyInput = document.getElementById("spotify-input");
const slideImageInput = document.getElementById("slide-image-input");
const slideBackgroundInput = document.getElementById("slide-background-input");
const slidePageBackgroundInput = document.getElementById("slide-page-background-input");
const removePictureInput = document.getElementById("remove-picture");
const removeBackgroundInput = document.getElementById("remove-background");
const removePageBackgroundInput = document.getElementById("remove-page-background");
const removePictureLabel = document.querySelector(".remove-picture-option");
const removeBackgroundLabel = document.querySelector(".remove-background-option");
const removePageBackgroundLabel = document.querySelector(".remove-page-background-option");
const saveSlideButton = document.getElementById("save-slide");

let slides = placeholderSlides;
let currentSlide = 0;
let editingIndex = null;
let isTransitioning = false;
let movingKind = null;
let dragState = null;
let blurPreviewTimer = 0;
let siteBackgroundImage = "";
const siteBackgroundStorageKey = "bonnie-site-background-color";
const siteBackgroundImageStorageKey = "bonnie-site-background-image";
const defaultSiteBackground = "#070b1a";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const slideFontFamilies = {
  modern: "var(--body)",
  serif: 'Georgia, "Times New Roman", serif',
  rounded: '"Trebuchet MS", "Arial Rounded MT Bold", sans-serif',
  handwritten: '"Comic Sans MS", "Comic Sans", cursive',
  typewriter: '"Courier New", monospace',
  playfair: '"Playfair Display", Georgia, serif',
  cormorant: '"Cormorant Garamond", Georgia, serif',
  lora: '"Lora", Georgia, serif',
  merriweather: '"Merriweather", Georgia, serif',
  poppins: '"Poppins", sans-serif',
  nunito: '"Nunito", sans-serif',
  quicksand: '"Quicksand", sans-serif',
  dancing: '"Dancing Script", cursive',
  caveat: '"Caveat", cursive',
  specialelite: '"Special Elite", "Courier New", monospace',
};

function announceSlideStatus(message, isError) {
  slideStatus.textContent = message;
  slideStatus.classList.toggle("error", Boolean(isError));
}

function isValidSlideList(value) {
  return Array.isArray(value) && value.length > 0 && value.every(slide =>
    slide &&
    typeof slide.title === "string" &&
    typeof slide.message === "string" &&
    typeof slide.image === "string" &&
    (slide.kicker === undefined || (
      typeof slide.kicker === "string" &&
      slide.kicker.length <= 40
    )) &&
    (slide.background === undefined || typeof slide.background === "string") &&
    (slide.pageBackground === undefined || typeof slide.pageBackground === "string") &&
    (slide.spotify === undefined || typeof slide.spotify === "string") &&
    (slide.blurAmount === undefined || (
      Number.isFinite(slide.blurAmount) &&
      slide.blurAmount >= 0 &&
      slide.blurAmount <= 24
    )) &&
    (slide.backgroundBlur === undefined || (
      Number.isFinite(slide.backgroundBlur) &&
      slide.backgroundBlur >= 0 &&
      slide.backgroundBlur <= 24
    )) &&
    (slide.backgroundOpacity === undefined || (
      Number.isFinite(slide.backgroundOpacity) &&
      slide.backgroundOpacity >= 0 &&
      slide.backgroundOpacity <= 100
    )) &&
    (slide.pageBackgroundOpacity === undefined || (
      Number.isFinite(slide.pageBackgroundOpacity) &&
      slide.pageBackgroundOpacity >= 0 &&
      slide.pageBackgroundOpacity <= 100
    )) &&
    (slide.pageBackgroundBlur === undefined || (
      Number.isFinite(slide.pageBackgroundBlur) &&
      slide.pageBackgroundBlur >= 0 &&
      slide.pageBackgroundBlur <= 24
    )) &&
    (slide.font === undefined || Object.prototype.hasOwnProperty.call(slideFontFamilies, slide.font)) &&
    (slide.color === undefined || slide.color === "" || /^#[0-9a-f]{6}$/i.test(slide.color)) &&
    (slide.textColor === undefined || slide.textColor === "" || /^#[0-9a-f]{6}$/i.test(slide.textColor)) &&
    (slide.textSize === undefined || (
      Number.isFinite(slide.textSize) &&
      slide.textSize >= 75 &&
      slide.textSize <= 150
    )) &&
    (slide.textAlign === undefined || ["left", "center", "right"].includes(slide.textAlign)) &&
    (slide.textBold === undefined || typeof slide.textBold === "boolean") &&
    (slide.textItalic === undefined || typeof slide.textItalic === "boolean") &&
    (slide.colorOpacity === undefined || (
      Number.isFinite(slide.colorOpacity) &&
      slide.colorOpacity >= 0 &&
      slide.colorOpacity <= 100
    )) &&
    (slide.width === undefined || (Number.isFinite(slide.width) && slide.width >= 40 && slide.width <= 100)) &&
    (slide.height === undefined || (Number.isFinite(slide.height) && slide.height >= 20 && slide.height <= 100)) &&
    isValidPosition(slide.imagePosition) &&
    isValidPosition(slide.backgroundPosition) &&
    ["moon", "blue", "rose"].includes(slide.art)
  );
}

function isValidPosition(position) {
  return position === undefined || (
    position &&
    Number.isFinite(position.x) &&
    Number.isFinite(position.y) &&
    position.x >= 0 && position.x <= 100 &&
    position.y >= 0 && position.y <= 100
  );
}

function applySiteBackgroundColor(color) {
  const channels = color.slice(1).match(/.{2}/g).map(channel => parseInt(channel, 16));
  const glow = channels
    .map(channel => Math.round(channel + (255 - channel) * 0.18).toString(16).padStart(2, "0"))
    .join("");
  document.documentElement.style.setProperty("--bg", color);
  document.documentElement.style.setProperty("--site-glow", `#${glow}`);
}

function setBackgroundImage(state, source, animate) {
  const imageSource = source || "";
  if (imageSource === state.source) return;

  window.clearTimeout(state.transitionTimer);
  state.layers.forEach((layer, index) => {
    layer.classList.remove("is-leaving");
    if (index !== state.activeLayer) {
      layer.classList.remove("is-active");
      layer.removeAttribute("src");
    }
  });

  const previousLayer = state.layers[state.activeLayer];
  const nextIndex = 1 - state.activeLayer;
  const nextLayer = state.layers[nextIndex];
  if (imageSource) {
    nextLayer.src = imageSource;
  } else {
    nextLayer.removeAttribute("src");
  }
  nextLayer.classList.remove("is-active");
  void nextLayer.offsetWidth;

  const shouldAnimate = animate && !reduceMotion && Boolean(state.source);
  if (shouldAnimate) {
    previousLayer.classList.add("is-leaving");
    nextLayer.classList.add("is-active");
    state.transitionTimer = window.setTimeout(() => {
      previousLayer.classList.remove("is-leaving", "is-active");
      previousLayer.removeAttribute("src");
    }, 500);
  } else {
    previousLayer.classList.remove("is-active", "is-leaving");
    previousLayer.removeAttribute("src");
    nextLayer.classList.add("is-active");
  }

  state.activeLayer = nextIndex;
  state.source = imageSource;
}

function getSlideBackgroundOpacity(slide) {
  if (slide.backgroundOpacity !== undefined) return slide.backgroundOpacity;
  return 100;
}

function getSlideColorOpacity(slide) {
  return slide.colorOpacity === undefined ? 100 : slide.colorOpacity;
}

function getSlideTextSize(slide) {
  return slide.textSize === undefined ? 100 : slide.textSize;
}

function applySlideTextStyle(slide) {
  if (slide.textColor) {
    slideCard.style.setProperty("--slide-text-color", slide.textColor);
  } else {
    slideCard.style.removeProperty("--slide-text-color");
  }
  slideCard.style.setProperty("--slide-text-scale", String(getSlideTextSize(slide) / 100));
  slideCard.style.setProperty("--slide-text-align", slide.textAlign || "left");
  slideCard.classList.toggle("has-custom-text-bold", Boolean(slide.textBold));
  slideCard.classList.toggle("has-custom-text-italic", Boolean(slide.textItalic));
}

function getSlidePageBackgroundOpacity(slide) {
  return slide.pageBackgroundOpacity === undefined ? 70 : slide.pageBackgroundOpacity;
}

function getSlidePageBackgroundBlur(slide) {
  return slide.pageBackgroundBlur === undefined ? 0 : slide.pageBackgroundBlur;
}

function applySlidePageBackground(slide, animate) {
  slidePageBackground.style.setProperty(
    "--slide-page-background-opacity",
    String(getSlidePageBackgroundOpacity(slide) / 100)
  );
  slidePageBackground.style.setProperty(
    "--slide-page-background-blur",
    `${getSlidePageBackgroundBlur(slide)}px`
  );
  setBackgroundImage(slidePageBackgroundState, slide.pageBackground, animate);
}

function applySlideBackgroundOpacity(slide) {
  slideBackgroundImage.style.setProperty(
    "--slide-background-opacity",
    String(getSlideBackgroundOpacity(slide) / 100)
  );
}

try {
  const savedColor = localStorage.getItem(siteBackgroundStorageKey);
  if (savedColor !== null) {
    if (!/^#[0-9a-f]{6}$/i.test(savedColor)) {
      throw new Error("Saved background color is invalid.");
    }
    siteBackgroundColorInput.value = savedColor;
    applySiteBackgroundColor(savedColor);
  }
} catch (error) {
  siteBackgroundColorInput.value = defaultSiteBackground;
  announceSlideStatus("Saved site background color couldn't be loaded.", true);
}

try {
  const savedImage = localStorage.getItem(siteBackgroundImageStorageKey);
  if (savedImage !== null) {
    if (!savedImage.startsWith("data:image/jpeg;base64,")) {
      throw new Error("Saved background picture has an unsupported format.");
    }
    siteBackgroundImage = savedImage;
    removeSiteBackgroundImageButton.disabled = false;
  }
} catch (error) {
  announceSlideStatus("Saved whole-site background picture couldn't be loaded.", true);
}

function getSpotifyEmbed(link) {
  const value = link.trim();
  if (!value) return null;

  let url;
  try {
    url = new URL(value);
  } catch (error) {
    throw new Error("Paste a valid Spotify link.");
  }
  if (url.protocol !== "https:" || url.hostname !== "open.spotify.com" || url.port || url.username || url.password) {
    throw new Error("Use a link from open.spotify.com.");
  }

  const parts = url.pathname.split("/").filter(Boolean);
  if (parts[0] === "embed") parts.shift();
  if (parts[0] && parts[0].startsWith("intl-")) parts.shift();
  const type = parts[0];
  const id = parts[1];
  const supportedTypes = ["track", "album", "playlist", "artist", "episode", "show"];
  if (parts.length !== 2 || !supportedTypes.includes(type) || !/^[A-Za-z0-9]{10,64}$/.test(id || "")) {
    throw new Error("Use a Spotify track, album, playlist, artist, episode, or show link.");
  }
  return {
    src: `https://open.spotify.com/embed/${type}/${id}`,
    type,
  };
}

try {
  const savedSlides = localStorage.getItem(storageKey);
  if (savedSlides !== null) {
    const parsedSlides = JSON.parse(savedSlides);
    if (!isValidSlideList(parsedSlides)) {
      throw new Error("Saved slides have an unsupported format.");
    }
    slides = parsedSlides.map(slide => {
      const spotify = getSpotifyEmbed(slide.spotify || "");
      return {
        ...slide,
        background: slide.background || "",
        pageBackground: slide.pageBackground || "",
        spotify: spotify ? spotify.src : "",
        blurAmount: slide.blurAmount === undefined ? 12 : slide.blurAmount,
        backgroundBlur: slide.backgroundBlur === undefined ? 0 : slide.backgroundBlur,
        pageBackgroundOpacity: slide.pageBackgroundOpacity === undefined ? 70 : slide.pageBackgroundOpacity,
        pageBackgroundBlur: slide.pageBackgroundBlur === undefined ? 0 : slide.pageBackgroundBlur,
        font: slide.font || "modern",
        color: slide.color || "",
        colorOpacity: getSlideColorOpacity(slide),
        textColor: slide.textColor || "",
        textSize: getSlideTextSize(slide),
        textAlign: slide.textAlign || "left",
        textBold: Boolean(slide.textBold),
        textItalic: Boolean(slide.textItalic),
        width: slide.width === undefined ? 68 : slide.width,
        height: slide.height === undefined ? 28 : slide.height,
        imagePosition: slide.imagePosition || { x: 50, y: 50 },
        backgroundPosition: slide.backgroundPosition || { x: 50, y: 50 },
      };
    });
  }
} catch (error) {
  announceSlideStatus("Saved slides couldn't be loaded. Showing the starter slides instead.", true);
}

function renderSlide() {
  const slide = slides[currentSlide];
  applySlideBackgroundOpacity(slide);
  applySlidePageBackground(slide, true);
  slideCard.classList.remove("is-blur-preview");
  slideCard.style.setProperty("--slide-blur", `${slide.blurAmount}px`);
  slideCard.style.setProperty("--slide-background-blur", `${slide.backgroundBlur}px`);
  slideCard.style.setProperty("--slide-font", slideFontFamilies[slide.font]);
  if (slide.color) {
    slideCard.style.setProperty("--slide-color", slide.color);
  } else {
    slideCard.style.removeProperty("--slide-color");
  }
  slideCard.style.setProperty("--slide-color-opacity", `${getSlideColorOpacity(slide)}%`);
  slideCard.classList.toggle("has-custom-color", Boolean(slide.color));
  applySlideTextStyle(slide);
  slideshow.style.setProperty("--slide-width", `${slide.width}rem`);
  slideshow.style.setProperty("--slide-height", `${slide.height}rem`);
  slideTitle.textContent = slide.title;
  slideMessage.textContent = slide.message;
  const spotify = getSpotifyEmbed(slide.spotify || "");
  spotifyContainer.hidden = !spotify;
  if (spotify) {
    const spotifyHeight = ["album", "artist", "playlist", "show"].includes(spotify.type) ? 352 : 152;
    const spotifyScale = 0.82;
    spotifyEmbed.src = spotify.src;
    spotifyEmbed.title = `Spotify ${spotify.type} player for ${slide.title}`;
    spotifyEmbed.style.height = `${spotifyHeight}px`;
    spotifyContainer.style.height = `${Math.round(spotifyHeight * spotifyScale)}px`;
  } else {
    spotifyEmbed.removeAttribute("src");
    spotifyContainer.style.height = "0";
  }
  slideKicker.textContent = slide.kicker || `Slide ${currentSlide + 1}`;
  slideCount.textContent = `${currentSlide + 1} / ${slides.length}`;
  slideArt.dataset.art = slide.art;
  slideCard.classList.toggle("has-background", Boolean(slide.background));
  slideBackgroundImage.hidden = !slide.background;
  slideBackgroundImage.style.objectPosition = `${slide.backgroundPosition.x}% ${slide.backgroundPosition.y}%`;
  if (slide.background) {
    slideBackgroundImage.src = slide.background;
  } else {
    slideBackgroundImage.removeAttribute("src");
  }
  artPlaceholder.hidden = Boolean(slide.background) && !slide.image;
  slideImage.hidden = !slide.image;
  slideImage.style.objectPosition = `${slide.imagePosition.x}% ${slide.imagePosition.y}%`;
  if (slide.image) {
    slideImage.src = slide.image;
    slideImage.alt = `Picture for ${slide.title}`;
  } else {
    slideImage.removeAttribute("src");
    slideImage.alt = "";
  }
  slideArt.setAttribute(
    "aria-label",
    slide.image ? `Picture for ${slide.title}`     : slide.background ? `Background for ${slide.title}` : "Starry placeholder artwork"
  );

  slideDots.replaceChildren();
  slides.forEach((item, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slide-dot";
    dot.setAttribute("aria-label", `Show slide ${index + 1}: ${item.title}`);
    dot.setAttribute("aria-current", index === currentSlide ? "true" : "false");
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
    slideDots.append(dot);
  });

  previousSlideButton.disabled = slides.length < 2 || Boolean(movingKind);
  nextSlideButton.disabled = slides.length < 2 || Boolean(movingKind);
  deleteSlideButton.disabled = slides.length < 2 || Boolean(movingKind);
  addSlideButton.disabled = Boolean(movingKind);
  editSlideButton.disabled = Boolean(movingKind);
  movePictureButton.disabled = Boolean(movingKind) || !slide.image;
  moveBackgroundButton.disabled = Boolean(movingKind) || !slide.background;
  movePictureButton.setAttribute("aria-pressed", movingKind === "picture" ? "true" : "false");
  moveBackgroundButton.setAttribute("aria-pressed", movingKind === "background" ? "true" : "false");
  finishMovingButton.hidden = !movingKind;
  moveHint.hidden = !movingKind;
  slideDots.querySelectorAll("button").forEach(dot => {
    dot.disabled = Boolean(movingKind);
  });
}

function saveSlides(nextSlides) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(nextSlides));
    return true;
  } catch (error) {
    announceSlideStatus("Couldn't save changes in this browser. Try a smaller picture or remove one.", true);
    return false;
  }
}

function goToSlide(index) {
  if (index === currentSlide || isTransitioning || movingKind) return;
  const nextIndex = (index + slides.length) % slides.length;
  if (reduceMotion) {
    currentSlide = nextIndex;
    renderSlide();
    return;
  }

  isTransitioning = true;
  slideCard.classList.add("is-changing");
  window.setTimeout(() => {
    currentSlide = nextIndex;
    renderSlide();
    window.requestAnimationFrame(() => {
      slideCard.addEventListener("transitionend", () => {
        isTransitioning = false;
      }, { once: true });
      slideCard.classList.remove("is-changing");
    });
  }, 450);
}

function changeSlide(offset) {
  if (slides.length < 2) return;
  goToSlide(currentSlide + offset);
}

function startMoving(kind) {
  if (isTransitioning) return;
  const slide = slides[currentSlide];
  if (kind === "picture" && !slide.image) return;
  if (kind === "background" && !slide.background) return;

  movingKind = kind;
  slideCard.dataset.dragTarget = kind;
  slideCard.classList.remove("is-dragging");
  moveHint.textContent = kind === "picture"
    ? "Drag the main picture in its frame. Click “Done moving” when you’re finished."
    : "Drag anywhere on the slide to move its background. Click “Done moving” when you’re finished.";
  renderSlide();
}

function finishMoving() {
  if (!movingKind) return;
  dragState = null;
  movingKind = null;
  slideCard.removeAttribute("data-drag-target");
  slideCard.classList.remove("is-dragging");
  renderSlide();
}

function onSlidePointerDown(event) {
  if (!movingKind || event.button !== 0) return;
  if (movingKind === "picture" && !event.target.closest(".slide-art")) return;
  if (movingKind === "background" && event.target.closest("button, a, iframe")) return;

  const slide = slides[currentSlide];
  const image = movingKind === "picture" ? slideImage : slideBackgroundImage;
  if (!image.complete || !image.naturalWidth) return;

  const area = movingKind === "picture" ? slideArt : slideCard;
  const positionKey = movingKind === "picture" ? "imagePosition" : "backgroundPosition";
  dragState = {
    pointerId: event.pointerId,
    image,
    area,
    positionKey,
    startX: event.clientX,
    startY: event.clientY,
    startPosition: { ...slide[positionKey] },
    moved: false,
  };
  slideCard.classList.add("is-dragging");
  slideCard.setPointerCapture(event.pointerId);
  event.preventDefault();
}

function onSlidePointerMove(event) {
  if (!dragState || dragState.pointerId !== event.pointerId) return;

  const bounds = dragState.area.getBoundingClientRect();
  const scale = Math.max(
    bounds.width / dragState.image.naturalWidth,
    bounds.height / dragState.image.naturalHeight
  );
  const overflowX = Math.max(0, dragState.image.naturalWidth * scale - bounds.width);
  const overflowY = Math.max(0, dragState.image.naturalHeight * scale - bounds.height);
  const x = overflowX
    ? Math.max(0, Math.min(100, dragState.startPosition.x - ((event.clientX - dragState.startX) / overflowX) * 100))
    : dragState.startPosition.x;
  const y = overflowY
    ? Math.max(0, Math.min(100, dragState.startPosition.y - ((event.clientY - dragState.startY) / overflowY) * 100))
    : dragState.startPosition.y;
  const position = { x, y };

  slides[currentSlide][dragState.positionKey] = position;
  dragState.image.style.objectPosition = `${x}% ${y}%`;
  dragState.moved = dragState.moved || x !== dragState.startPosition.x || y !== dragState.startPosition.y;
}

function onSlidePointerUp(event) {
  if (!dragState || dragState.pointerId !== event.pointerId) return;

  const completedDrag = dragState;
  dragState = null;
  slideCard.classList.remove("is-dragging");
  if (!completedDrag.moved) return;

  if (saveSlides(slides)) {
    announceSlideStatus(completedDrag.positionKey === "backgroundPosition"
      ? "Background position saved."
      : "Picture position saved.");
  } else {
    slides[currentSlide][completedDrag.positionKey] = completedDrag.startPosition;
    renderSlide();
  }
}

function openSlideForm(index) {
  editingIndex = index;
  slideForm.reset();
  const slide = index === null ? null : slides[index];
  slideKickerInput.value = slide ? slide.kicker || "" : "";
  slideTitleInput.value = slide ? slide.title : "";
  slideMessageInput.value = slide ? slide.message : "";
  spotifyInput.value = slide ? slide.spotify || "" : "";
  blurAmountInput.value = slide ? String(slide.blurAmount) : "12";
  blurAmountValue.value = `${blurAmountInput.value}px`;
  backgroundBlurInput.value = slide ? String(slide.backgroundBlur) : "0";
  backgroundBlurValue.value = `${backgroundBlurInput.value}px`;
  backgroundOpacityInput.value = String(slide ? getSlideBackgroundOpacity(slide) : 100);
  backgroundOpacityValue.value = `${backgroundOpacityInput.value}%`;
  pageBackgroundOpacityInput.value = String(slide ? getSlidePageBackgroundOpacity(slide) : 70);
  pageBackgroundOpacityValue.value = `${pageBackgroundOpacityInput.value}%`;
  pageBackgroundBlurInput.value = String(slide ? getSlidePageBackgroundBlur(slide) : 0);
  pageBackgroundBlurValue.value = `${pageBackgroundBlurInput.value}px`;
  slidePageBackground.style.setProperty("--slide-page-background-opacity", String(Number(pageBackgroundOpacityInput.value) / 100));
  slidePageBackground.style.setProperty("--slide-page-background-blur", `${pageBackgroundBlurInput.value}px`);
  slideCard.style.setProperty("--slide-background-blur", `${backgroundBlurInput.value}px`);
  applySlideBackgroundOpacity(slide || { backgroundOpacity: Number(backgroundOpacityInput.value) });
  slideFontInput.value = slide ? slide.font : "modern";
  slideColorEnabledInput.checked = Boolean(slide && slide.color);
  slideColorInput.value = slide && slide.color ? slide.color : "#1c2a4b";
  slideColorInput.disabled = !slideColorEnabledInput.checked;
  slideColorOpacityInput.value = String(slide ? getSlideColorOpacity(slide) : 100);
  slideColorOpacityValue.value = `${slideColorOpacityInput.value}%`;
  slideColorOpacityInput.disabled = !slideColorEnabledInput.checked;
  slideTextColorEnabledInput.checked = Boolean(slide && slide.textColor);
  slideTextColorInput.value = slide && slide.textColor ? slide.textColor : "#eef2ff";
  slideTextColorInput.disabled = !slideTextColorEnabledInput.checked;
  slideTextSizeInput.value = String(slide ? getSlideTextSize(slide) : 100);
  slideTextSizeValue.value = `${slideTextSizeInput.value}%`;
  slideTextAlignInput.value = slide ? slide.textAlign || "left" : "left";
  slideTextBoldInput.checked = Boolean(slide && slide.textBold);
  slideTextItalicInput.checked = Boolean(slide && slide.textItalic);
  slideWidthInput.value = String(slide ? slide.width : 68);
  slideWidthValue.value = `${slideWidthInput.value}rem`;
  slideHeightInput.value = String(slide ? slide.height : 28);
  slideHeightValue.value = `${slideHeightInput.value}rem`;
  slideshow.style.setProperty("--slide-width", `${slideWidthInput.value}rem`);
  slideshow.style.setProperty("--slide-height", `${slideHeightInput.value}rem`);
  slideCard.style.setProperty("--slide-color", slideColorEnabledInput.checked ? slideColorInput.value : "");
  slideCard.style.setProperty("--slide-color-opacity", `${slideColorOpacityInput.value}%`);
  slideCard.classList.toggle("has-custom-color", slideColorEnabledInput.checked);
  applySlideTextStyle({
    textColor: slideTextColorEnabledInput.checked ? slideTextColorInput.value : "",
    textSize: Number(slideTextSizeInput.value),
    textAlign: slideTextAlignInput.value,
    textBold: slideTextBoldInput.checked,
    textItalic: slideTextItalicInput.checked,
  });
  removePictureLabel.hidden = !slide || !slide.image;
  removeBackgroundLabel.hidden = !slide || !slide.background;
  removePageBackgroundLabel.hidden = !slide || !slide.pageBackground;
  saveSlideButton.textContent = slide ? "Save changes" : "Add slide";
  slideForm.hidden = false;
  slideTitleInput.focus();
}

function closeSlideForm() {
  slideForm.hidden = true;
  slideForm.reset();
  editingIndex = null;
  window.clearTimeout(blurPreviewTimer);
  slideCard.classList.remove("is-blur-preview");
  slideCard.style.setProperty("--slide-blur", `${slides[currentSlide].blurAmount}px`);
  slideCard.style.setProperty("--slide-background-blur", `${slides[currentSlide].backgroundBlur}px`);
  applySlideBackgroundOpacity(slides[currentSlide]);
  applySlidePageBackground(slides[currentSlide], true);
  slideCard.style.setProperty("--slide-color", slides[currentSlide].color || "");
  slideCard.style.setProperty("--slide-color-opacity", `${getSlideColorOpacity(slides[currentSlide])}%`);
  slideCard.classList.toggle("has-custom-color", Boolean(slides[currentSlide].color));
  applySlideTextStyle(slides[currentSlide]);
  slideshow.style.setProperty("--slide-width", `${slides[currentSlide].width}rem`);
  slideshow.style.setProperty("--slide-height", `${slides[currentSlide].height}rem`);
}

blurAmountInput.addEventListener("input", () => {
  blurAmountValue.value = `${blurAmountInput.value}px`;
  slideCard.style.setProperty("--slide-blur", `${blurAmountInput.value}px`);
  slideCard.classList.add("is-blur-preview");
  window.clearTimeout(blurPreviewTimer);
  blurPreviewTimer = window.setTimeout(() => {
    slideCard.classList.remove("is-blur-preview");
  }, 700);
});

backgroundBlurInput.addEventListener("input", () => {
  const blur = `${backgroundBlurInput.value}px`;
  backgroundBlurValue.value = blur;
  slideCard.style.setProperty("--slide-background-blur", blur);
});

backgroundOpacityInput.addEventListener("input", () => {
  backgroundOpacityValue.value = `${backgroundOpacityInput.value}%`;
  slideBackgroundImage.style.setProperty("--slide-background-opacity", String(Number(backgroundOpacityInput.value) / 100));
});

pageBackgroundOpacityInput.addEventListener("input", () => {
  pageBackgroundOpacityValue.value = `${pageBackgroundOpacityInput.value}%`;
  slidePageBackground.style.setProperty(
    "--slide-page-background-opacity",
    String(Number(pageBackgroundOpacityInput.value) / 100)
  );
});

pageBackgroundBlurInput.addEventListener("input", () => {
  const blur = `${pageBackgroundBlurInput.value}px`;
  pageBackgroundBlurValue.value = blur;
  slidePageBackground.style.setProperty("--slide-page-background-blur", blur);
});

siteBackgroundColorInput.addEventListener("input", () => {
  applySiteBackgroundColor(siteBackgroundColorInput.value);
});

siteBackgroundColorInput.addEventListener("change", () => {
  try {
    localStorage.setItem(siteBackgroundStorageKey, siteBackgroundColorInput.value);
    announceSlideStatus("Site background color saved in this browser.");
  } catch (error) {
    announceSlideStatus("Couldn't save the site background color in this browser.", true);
  }
});

siteBackgroundImageInput.addEventListener("change", async () => {
  const file = siteBackgroundImageInput.files[0];
  if (!file) return;

  try {
    const image = await readAndResizeImage(file);
    localStorage.setItem(siteBackgroundImageStorageKey, image);
    siteBackgroundImage = image;
    removeSiteBackgroundImageButton.disabled = false;
    setBackgroundImage(siteBackgroundState, image, true);
    announceSlideStatus("Whole-site background picture saved in this browser.");
  } catch (error) {
    announceSlideStatus(error.message || "Couldn't save the whole-site background picture.", true);
  } finally {
    siteBackgroundImageInput.value = "";
  }
});

removeSiteBackgroundImageButton.addEventListener("click", () => {
  try {
    localStorage.removeItem(siteBackgroundImageStorageKey);
    siteBackgroundImage = "";
    removeSiteBackgroundImageButton.disabled = true;
    setBackgroundImage(siteBackgroundState, "", true);
    announceSlideStatus("Whole-site background picture removed.");
  } catch (error) {
    announceSlideStatus("Couldn't remove the whole-site background picture.", true);
  }
});

resetSiteBackgroundButton.addEventListener("click", () => {
  siteBackgroundColorInput.value = defaultSiteBackground;
  document.documentElement.style.removeProperty("--bg");
  document.documentElement.style.removeProperty("--site-glow");
  try {
    localStorage.removeItem(siteBackgroundStorageKey);
    announceSlideStatus("Night background colors restored.");
  } catch (error) {
    announceSlideStatus("Couldn't save the background reset in this browser.", true);
  }
});

slideColorEnabledInput.addEventListener("change", () => {
  slideColorInput.disabled = !slideColorEnabledInput.checked;
  slideColorOpacityInput.disabled = !slideColorEnabledInput.checked;
  slideCard.style.setProperty("--slide-color", slideColorEnabledInput.checked ? slideColorInput.value : "");
  slideCard.classList.toggle("has-custom-color", slideColorEnabledInput.checked);
});

slideColorInput.addEventListener("input", () => {
  if (slideColorEnabledInput.checked) {
    slideCard.style.setProperty("--slide-color", slideColorInput.value);
  }
});

slideColorOpacityInput.addEventListener("input", () => {
  slideColorOpacityValue.value = `${slideColorOpacityInput.value}%`;
  slideCard.style.setProperty("--slide-color-opacity", `${slideColorOpacityInput.value}%`);
});

function previewSlideTextStyle() {
  applySlideTextStyle({
    textColor: slideTextColorEnabledInput.checked ? slideTextColorInput.value : "",
    textSize: Number(slideTextSizeInput.value),
    textAlign: slideTextAlignInput.value,
    textBold: slideTextBoldInput.checked,
    textItalic: slideTextItalicInput.checked,
  });
}

slideTextColorEnabledInput.addEventListener("change", () => {
  slideTextColorInput.disabled = !slideTextColorEnabledInput.checked;
  previewSlideTextStyle();
});

slideTextColorInput.addEventListener("input", previewSlideTextStyle);
slideTextSizeInput.addEventListener("input", () => {
  slideTextSizeValue.value = `${slideTextSizeInput.value}%`;
  previewSlideTextStyle();
});
slideTextAlignInput.addEventListener("change", previewSlideTextStyle);
slideTextBoldInput.addEventListener("change", previewSlideTextStyle);
slideTextItalicInput.addEventListener("change", previewSlideTextStyle);

slideWidthInput.addEventListener("input", () => {
  slideWidthValue.value = `${slideWidthInput.value}rem`;
  slideshow.style.setProperty("--slide-width", `${slideWidthInput.value}rem`);
});

slideHeightInput.addEventListener("input", () => {
  slideHeightValue.value = `${slideHeightInput.value}rem`;
  slideshow.style.setProperty("--slide-height", `${slideHeightInput.value}rem`);
});

async function readAndResizeImage(file) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Choose an image file.");
  }
  if (file.size > 15 * 1024 * 1024) {
    throw new Error("Choose an image smaller than 15 MB.");
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const image = new Image();
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = () => reject(new Error("That picture couldn't be opened. Try another image."));
      image.src = objectUrl;
    });

    const maxDimension = 1400;
    const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
    const imageCanvas = document.createElement("canvas");
    imageCanvas.width = Math.round(image.naturalWidth * scale);
    imageCanvas.height = Math.round(image.naturalHeight * scale);
    const imageContext = imageCanvas.getContext("2d");
    if (!imageContext) {
      throw new Error("Your browser couldn't prepare that picture.");
    }
    imageContext.fillStyle = "#10182d";
    imageContext.fillRect(0, 0, imageCanvas.width, imageCanvas.height);
    imageContext.drawImage(image, 0, 0, imageCanvas.width, imageCanvas.height);
    return imageCanvas.toDataURL("image/jpeg", 0.82);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

addSlideButton.addEventListener("click", () => openSlideForm(null));
editSlideButton.addEventListener("click", () => openSlideForm(currentSlide));
movePictureButton.addEventListener("click", () => startMoving("picture"));
moveBackgroundButton.addEventListener("click", () => startMoving("background"));
finishMovingButton.addEventListener("click", finishMoving);
document.getElementById("cancel-slide").addEventListener("click", closeSlideForm);
previousSlideButton.addEventListener("click", () => changeSlide(-1));
nextSlideButton.addEventListener("click", () => changeSlide(1));
slideCard.addEventListener("pointerdown", onSlidePointerDown);
slideCard.addEventListener("pointermove", onSlidePointerMove);
slideCard.addEventListener("pointerup", onSlidePointerUp);
slideCard.addEventListener("pointercancel", onSlidePointerUp);

deleteSlideButton.addEventListener("click", () => {
  if (slides.length < 2 || !window.confirm("Delete this slide?")) return;
  const nextSlides = slides.filter((slide, index) => index !== currentSlide);
  if (saveSlides(nextSlides)) {
    slides = nextSlides;
    currentSlide = Math.min(currentSlide, slides.length - 1);
    closeSlideForm();
    renderSlide();
    announceSlideStatus("Slide deleted.");
  }
});

slideForm.addEventListener("submit", async event => {
  event.preventDefault();
  const title = slideTitleInput.value.trim();
  const message = slideMessageInput.value.trim();
  if (!title || !message) {
    announceSlideStatus("Please add both a title and a message.", true);
    return;
  }

  let spotify;
  try {
    const parsedSpotify = getSpotifyEmbed(spotifyInput.value);
    spotify = parsedSpotify ? parsedSpotify.src : "";
  } catch (error) {
    announceSlideStatus(error.message, true);
    return;
  }

  saveSlideButton.disabled = true;
  try {
    const existing = editingIndex === null ? null : slides[editingIndex];
    let image = existing ? existing.image : "";
    let background = existing ? existing.background : "";
    let pageBackground = existing ? existing.pageBackground : "";
    if (removePictureInput.checked) image = "";
    if (removeBackgroundInput.checked) background = "";
    if (removePageBackgroundInput.checked) pageBackground = "";
    if (slideImageInput.files[0]) {
      image = await readAndResizeImage(slideImageInput.files[0]);
    }
    if (slideBackgroundInput.files[0]) {
      background = await readAndResizeImage(slideBackgroundInput.files[0]);
    }
    if (slidePageBackgroundInput.files[0]) {
      pageBackground = await readAndResizeImage(slidePageBackgroundInput.files[0]);
    }

    const slide = {
      kicker: slideKickerInput.value.trim(),
      title,
      message,
      image,
      background,
      pageBackground,
      spotify,
      blurAmount: Number(blurAmountInput.value),
      backgroundBlur: Number(backgroundBlurInput.value),
      backgroundOpacity: Number(backgroundOpacityInput.value),
      pageBackgroundOpacity: Number(pageBackgroundOpacityInput.value),
      pageBackgroundBlur: Number(pageBackgroundBlurInput.value),
      font: slideFontInput.value,
      color: slideColorEnabledInput.checked ? slideColorInput.value : "",
      colorOpacity: Number(slideColorOpacityInput.value),
      textColor: slideTextColorEnabledInput.checked ? slideTextColorInput.value : "",
      textSize: Number(slideTextSizeInput.value),
      textAlign: slideTextAlignInput.value,
      textBold: slideTextBoldInput.checked,
      textItalic: slideTextItalicInput.checked,
      width: Number(slideWidthInput.value),
      height: Number(slideHeightInput.value),
      imagePosition: existing ? existing.imagePosition : { x: 50, y: 50 },
      backgroundPosition: existing ? existing.backgroundPosition : { x: 50, y: 50 },
      art: existing ? existing.art : ["moon", "blue", "rose"][slides.length % 3],
    };
    const nextSlides = slides.slice();
    const savedIndex = editingIndex === null ? nextSlides.length : editingIndex;
    if (editingIndex === null) {
      nextSlides.push(slide);
    } else {
      nextSlides[editingIndex] = slide;
    }

    if (saveSlides(nextSlides)) {
      slides = nextSlides;
      currentSlide = savedIndex;
      renderSlide();
      closeSlideForm();
      announceSlideStatus("Slide saved in this browser.");
    }
  } catch (error) {
    announceSlideStatus(error.message || "Couldn't prepare that picture.", true);
  } finally {
    saveSlideButton.disabled = false;
  }
});

setBackgroundImage(siteBackgroundState, siteBackgroundImage, false);
renderSlide();

// ---------- Moonlit night background ----------
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
let width = 0;
let height = 0;
let shootingStar = null;
let nextShotAt = 4; // seconds until the first shooting star
let lastTime = 0;

function resizeStars() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const count = Math.min(220, Math.floor((width * height) / 8000));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.3 + 0.3,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 1.5 + 0.5,
    drift: Math.random() * 0.02 + 0.005,
  }));
  drawStars(performance.now());
}

function drawStars(now) {
  const seconds = now / 1000;
  const step = Math.min((now - lastTime) / 16.7, 4) || 1;
  lastTime = now;

  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "#dfe8ff";

  for (const star of stars) {
    const twinkle = 0.5 + 0.5 * Math.sin(seconds * star.speed + star.phase);
    ctx.globalAlpha = twinkle * twinkle * twinkle;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();

    if (!reduceMotion) {
      star.x += star.drift * step;
      if (star.x > width + 2) star.x = -2;
    }
  }
  ctx.globalAlpha = 1;

  if (reduceMotion) return;

  // Shooting star every few seconds
  if (!shootingStar && seconds > nextShotAt) {
    shootingStar = {
      x: Math.random() * width * 0.6 + width * 0.1,
      y: Math.random() * height * 0.35,
      vx: 9,
      vy: 4,
      life: 0,
    };
  }

  if (shootingStar) {
    const s = shootingStar;
    s.x += s.vx * step;
    s.y += s.vy * step;
    s.life += 0.016 * step;

    const tailX = s.x - s.vx * 9;
    const tailY = s.y - s.vy * 9;
    const gradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(tailX, tailY);
    ctx.stroke();

    if (s.x > width + 50 || s.y > height + 50 || s.life > 2) {
      shootingStar = null;
      nextShotAt = seconds + 6 + Math.random() * 6;
    }
  }
}

function animateStars(now) {
  drawStars(now);
  requestAnimationFrame(animateStars);
}

window.addEventListener("resize", resizeStars);
resizeStars();
if (!reduceMotion) requestAnimationFrame(animateStars);
