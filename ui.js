const folders = [...document.querySelectorAll(".folder")];

function setOpen(folder, open) {
  folder.classList.toggle("open", open);
  folder.querySelector(".tab").setAttribute("aria-expanded", open);
}

folders.forEach((folder) => {
  folder.querySelector(".tab").addEventListener("click", () => {
    const wasOpen = folder.classList.contains("open");
    folders.forEach((f) => setOpen(f, false));
    setOpen(folder, !wasOpen);
    if (!wasOpen) folder.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
setOpen(folders[0], true);

new MutationObserver(() => {
  document.querySelectorAll("#searchTableBody tr").forEach((row) => {
    if (row.lastElementChild.textContent.trim() === "Match") row.classList.add("match");
  });
}).observe(document.getElementById("searchTableBody"), { childList: true });
