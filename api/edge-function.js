const { VercelRequest, VercelResponse } = require('@vercel/node');
const Deepgram = require('deepgram');

const deepgram = new Deepgram(process.env.DEEPGRAM_API_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const { audioUrl, diarization, smartFormat } = req.body;

  if (!audioUrl) {
    res.status(400).send('Missing audio URL');
    return;
  }

  try {
    const response = await deepgram.streaming.transcribe({
      url: audioUrl,
      diarization: diarization === 'true',
      smartFormat: smartFormat === 'true',
    });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(response));
  } catch (error) {
    console.error('Error transcribing audio:', error);
    res.status(500).send('Error transcribing audio');
  }
};
