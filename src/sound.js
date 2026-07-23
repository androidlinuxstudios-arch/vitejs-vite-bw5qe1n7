// sound.js

class SoundEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  beep(freq, duration, type = "square", volume = 0.05) {
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.value = freq;

    gain.gain.value = volume;

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      this.ctx.currentTime + duration
    );

    osc.stop(this.ctx.currentTime + duration);
  }

  laser() {
    this.beep(900, 0.06, "square", 0.04);
  }

  explosion() {
    this.beep(120, 0.25, "sawtooth", 0.08);
  }

  hit() {
    this.beep(220, 0.18, "triangle", 0.06);
  }
}

export const sound = new SoundEngine();