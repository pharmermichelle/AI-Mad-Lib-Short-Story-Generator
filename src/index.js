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

  const prompt = `Write a whimsical short story where a character named ${name}, who is very ${adjective}, meets a mysterious ${animal} while exploring ${place}. Along the way, they discover a magical ${object} that changes their life. Keep it lighthearted and imaginative.`;

  const apiUrl = "https://api.shecodes.io/ai/v1/generate";
  const apiKey = "06c63cbc3e714d4fd60883of7efa4t87";

  document.getElementById("storiesContainer").innerHTML =
    "Creating your story...";

  axios
    .post(apiUrl, {
      key: apiKey,
      prompt: prompt,
    })
    .then((response) => {
      const story =
        response.data.answer || "Oops! Couldn’t fetch your story. Try again!";
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
  container.innerHTML = ""; // Clear previous content

  const typewriter = new Typewriter(container, {
    loop: false,
    delay: 30,
  });

  typewriter.typeString(storyText).start();
}
