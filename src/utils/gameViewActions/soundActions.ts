const soundActions = {
  stopSound: function (audio: HTMLAudioElement) {
    audio.pause();
    audio.currentTime = 0;
  },

  playSound: function (audio: HTMLAudioElement) {
    this.stopSound(audio);
    audio.play();
  },
};

export default soundActions;
