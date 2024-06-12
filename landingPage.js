document.addEventListener("DOMContentLoaded", () => {
  // If the user's screen is small
  if (window.innerWidth <= 766) {
    // Remove <br /> tags that are not suitable for small screens
    const removableTags = document.getElementsByClassName("removable-tag");

    while (removableTags.length > 0) {
      removableTags[0].remove();
    }

    // Activate the hamburger button with the navigation bar
    const mainHeader = document.getElementById("main-header"),
      hamburgerBtn = document.getElementById("hamburger-btn"),
      navbar = document.getElementById("navbar");

    if (mainHeader && hamburgerBtn && navbar) {
      hamburgerBtn.addEventListener("click", (event) => {
        event.stopPropagation();

        if (!hamburgerBtn.classList.contains("active")) {
          mainHeader.classList.add("active");
        } else {
          setTimeout(() => {
            mainHeader.classList.remove("active");
          }, 500);
        }
        hamburgerBtn.classList.toggle("active");
        navbar.classList.toggle("active");

        document.addEventListener("click", (event) => {
          if (!navbar.contains(event.target)) {
            setTimeout(() => {
              mainHeader.classList.remove("active");
            }, 500);
            hamburgerBtn.classList.remove("active");
            navbar.classList.remove("active");
          }
        });
      });
    }
  }

  // Function to perform a writing effect on the element passed to it
  const writingEffect = (element, arrOfWords) => {
    if (element && Array.isArray(arrOfWords)) {
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
        element.innerHTML = currentWord.substring(0, charIndex);
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
        element.innerHTML = currentWord.substring(0, charIndex);
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

  writingEffect(variableText, words);
});
