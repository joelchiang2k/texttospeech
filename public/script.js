function generateRandomSentence() {
  fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(data => {
      const randomSentence = data.content;
      const textToSpeak = document.getElementById('textToSpeak');
      const randomSentenceElement = document.getElementById('randomSentence');

      textToSpeak.value = randomSentence;
 
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to fetch a random sentence. Please try again.');
    });
}

function updateImage() {
  const voiceSelect = document.getElementById('voiceSelect');
  const selectedOption = voiceSelect.options[voiceSelect.selectedIndex];
  const imageSrc = selectedOption.getAttribute('data-image');
  
  const voiceImage = document.getElementById('voiceImage');
  voiceImage.src = imageSrc;
}

function synthesizeSpeech() {
  const textToSpeak = document.getElementById('textToSpeak').value.trim();
  const selectedVoice = document.getElementById('voiceSelect').value;

  if (!textToSpeak) {
    alert('Please enter text to synthesize.');
    return;
  }

  // Use fetch to send a request to your server or AWS Lambda
  fetch('/synthesize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: textToSpeak, voice: selectedVoice }) // Include selected voice
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.blob();
  })
  .then(blob => {
    const audioPlayer = document.getElementById('audioPlayer');
    const audioURL = URL.createObjectURL(blob);
    
    audioPlayer.src = audioURL;
    audioPlayer.style.display = 'block';

    // Show the speech bubble
    const speechBubble = document.getElementById('speechBubble');
    const speechText = document.getElementById('speechText');
    speechText.textContent = textToSpeak;
    speechBubble.style.display = 'block';

    audioPlayer.play();

    // Hide the speech bubble when audio ends
    audioPlayer.onended = () => {
      speechBubble.style.display = 'none';
    };
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Speech synthesis failed. Please try again.');
  });
}
