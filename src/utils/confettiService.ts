import confetti from "canvas-confetti";

// Vibrant aesthetic palette matching Aura Max dark luxury theme
const AURA_COLORS = [
  "#22d3ee", // Cyan
  "#6366f1", // Indigo
  "#38bdf8", // Sky Blue
  "#fb923c", // Flame Amber
  "#10b981", // Emerald Matrix
  "#f472b6", // Neon Rose
  "#ffffff", // Pure Light
];

/**
 * Plays a clean, pleasant ascending synthesizer chord using Web Audio API.
 * Gracefully silent if user has not interacted or browser blocks audio.
 */
export function playLevelUpSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    // Ascending arpeggio chords: C5 (523.25Hz), E5 (659.25Hz), G5 (783.99Hz), C6 (1046.5Hz)
    const notes = [523.25, 659.25, 783.99, 1046.5];
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);

      // Volume envelope with gentle attack & decay
      gain.gain.setValueAtTime(0.001, now + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.18, now + idx * 0.09 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.85);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 0.9);
    });
  } catch {
    // Audio is optional and non-blocking
  }
}

/**
 * Fires a spectacular multi-stage level-up confetti celebration.
 */
export function fireLevelUpConfetti() {
  // Stage 1: Massive center shockwave explosion
  confetti({
    particleCount: 110,
    spread: 80,
    startVelocity: 45,
    origin: { x: 0.5, y: 0.55 },
    colors: AURA_COLORS,
    ticks: 280,
    gravity: 0.85,
    scalar: 1.2,
    shapes: ["circle", "square"],
    disableForReducedMotion: true,
  });

  // Stage 2: Left cannon burst after 200ms
  setTimeout(() => {
    confetti({
      particleCount: 75,
      angle: 60,
      spread: 65,
      startVelocity: 55,
      origin: { x: 0.08, y: 0.7 },
      colors: AURA_COLORS,
      ticks: 300,
      gravity: 0.9,
      scalar: 1.1,
      disableForReducedMotion: true,
    });
  }, 200);

  // Stage 3: Right cannon burst after 350ms
  setTimeout(() => {
    confetti({
      particleCount: 75,
      angle: 120,
      spread: 65,
      startVelocity: 55,
      origin: { x: 0.92, y: 0.7 },
      colors: AURA_COLORS,
      ticks: 300,
      gravity: 0.9,
      scalar: 1.1,
      disableForReducedMotion: true,
    });
  }, 350);

  // Stage 4: Gentle raining sparkle shower from top
  setTimeout(() => {
    confetti({
      particleCount: 60,
      spread: 120,
      startVelocity: 25,
      origin: { x: 0.5, y: 0.1 },
      colors: ["#22d3ee", "#6366f1", "#fb923c", "#ffffff"],
      ticks: 350,
      gravity: 0.6,
      scalar: 0.9,
      disableForReducedMotion: true,
    });
  }, 600);
}

/**
 * Fires a lightweight micro-burst for clicking claim or completing a quest.
 */
export function fireMicroConfetti(x = 0.5, y = 0.6) {
  confetti({
    particleCount: 35,
    spread: 55,
    startVelocity: 30,
    origin: { x, y },
    colors: ["#22d3ee", "#6366f1", "#38bdf8"],
    ticks: 180,
    gravity: 1,
    scalar: 0.9,
    disableForReducedMotion: true,
  });
}
