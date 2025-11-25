// assets/js/home.js
import { TextScramble } from "./textScramble.js";
console.log("home.js loaded");


document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector(".hero-scramble-text");
  if (!el) return; // safety

  const phrases = [
    "Hey, You!",
    "Welcome Aboard.",
    "Scroll To Know Me Better.",
  ];

  const fx = new TextScramble(el);
  let counter = 0;

  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 900);
    });
    counter = (counter + 1) % phrases.length;
  };

  next();
});
