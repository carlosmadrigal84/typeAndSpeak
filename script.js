const msg = new SpeechSynthesisUtterance();
let voices = [];//array donde las voces se guardan
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value;// Para seleccionar lo que hay dentro de la caja de mensaje
function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    /*.filter(voice => voice.lang.includes('en'))*/
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}
function setVoice() {// Para seleccionar la voz
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle();
}
function toggle(startOver = true) {// Función para empezar de 0 cada vez que hago un cambio.
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);//Método para que la voz diga el mensaje.
  }
}
function setOption() {
  //console.log(this.name, this.value);
  msg[this.name] = this.value;
  toggle();
}
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));