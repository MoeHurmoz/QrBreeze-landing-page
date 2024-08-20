// Function to remove one or more HTML elements at once using a class name
const removeElements = (className) => {
  if (typeof className !== "string") {
    throw new Error("Expected a string as className");
  }

  const elements = [...document.getElementsByClassName(className)];
  for (const element of elements) element.remove();
};

// Function that makes elements selected in the first parameter either focusable using keyboard or unfocusable depending on the value of the second parameter
const handleElementsFocus = (cssSelector, focusIt = false) => {
  if (typeof cssSelector !== "string" || typeof focusIt !== "boolean") {
    throw new Error(
      "Invalid arguments: First parameter should be a string and second parameter should be a boolean."
    );
  }

  const elements = document.querySelectorAll(cssSelector);
  for (const element of elements) {
    element.setAttribute("tabindex", focusIt ? "0" : "-1");
  }
};

// Function that makes the page suitable for different screen sizes
const handleScreenSize = () => {
  const screenIsMedium = window.matchMedia(
      "(max-width: 1200px) and (min-width: 767px)"
    ).matches,
    screenIsSmall = window.matchMedia("(max-width: 767px)").matches;

  if (screenIsMedium) {
    // Remove <br /> tags that are not suitable for medium screens
    removeElements("removed-in-md-screen");
  } else if (screenIsSmall) {
    // Remove <br /> tags that are not suitable for small screens
    removeElements("removed-in-sm-screen");
  }

  // Handle navbar link focusability based on screen size
  handleElementsFocus("#navbar a", !screenIsSmall);
};

// Function to handle the menu button and navigation bar
const handleMenuBtn = () => {
  const mainHeader = document.getElementById("main-header"),
    menuBtn = document.getElementById("menu-btn"),
    navbar = document.getElementById("navbar");

  if (mainHeader && menuBtn && navbar) {
    // Function to open and close navigation bar when menu button is clicked
    const toggleNavbar = (event) => {
      event.stopPropagation();

      const expanded = menuBtn.getAttribute("aria-expanded") === "true";

      if (!expanded) {
        mainHeader.classList.add("active");
        document.addEventListener("click", closeNavbar);
      } else {
        setTimeout(() => mainHeader.classList.remove("active"), 500);
        document.removeEventListener("click", closeNavbar);
      }

      menuBtn.setAttribute("aria-expanded", !expanded);
      menuBtn.classList.toggle("active");
      navbar.classList.toggle("active");
      handleElementsFocus("#navbar a", !expanded);
    };

    // Function to close navigation bar when clicked anywhere outside navigation bar
    const closeNavbar = (event) => {
      const removals = () => {
        setTimeout(() => mainHeader.classList.remove("active"), 500);
        menuBtn.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
        navbar.classList.remove("active");
        document.removeEventListener("click", closeNavbar);
      };

      if (event && !navbar.contains(event.target)) {
        removals();
        handleElementsFocus("#navbar a", false);
      } else if (!event) {
        removals();
      }
    };

    // Add the events listener
    menuBtn.onclick = toggleNavbar;
    menuBtn.onkeydown = (event) => {
      if (event.code === "Enter" || event.code === "Space") {
        event.preventDefault();
        toggleNavbar(event);
      }
    };

    const navbarLinks = [...navbar.getElementsByTagName("a")];
    for (const link of navbarLinks) {
      link.onclick = () => {
        closeNavbar();
        handleElementsFocus("#navbar a", window.innerWidth > 766);
      };
    }

    // Using the Debounce technique with the screen resize event
    let timeoutId;
    window.onresize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        closeNavbar();
        handleScreenSize();
      }, 300);
    };
  }
};

// Function to perform a writing effect on the element passed to it
const writingEffect = (
  element,
  arrOfWords,
  typingSpeed = 50, // Default typing speed per character (in ms)
  erasingSpeed = 50, // Default erasing speed per character (in ms)
  delayBetweenWords = 600 // Default delay before word erasing starts (in ms)
) => {
  if (!(element instanceof HTMLElement) || !Array.isArray(arrOfWords)) {
    throw new Error("There is an error in the element or array.");
  }

  let index = 0,
    currentWord = arrOfWords[index],
    charIndex = 0;

  // Function to type the current word
  const typeWord = () => {
    if (charIndex >= currentWord.length) {
      setTimeout(eraseWord, delayBetweenWords); // Wait before starting to erase the word
      return;
    }

    charIndex++;
    element.textContent = currentWord.substring(0, charIndex);
    setTimeout(typeWord, typingSpeed); // Adjust the speed of typing
  };

  // Function to erase the current word and move to the next word
  const eraseWord = () => {
    if (charIndex <= 0) {
      index = (index + 1) % arrOfWords.length;
      currentWord = arrOfWords[index];
      typeWord();
      return;
    }

    charIndex--;
    element.textContent = currentWord.substring(0, charIndex);
    setTimeout(eraseWord, erasingSpeed); // Adjust the speed of erasing
  };

  typeWord();
};

const variableText = document.getElementById("variable-text"),
  words = [
    "URL/Link",
    "PDF",
    "Vcard",
    "Images",
    "List of Links",
    "Business",
    "Menu",
    "Apps",
    "Coupon",
    "Event",
    "Video",
    "Social Media",
    "More...",
  ];

// From here the application starts
document.addEventListener("DOMContentLoaded", () => {
  handleScreenSize();
  handleMenuBtn();
  writingEffect(variableText, words);
});
