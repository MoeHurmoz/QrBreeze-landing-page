window.onload = () => {
  const element = document.getElementById("variable-text"),
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

  let index = 0,
    currentWord = "",
    charIndex = 0;

  // Start the typing effect if the element is found
  if (element) {
    currentWord = words[index];
    typeWord();
  } else {
    console.error("Element with id 'variable-text' not found.");
  }

  // Function to type the current word
  function typeWord() {
    if (charIndex >= currentWord.length) {
      setTimeout(eraseWord, 600); // Wait before starting to erase the word
      return;
    }

    charIndex++;
    element.innerHTML = currentWord.substring(0, charIndex);
    setTimeout(typeWord, 50);
  }

  // Function to erase current word and move to the next word
  function eraseWord() {
    if (charIndex <= 0) {
      index = (index + 1) % words.length;
      currentWord = words[index];
      typeWord();
      return;
    }

    charIndex--;
    element.innerHTML = currentWord.substring(0, charIndex);
    setTimeout(eraseWord, 50);
  }
};
