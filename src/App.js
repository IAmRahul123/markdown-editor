import React, { useState } from 'react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './App.css';

const App = () => {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');
  const [showPreview, setShowPreview] = useState(true);
  const API_BASE = process.env.REACT_APP_API_URL

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

  const handleToggle = () => {
    setShowPreview(prev => !prev)
  }
  return (
    <div className="App">
      <textarea
        value={markdown}
        onChange={handleMarkdownChange}
        placeholder="Type your markdown here..."
      />
      <div className="preview">
        <div className="switch-container">
          <input
            type="checkbox"
            id="switch"
            checked={showPreview}
            onChange={handleToggle}
          />
          <label htmlFor="switch" className="switch-label">
            {showPreview ? "Preview" : "Syntax"}
          </label>
        </div>

        {showPreview ? <div
          dangerouslySetInnerHTML={{ __html: html }}
        ></div> :
          <SyntaxHighlighter language="markdown" style={materialDark}>
            {html}
          </SyntaxHighlighter>
        }

      </div>
    </div>
  );
}

export default App;
