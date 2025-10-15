// Your script here.
function populateVoices() {
  voices = speechSynthesis.getVoices();
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

function setVoice() {
  const selectedVoice = voices.find(voice => voice.name === voicesDropdown.value);
  if (selectedVoice) {
    msg.voice = selectedVoice;
    restart(); 
  }
}

function setOption() {
  msg[this.name] = this.value;
  restart(); 
}

function speak() {
  msg.text = document.querySelector('[name="text"]').value;
  if (!msg.text.trim()) return;
  speechSynthesis.speak(msg);
}

function stop() {
  speechSynthesis.cancel();
}

function restart() {
  stop();
  speak();
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', speak);
stopButton.addEventListener('click', stop);

populateVoices();
