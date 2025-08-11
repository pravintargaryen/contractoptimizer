const { mockOptimizeSoliditySource } = require('../mockOptimizer');
const { parsePromptWithML } = require('../nlpModel');

router.post('/optimize', async (req, res) => {
  const { sourceCode, prompt } = req.body;

  if (!sourceCode || !prompt) {
    return res.status(400).json({ error: 'Missing sourceCode or prompt' });
  }

  try {
    // (1) Use ML model to parse the prompt into structured intent
    const intent = await parsePromptWithML(prompt);  // <- ML INTEGRATION

    // (2) Send both code and intent to mock optimizer
    const optimizedCode = mockOptimizeSoliditySource(sourceCode, intent);

    res.json({ optimizedCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to optimize source' });
  }
});
