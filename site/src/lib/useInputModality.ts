/* Tracks whether the user is currently driving with the keyboard or the
   pointer — the gate that lets focus-driven scene travel fire for Tab
   navigation without ever hijacking scroll on mouse clicks. */

let modality: "keyboard" | "pointer" = "pointer";
let installed = false;

export function installModalityTracker() {
  if (installed || typeof window === "undefined") return;
  installed = true;
  window.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Tab" || e.key.startsWith("Arrow")) modality = "keyboard";
    },
    true
  );
  window.addEventListener("pointerdown", () => (modality = "pointer"), true);
}

export function getInputModality() {
  return modality;
}
