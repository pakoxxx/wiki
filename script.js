// ============================================
// San Valentino Pixel Art - JavaScript Completo
// With SMOOTH animations
// ============================================

// Configurazione globale
const config = {
  typewriterSpeed: 30,
  particleCount: 15,
  starCount: 50,
};

// Stato globale
let currentScene = 1;
let userChoice = null;
let heartsFilled = 0;
let audioContext = null;
let meowAudio = null;
let popAudio = null;

// Testi per le scene
const sceneTexts = {
  intro:
    "Ho preparato qualcosa di speciale per te... \nUn piccolo viaggio attraverso tutto quello che provo! Sei pronta a scoprirlo?",

  vacation:
    "Immagino di viaggiare insieme a te, di scoprire posti nuovi mano nella mano. Vedere il mondo con i tuoi occhi, condividere tramonti mozzafiato, perderci in città sconosciute... Ogni viaggio sarebbe un'avventura indimenticabile perchè sarei con te!",

  living:
    "Immagino di svegliarmi ogni mattina al tuo fianco, di condividere una casa che sia davvero nostra. Preparare la colazione insieme, tornare a casa e trovarti lì, costruire la nostra routine quotidiana... Ogni giorno sarebbe speciale perchè lo vivremmo insieme!",

  scene8:
    "Quello che amo di te... \nIl tuo sorriso che illumina tutto... \nLa tua dolcezza che mi fa sentire speciale... \nLa tua passione per la danza, quando ti vedo ballare e i tuoi occhi brillano... \nE quell'energia unica che porti in tutto quello che fai! ",

  scene9:
    "Prometto di essere sempre al tuo fianco, nei momenti belli e in quelli difficili. Prometto di amarti oggi, domani e per sempre! Perchè con te, ho trovato la mia metà!",

  finalLetter: `Mia Wiki,

Mentre scrivo questa lettera, il mio cuore è pieno di amore e gratitudine. 
Sei la persona più speciale che abbia mai incontrato, e ogni giorno che passo con te al mio fianco diventa migliore.
Ricordo il primo momento in cui ti ho vista: i tuoi occhi brillavano, e il tuo sorriso ha illuminato la mia vita da quel giorno.
Mi fai ridere quando sono triste, mi dai forza quando sono debole, mi ispiri a essere una persona migliore ogni giorno.
Ogni tua piccola abitudine mi fa innamorare di più: il modo in cui mi guardi, come crolli sul mio braccio mentre guido, la tua passione per la danza che ti fa brillare gli occhi quando ne parli o quando ti vedo ballare... Sei perfetta!
Promettiamoci di continuare a crescere insieme, di affrontare ogni sfida mano nella mano.
Grazie per essere la mia migliore amica, la mia complice, il mio amore.
Ti amo più di quanto le parole possano esprimere, più di tutte le stelle nel cielo, più di ogni pixel in questo sito che ho creato per te!

Per sempre tuo,
Pako

P.S. Questo è solo l'inizio della nostra storia... il meglio deve ancora venire!`,
};

// ============================================
// Smooth Button Show/Hide Helper
// ============================================

function showButton(button) {
  // Remove hidden class to trigger smooth animation
  button.classList.remove("hidden");
  // Force reflow for animation
  button.offsetHeight;
}

function hideButton(button) {
  // Add hidden class for smooth fade out
  button.classList.add("hidden");
}

// ============================================
// Inizializzazione
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  initStars();
  initEventListeners();
  initAudio();
});

// ============================================
// Stelline animate
// ============================================

function initStars() {
  const container = document.getElementById("starsContainer");

  for (let i = 0; i < config.starCount; i++) {
    const star = document.createElement("div");
    star.className = Math.random() > 0.5 ? "star purple" : "star";

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 3 + "s";
    star.style.animationDuration = 2 + Math.random() * 2 + "s";

    container.appendChild(star);
  }
}

// ============================================
// Audio Setup
// ============================================

