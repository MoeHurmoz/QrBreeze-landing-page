// Function to remove one or more HTML elements at once using a class name
const removeElements = (className) => {
  if (typeof className === "string") {
    const elements = [...document.getElementsByClassName(className)];
    for (const element of elements) element.remove();
  } else {
    console.error("Expected a string as className");
  }
};

// Function that makes elements selected in the first parameter either focusable using keyboard or unfocusable depending on the value of the second parameter
const handleElementsFocus = (cssSelector, booleanValue) => {
  if (typeof cssSelector === "string" && typeof booleanValue === "boolean") {
    const elements = document.querySelectorAll(cssSelector);

    for (const element of elements) {
      element.setAttribute("tabindex", booleanValue ? "0" : "-1");
    }
  } else {
    console.error(
      "Invalid arguments: First parameter should be a string and second parameter should be a boolean."
    );
  }
};

// Function that makes the page suitable for different screen sizes
const handleScreenSize = () => {
  const userScreenWidth = window.innerWidth;

  // If the user's screen is medium size
  if (userScreenWidth <= 1200 && userScreenWidth > 766) {
    // Remove <br /> tags that are not suitable for medium screens
    removeElements("md-screen");
  }
  // Else if the user's screen is small size
  else if (userScreenWidth <= 766) {
    // Remove <br /> tags that are not suitable for small screens
    removeElements("removable-tag");
  }

  // if the user's screen is small size, make the navbar links unfocusable, otherwise they will be focusable
  handleElementsFocus("#navbar a", userScreenWidth > 766);
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

      menuBtn.classList.toggle("active");
      menuBtn.setAttribute("aria-expanded", !expanded);
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
    menuBtn.addEventListener("click", toggleNavbar);
    menuBtn.addEventListener("keydown", (event) => {
      if (event.code === "Enter" || event.code === "Space") {
        event.preventDefault();
        toggleNavbar(event);
      }
    });

    const navbarLinks = [...navbar.getElementsByTagName("a")];
    for (const link of navbarLinks) {
      link.addEventListener("click", () => {
        closeNavbar();
        handleElementsFocus("#navbar a", window.innerWidth > 766);
      });
    }

    window.addEventListener(
      "resize",
      () => {
        closeNavbar();
        handleScreenSize();
      },
      { passive: true }
    );
  }
};

// Function to perform a writing effect on the element passed to it
const writingEffect = (element, arrOfWords) => {
  if (element instanceof HTMLElement && Array.isArray(arrOfWords)) {
    let index = 0,
      currentWord = arrOfWords[index],
      charIndex = 0;

    // Function to type the current word
    const typeWord = () => {
      if (charIndex >= currentWord.length) {
        setTimeout(eraseWord, 600); // Wait before starting to erase the word
        return;
      }

      charIndex++;
      element.textContent = currentWord.substring(0, charIndex);
      setTimeout(typeWord, 50);
    };

    // Function to erase current word and move to the next word
    const eraseWord = () => {
      if (charIndex <= 0) {
        index = (index + 1) % arrOfWords.length;
        currentWord = arrOfWords[index];
        typeWord();
        return;
      }

      charIndex--;
      element.textContent = currentWord.substring(0, charIndex);
      setTimeout(eraseWord, 50);
    };

    typeWord();
  } else {
    throw new Error("There is an error in the element or array.");
  }
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

document.addEventListener("DOMContentLoaded", () => {
  handleScreenSize();
  handleMenuBtn();
  writingEffect(variableText, words);
});
