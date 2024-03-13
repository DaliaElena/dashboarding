import { useState, useEffect } from 'react';

const HelpComponent = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null); // Especifica el tipo de error

  useEffect(() => {
    const fetchHtml = async () => {
      try {
        const response = await fetch('https://4wfr3j5pz4quixveyazqmwobvm0rqlmi.lambda-url.us-east-1.on.aws/dbos_info');
        if (!response.ok) {
          throw new Error('Failed to fetch HTML content');
        }
        let html = await response.text();
        // Remove leading and trailing quotes if present
        html = html.replace(/^"|"$/g, '');
        setHtmlContent(html);
      } catch (error) {
        if (error instanceof Error) { // Comprobación de tipo
          setError(error);
        } else {
          setError(new Error('An unknown error occurred'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHtml();
  }, []);

  if (loading) {
    return (
      <div className="column-dbos-center" style={{ minHeight: '100vh', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F9F9F9' }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="column-dbos-center" style={{ minHeight: '100vh', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F9F9F9' }}>
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="column-dbos-center" style={{ minHeight: '100vh', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F9F9F9' }}>
      <div id="html-container" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default HelpComponent;
