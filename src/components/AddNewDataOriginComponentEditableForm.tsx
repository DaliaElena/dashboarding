import React, { useState, useEffect } from 'react';
import { API_URL_DATA_SOURCE, API_URL_DATA } from '../config';

interface MatchedContent {
  [key: string]: string;
}

const AddNewDataOriginComponentEditableForm: React.FC = () => {
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const [matchedContent, setMatchedContent] = useState<MatchedContent | null>(null);

  useEffect(() => {
    fetch(API_URL_DATA_SOURCE)
      .then(response => response.json())
      .then((data: Record<string, any>) => {
        const originParam = new URLSearchParams(window.location.search).get('origin') || '';
        if (originParam && data.hasOwnProperty(originParam)) {
          const emptyValues: MatchedContent = {};
          Object.keys(data[originParam]).forEach(key => {
            emptyValues[key] = '';
          });
          setMatchedContent(emptyValues);
        } else {
          setMatchedContent(null);
        }
      })
      .catch(error => console.error('Error fetching data:', error));

    const urlParams = new URLSearchParams(window.location.search);
    const nameParam = urlParams.get('Name') || '';
    const originParam = urlParams.get('origin') || '';
  
    setName(nameParam);
    setOrigin(originParam);
  }, [origin]);

  const renderFormFields = () => {
    if (!matchedContent) return null;

    return Object.keys(matchedContent).map((key) => (
      <div className="mb-3" key={key}>
        <label htmlFor={`${key}Input`} className="form-label">{key}:</label>
        <input 
          type="text" 
          className="form-control" 
          id={`${key}Input`} 
          value={matchedContent[key] || ''} 
          onChange={(e) => setMatchedContent({...matchedContent, [key]: e.target.value})} 
        />
      </div>
    ));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Form Data:", { name, origin, matchedContent });

    fetch(API_URL_DATA + `?origin=${origin}&name=${name}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        selectedOption: origin,
        user: name,
        password: name
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('PUT request successful:', data);
      window.location.href = '/DataOriginHistory';
    })
    .catch(error => {
      console.error('Error during PUT request:', error);
    });
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Edit data origin information</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nameInput" className="form-label">Name:</label>
            <input type="text" className="form-control" id="nameInput" value={name} readOnly />
          </div>
          <div className="mb-3">
            <label htmlFor="originInput" className="form-label">Origin:</label>
            <input type="text" className="form-control" id="originInput" value={origin} readOnly />
          </div>
          {renderFormFields()}
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddNewDataOriginComponentEditableForm;
