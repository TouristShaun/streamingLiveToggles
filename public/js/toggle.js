document.addEventListener('DOMContentLoaded', () => {
  const diarizationToggle = document.getElementById('diarization');
  const smartFormatToggle = document.getElementById('smart-format');

  diarizationToggle.addEventListener('change', () => {
    updateTranscriptionSettings();
  });

  smartFormatToggle.addEventListener('change', () => {
    updateTranscriptionSettings();
  });

  async function updateTranscriptionSettings() {
    const audioUrl = document.getElementById('audio-url').value;
    const diarization = document.getElementById('diarization').checked;
    const smartFormat = document.getElementById('smart-format').checked;

    if (audioUrl) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioUrl, diarization, smartFormat }),
      };

      try {
        const response = await fetch('/api/edge-function', requestOptions);
        const data = await response.json();

        if (response.ok) {
          displayTranscriptionResults(data);
        } else {
          console.error('Error fetching transcription:', data);
          alert('Error fetching transcription. Please check the console for more details.');
        }
      } catch (error) {
        console.error('Error fetching transcription:', error);
        alert('Error fetching transcription. Please check the console for more details.');
      }
    }
  }

  function displayTranscriptionResults(data) {
    const formattedResults = data.results.channels[0].alternatives[0].transcript;
    const transcriptionResults = document.getElementById('transcription-results');
    transcriptionResults.textContent = formattedResults;
  }
});
