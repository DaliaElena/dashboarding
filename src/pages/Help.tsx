import { useState, useEffect } from 'react';
import marked from 'marked';
import readmeContent from '../utilities/README.md';

const Help: React.FC = () => {
  const [markdownContent, setMarkdownContent] = useState<string>('');

  useEffect(() => {
    fetch(readmeContent)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch README');
        }
        return response.text();
      })
      .then(data => setMarkdownContent(data))
      .catch(error => {
        console.error('Error fetching README:', error);
        setMarkdownContent('# Error\n\nFailed to load README. Please make sure it exists.');
      });
  }, []);

  const createMarkup = (content: string) => {
    return { __html: marked(content) };
  };

  return (
    <div className="help-container">
      <h2>Help</h2>
      <div dangerouslySetInnerHTML={createMarkup(markdownContent)} />
    </div>
  );
};

export default Help;
