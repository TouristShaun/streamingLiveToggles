class DeepgramStreaming {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async transcribe(audioUrl, diarization, smartFormat) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ audioUrl, diarization, smartFormat }),
    };

    try {
      const response = await fetch('/api/edge-function', requestOptions);
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        console.error('Error fetching transcription:', data);
        throw new Error('Error fetching transcription');
      }
    } catch (error) {
      console.error('Error fetching transcription:', error);
      throw error;
    }
  }
}

const deepgramStreaming = new DeepgramStreaming();

export default deepgramStreaming;
