const username = "jurakii";
const repo = "GamePage";

const grid = document.getElementById("game-grid");

async function loadGames() {
  try {
    const apiURL = `https://api.github.com/repos/${username}/${repo}/contents/games?ref=main`;
    const res = await fetch(apiURL);
    if (!res.ok) throw new Error("Could not load game list.");
    const folders = await res.json();

    for (const item of folders) {
      if (item.type !== "dir") continue;

      const folderName = item.name;

      // Load game info.json
      let info = { title: folderName, description: "No description available." };
      try {
        const infoRes = await fetch(`games/${folderName}/info.json`);
        if (infoRes.ok) info = await infoRes.json();
      } catch (e) {
        console.warn(`Missing or bad info.json in ${folderName}`);
      }

      // Try to load thumbnail
      let thumbPath = `games/${folderName}/thumbnail.png`;
      try {
        const thumbRes = await fetch(thumbPath);
        if (!thumbRes.ok) thumbPath = "default-thumbnail.png";
      } catch (e) {
        thumbPath = "default-thumbnail.png";
      }

      // Build game card
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${thumbPath}" alt="${info.title}">
        <h2>${info.title}</h2>
        <p>${info.description}</p>
      `;

      card.onclick = () => {
        window.open(`games/${folderName}/index.html`, "_blank");
      };

      grid.appendChild(card);
    }
  } catch (err) {
    console.error("Error loading games:", err);
    grid.innerHTML = `<p>⚠️ Failed to load game list. Check console for details.</p>`;
  }
}

loadGames();