function initAudio() {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Create audio element for meow sound
  meowAudio = new Audio("assets/meow.mp3");
  meowAudio.preload = "auto";

  // Create audio element for pop/heartbeat sound
  popAudio = new Audio("assets/pop.mp3");
  popAudio.preload = "auto";

  window.playPop = function () {
    try {
      popAudio.currentTime = 0;
      popAudio.play().catch((error) => {
        console.log("Audio play error:", error);
      });
    } catch (e) {
      console.log("Audio error:", e);
    }
  };

  window.playMeow = function () {
    try {
      meowAudio.currentTime = 0;
      meowAudio.play().catch((error) => {
        console.log("Audio play error:", error);
      });
    } catch (e) {
      console.log("Audio error:", e);
    }
  };
}

// ============================================
// Typewriter Effect
// ============================================

function typeWriter(element, text, speed = config.typewriterSpeed, callback) {
  element.textContent = "";
  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }

  type();
}

// ============================================
// Scene Management
// ============================================

function showScene(sceneNumber) {
  const scenes = document.querySelectorAll(".scene");
  scenes.forEach((scene, index) => {
    if (index + 1 === sceneNumber) {
      scene.classList.add("active");
    } else {
      scene.classList.remove("active");
    }
  });
  currentScene = sceneNumber;
}

// ============================================
// Event Listeners
// ============================================

function initEventListeners() {
  // Scena 1: Busta
  const envelope = document.getElementById("envelopePixel");
  envelope.addEventListener("click", () => {
    showScene(2);
    startScene2();
  });

  // Scena 2: Start
  const btnStart = document.getElementById("btnStart");
  btnStart.addEventListener("click", () => {
    showScene(3);
    startScene3();
  });

  // Scena 4: Continue
  const btnContinue4 = document.getElementById("btnContinue4");
  btnContinue4.addEventListener("click", () => {
    showScene(5);
    startScene5();
  });

  // Scena 5: Choices
  const choiceVacation = document.getElementById("choiceVacation");
  const choiceLiving = document.getElementById("choiceLiving");

  choiceVacation.addEventListener("click", () => {
    userChoice = "vacation";
    showScene(6);
    startScene6();
  });

  choiceLiving.addEventListener("click", () => {
    userChoice = "living";
    showScene(6);
    startScene6();
  });

  // Scena 6: Continue
  const btnContinue6 = document.getElementById("btnContinue6");
  btnContinue6.addEventListener("click", () => {
    showScene(7);
    startScene7();
  });

  // Scena 7: Continue
  const btnContinue7 = document.getElementById("btnContinue7");
  btnContinue7.addEventListener("click", () => {
    showScene(8);
    startScene8();
  });

  // Scena 8: Continue
  const btnContinue8 = document.getElementById("btnContinue8");
  btnContinue8.addEventListener("click", () => {
    showScene(9);
    startScene9();
  });

  // Scena 9: Continue
  const btnContinue9 = document.getElementById("btnContinue9");
  btnContinue9.addEventListener("click", () => {
    showScene(10);
    startScene10();
  });

  // Scena 10: Restart
  const btnRestart = document.getElementById("btnRestart");
  btnRestart.addEventListener("click", () => {
    location.reload();
  });
}

// ============================================
// Scena 2: Introduzione
// ============================================

function startScene2() {
  const textElement = document.getElementById("intro-text");
  const button = document.getElementById("btnStart");

  hideButton(button);

  typeWriter(textElement, sceneTexts.intro, 30, () => {
    // Smooth button appearance after text is done
    setTimeout(() => {
      showButton(button);
    }, 300);
  });
}

// ============================================
// Scena 3: Gioco Cuori
// ============================================

function startScene3() {
  const hearts = document.querySelectorAll(".heart-pixel");
  heartsFilled = 0;

  hearts.forEach((heart, index) => {
    heart.addEventListener("click", function heartClick() {
      if (heart.getAttribute("data-filled") === "false") {
        heart.setAttribute("data-filled", "true");
        heartsFilled++;

        // Play sound
        if (window.playPop) {
          window.playPop();
        }

        // Create particles
        const rect = heart.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        createParticles(x, y);

        // Check if all hearts filled
        if (heartsFilled === 5) {
          setTimeout(() => {
            showScene(4);
            startScene4();
          }, 800);
        }
      }
    });
  });
}

// ============================================
// Particle System - SPARKLE BLUE IMAGES
// ============================================

