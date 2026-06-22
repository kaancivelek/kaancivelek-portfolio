import { Howl, Howler } from "howler";

class AudioManager {
  ambient: Howl;
  hover: Howl;
  click: Howl;

  ambientVolume = 0.05;
  targetAmbientVolume = 0.2;
  muted = false;

  constructor() {
    this.ambient = new Howl({
      src: ["/audio/ambiant.mp3"],
      loop: true,
      volume: this.ambientVolume,
    });

    this.hover = new Howl({
      src: ["/audio/hover.wav"],
      volume: 0.3,
    });

    this.click = new Howl({
      src: ["/audio/click.wav"],
      volume: 0.4,
    });
  }

  start() {
    if (!this.ambient.playing()) {
      this.ambient.play();
    }
  }

  playHover() {
    this.hover.stop();
    this.hover.play();
  }

  playClick() {
    this.click.play();
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    Howler.mute(muted);
  }

  toggleMuted() {
    const next = !this.muted;
    this.setMuted(next);
    return next;
  }

  isMuted() {
    return this.muted;
  }

  setAmbientTarget(v: number) {
    this.targetAmbientVolume = v;
  }

  update() {
    this.ambientVolume += (this.targetAmbientVolume - this.ambientVolume) * 0.08;
    this.ambient.volume(this.ambientVolume);
  }
}

let instance: AudioManager | null = null;

export const getAudioManager = () => {
  if (!instance) {
    instance = new AudioManager();
  }

  return instance;
};
