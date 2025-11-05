document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("games-grid");

  try {
    const response = await fetch("games.json");
    if (!response.ok) throw new Error("Failed to load games.json");

    const games = await response.json();

    games.forEach(game => {
      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <img src="${game.thumbnail}" alt="${game.title}">
        <h2>${game.title}</h2>
        <p>${game.description}</p>
      `;
      card.onclick = () => window.location.href = `${game.folder}/index.html`;
      grid.appendChild(card);
    });

  } catch (err) {
    grid.innerHTML = `<p style="color:red;">Error loading games: ${err.message}</p>`;
    console.error(err);
  }
});