function createParticles(x, y) {
  const container = document.getElementById("particlesContainer");
  const particleCount = 12; // numero di scintille

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("img");
    particle.className = "particle";
    particle.src = "assets/sparkle-blue.png";
    particle.alt = "sparkle";

    particle.style.position = "absolute";
    particle.style.left = x + "px";
    particle.style.top = y + "px";
    particle.style.width = "24px";
    particle.style.height = "24px";
    particle.style.pointerEvents = "none";

    const angle = (Math.PI * 2 * i) / particleCount;
    const velocity = 60 + Math.random() * 80;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    particle.style.setProperty("--tx", tx + "px");
    particle.style.setProperty("--ty", ty + "px");

    container.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1000);
  }
}

// ============================================
// Scena 4: Gatto Interattivo
// ============================================

function startScene4() {
  const cat = document.getElementById("catPixel");
  const popup = document.getElementById("meowPopup");

  cat.addEventListener("click", function () {
    cat.classList.add("clicked");
    popup.classList.remove("hidden");
    popup.classList.add("show");

    if (window.playMeow) {
      window.playMeow();
    }

    setTimeout(() => {
      cat.classList.remove("clicked");
    }, 600);

    setTimeout(() => {
      popup.classList.remove("show");
      popup.classList.add("hidden");
    }, 2000);
  });
}

// ============================================
// Scena 5: Branching
// ============================================

function startScene5() {
  // Choices are already set up in event listeners
}

// ============================================
// Scena 6: Risultato Scelta
// ============================================

function startScene6() {
  const textElement = document.getElementById("scene6-text");
  const button = document.getElementById("btnContinue6");

  hideButton(button);

  const text =
    userChoice === "vacation" ? sceneTexts.vacation : sceneTexts.living;

  typeWriter(textElement, text, 30, () => {
    setTimeout(() => {
      showButton(button);
    }, 300);
  });
}

// ============================================
// Scena 7: Momento Romantico
// ============================================

function startScene7() {
  // Romantic quote è già visibile, no typewriter needed per il titolo
}

// ============================================
// Scena 8: Qualità
// ============================================

function startScene8() {
  const textElement = document.getElementById("scene8-text");
  const button = document.getElementById("btnContinue8");

  hideButton(button);

  typeWriter(textElement, sceneTexts.scene8, 30, () => {
    setTimeout(() => {
      showButton(button);
    }, 300);
  });
}

// ============================================
// Scena 9: Promessa
// ============================================

function startScene9() {
  const textElement = document.getElementById("scene9-text");
  const button = document.getElementById("btnContinue9");

  hideButton(button);

  typeWriter(textElement, sceneTexts.scene9, 30, () => {
    setTimeout(() => {
      showButton(button);
    }, 300);
  });
}

// ============================================
// Scena 10: Lettera Finale
// ============================================

function startScene10() {
  const textElement = document.getElementById("scene10-text");
  const bouquetContainer = document.getElementById("bouquetContainer");
  const signature = document.getElementById("finalSignature");
  const button = document.getElementById("btnRestart");
  const finalSceneContainer = document.querySelector(".final-scene");

  // Scrolla in alto all'inizio della scena
  if (finalSceneContainer) {
    finalSceneContainer.scrollTop = 0;
  }

  bouquetContainer.classList.add("hidden");
  signature.classList.add("hidden");
  hideButton(button);

  typeWriter(textElement, sceneTexts.finalLetter, 30, () => {
    setTimeout(() => {
      bouquetContainer.classList.remove("hidden");
    }, 500);

    setTimeout(() => {
      signature.classList.remove("hidden");
    }, 1000);

    setTimeout(() => {
      showButton(button);
    }, 1500);
  });
}

// ============================================
// Prevent zoom on mobile
// ============================================

let lastTouchEnd = 0;
document.addEventListener(
  "touchend",
  (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  },
  false,
);

// Prevent scroll EXCEPT in scene 10
document.body.addEventListener(
  "touchmove",
  (e) => {
    // Allow scroll in scene 10 (final letter)
    const scene10 = document.getElementById("scene10");
    if (scene10 && scene10.classList.contains("active")) {
      return; // Allow scrolling in final scene
    }

    // Prevent scroll in other scenes except on interactive elements
    if (
      e.target.tagName !== "BUTTON" &&
      !e.target.classList.contains("heart-pixel") &&
      !e.target.classList.contains("cat-pixel") &&
      !e.target.classList.contains("choice-button")
    ) {
      e.preventDefault();
    }
  },
  { passive: false },
);
