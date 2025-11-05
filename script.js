const username = "YOUR_GITHUB_USERNAME";
const repo = "YOUR_REPO_NAME";

const grid = document.getElementById("game-grid");

async function loadGames() {
  const apiURL = `https://api.github.com/repos/${username}/${repo}/contents/games`;
  const res = await fetch(apiURL);
  const folders = await res.json();

  for (const item of folders) {
    if (item.type !== "dir") continue;

    const folderName = item.name;
    const infoRes = await fetch(`games/${folderName}/info.json`);
    if (!infoRes.ok) continue;
    const info = await infoRes.json();

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="games/${folderName}/thumbnail.png" alt="${info.title}">
      <h2>${info.title}</h2>
      <p>${info.description}</p>
    `;

    card.onclick = () => {
      window.open(`games/${folderName}/index.html`, "_blank");
    };

    grid.appendChild(card);
  }
}

loadGames();
