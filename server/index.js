import express from 'express';
import cors from 'cors';  
import { mockOptimizeSoliditySource }  from './mockoptimizer.js';
import { parsePromptWithML } from './nlpmodel.js';
import deploy from './deploy.js';

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.get('/', async (req, res) => {
  await res.json({
  "gasBound": 10000,
  "transformations": ["inline", "remove_redundant_store"]
});
});



app.post('/optimize', async (req, res) => {
  const { sourceCode, prompt } = req.body;

  if (!sourceCode || !prompt) {
    return res.status(400).json({ error: 'Missing sourceCode or prompt' });
  }

  try {
    // (1) Use ML model to parse the prompt into structured intent
    const intent = await parsePromptWithML(prompt);  // <- ML INTEGRATION

    // (2) Send both code and intent to mock optimizer
    const optimizedCode = mockOptimizeSoliditySource(sourceCode, intent);

    // 3. Deploy
  const address = await deploy(optimizedCode);

  // 4. Return result
  res.json({
    optimizedContract: optimizedCode,
    contractAddress: address
  });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to optimize source' });
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
