import React, { useState } from 'react';

function App() {
  const [inputJson, setInputJson] = useState('');
  const [response, setResponse] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setInputJson(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const jsonInput = JSON.parse(inputJson);
      const response = await fetch('/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonInput),
      });
      const responseData = await response.json();
      setResponse(responseData);
      setError(null);
    } catch (error) {
      setError('Invalid JSON input');
    }
  };

  const handleOptionChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedOptions(selectedOptions);
  };
const renderResponse = () => {
    if (!response || !selectedOptions.length) return null;
    const filteredResponse = {};
    selectedOptions.forEach((option) => {
      filteredResponse[option] = response[option];
    });
    return (
      <div>
        <h2>Response</h2>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div>
      <h1>Roll Number: XXXXXXXX</h1>
      <form onSubmit={handleSubmit}>
        <textarea value={inputJson} onChange={handleInputChange} />
        <button type="submit">Submit</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      {response && (
        <div>
          <select multiple value={selectedOptions} onChange={handleOptionChange}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
          </select>
          {renderResponse()}
        </div>
      )}
 </div>
  );
}

export default App;
