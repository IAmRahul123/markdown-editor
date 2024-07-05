import React, { useState } from 'react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
      <div className="preview">
        <SyntaxHighlighter language="javascript" style={materialDark}>
          {markdown}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default App;
