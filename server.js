import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

if (!ANTHROPIC_API_KEY) {
  console.error('\n❌ ANTHROPIC_API_KEY environment variable is not set.');
  console.error('   Run with: ANTHROPIC_API_KEY=sk-ant-... node server.js\n');
  process.exit(1);
}

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json({ limit: '1mb' }));

app.post('/api/messages', async (req, res) => {
  const start = Date.now();
  const { model, max_tokens, system, messages } = req.body;

  console.log(`\n⚡ [${new Date().toLocaleTimeString()}] Prompt request received`);
  console.log(`   Model: ${model}`);
  console.log(`   Messages: ${messages?.length || 0}`);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({ model, max_tokens, system, messages })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`   ❌ Anthropic API error: ${response.status}`);
      console.error(`   ${errorBody}`);
      return res.status(response.status).json({
        error: `Anthropic API returned ${response.status}`,
        details: errorBody
      });
    }

    const data = await response.json();
    const elapsed = Date.now() - start;
    const tokenInfo = data.usage
      ? `(input: ${data.usage.input_tokens}, output: ${data.usage.output_tokens})`
      : '';

    console.log(`   ✅ Response received in ${elapsed}ms ${tokenInfo}`);
    res.json(data);
  } catch (err) {
    console.error(`   ❌ Proxy error: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`\n🟢 PromptBasic API Proxy running on http://localhost:${PORT}`);
  console.log(`   Proxying requests to Anthropic API`);
  console.log(`   API Key: ${ANTHROPIC_API_KEY.substring(0, 12)}...`);
  console.log(`   Waiting for requests...\n`);
});
