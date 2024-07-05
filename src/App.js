import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');
  const API_BASE=process.env.REACT_APP_API_URL

  const handleMarkdownChange = async (e) => {
    const newMarkdown = e.target.value;
    setMarkdown(newMarkdown);

    try {
      const response = await axios.post(`${API_BASE}convert`, {
        markdown: newMarkdown,
      });
      setHtml(response.data.html);
    } catch (error) {
      console.error('Error converting markdown to HTML', error);
    }
  };

  return (
    <div className="App">
      <textarea
        value={markdown}
        onChange={handleMarkdownChange}
        placeholder="Type your markdown here..."
      />
      <div
        className="preview"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </div>
  );
}

export default App;
