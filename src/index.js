document.getElementById("madLibForm").addEventListener("submit", function (e) {
  e.preventDefault();
  getStory();
});

function getStory() {
  const name = document.getElementById("name").value;
  const adjective = document.getElementById("adjective").value;
  const animal = document.getElementById("animal").value;
  const place = document.getElementById("place").value;
  const object = document.getElementById("object").value;

  const prompt = `Write a whimsical short story (max 1000 characters) where a character named ${name}, who is very ${adjective}, meets a mysterious ${animal} while exploring ${place}. Along the way, they discover a magical ${object} that changes their life. Keep it lighthearted and imaginative.`;

  const apiKey = `06c63cbc3e714d4fd60883of7efa4t87`;
  const apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt
  )}&key=${apiKey}`;

  document.getElementById("storiesContainer").innerHTML =
    "Creating your story...";
  document.getElementById("storiesContainer").classList.add("blink");

  axios
    .get(apiUrl)
    .then((response) => {
      const story =
        response.data.answer || "Oops! Couldn’t fetch your story. Try again!";
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      typeStory(story);
    })
    .catch((error) => {
      console.error("Error generating story:", error);
      document.getElementById("storiesContainer").innerHTML =
        "Something went wrong. Try again later!";
    });
}

function typeStory(storyText) {
  const container = document.getElementById("storiesContainer");
  container.classList.remove("blink");
  container.innerHTML = "";

  const typewriter = new Typewriter(container, {
    loop: false,
    delay: 30,
  });

  typewriter
    .typeString(storyText)
    .callFunction(() => {
      // Create the Reset button
      const resetButton = document.createElement("button");
      resetButton.innerText = "Reset";
      resetButton.style.marginTop = "20px";
      resetButton.style.display = "block";
      resetButton.style.padding = "10px 20px";
      resetButton.style.fontSize = "16px";
      resetButton.style.borderRadius = "6px";
      resetButton.style.backgroundColor = "#4caf50";
      resetButton.style.color = "white";
      resetButton.style.border = "none";
      resetButton.style.cursor = "pointer";

      // Add click event to reset everything
      resetButton.addEventListener("click", () => {
        document.getElementById("madLibForm").reset();
        container.innerHTML = "";
      });

      // Append the button to the container
      container.appendChild(resetButton);
    })
    .start();
}
