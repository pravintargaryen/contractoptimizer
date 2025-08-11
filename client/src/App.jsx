import { useState } from 'react';
import './App.css';

export default function App() {
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

const handleSubmit = async () => {
  console.log('📝 Submitting prompt and sourceCode...');
  setLoading(true);
  setResponse(null);
  setError(null);
  

  try {
    const res = await fetch('http://localhost:3000/optimize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: goal,
        sourceCode: `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
  uint256 public myNumber;

  constructor(uint256 _myNumber) {
    myNumber = _myNumber;
  }

  function setMyNumber(uint256 _myNumber) public {
    myNumber = _myNumber;
  }
}
        `
      })
    });
    console.log('📨 Server response status:', res.status);

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();
    setResponse(data);
  } catch (err) {
    setError(err.message || 'Something went wrong');
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Smart Contract Optimizer</h1>
      <textarea
        rows="10"
        cols="60"
        placeholder='E.g. "Optimize this contract to reduce gas below 10,000 units"'
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Optimizing & Deploying...' : 'Optimize and Deploy'}
      </button>

      {response && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Optimized Contract</h2>
          <pre style={{ background: '#252526', color: '#fff', padding: '1rem' }}>
            {response.optimizedContract}
          </pre>
          <h3>Deployed Address:</h3>
          <code>{response.contractAddress}</code>
        </div>
      )}

      {error && (
        <div style={{ color: 'red', marginTop: '1rem' }}>
          Error: {error}
        </div>
      )}
    </div>
  );
}
