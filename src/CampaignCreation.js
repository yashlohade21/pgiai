import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const supportedData = {
  languages: ['English', 'Spanish', 'French', 'German'],
  voices: ['Voice1', 'Voice2', 'Voice3']
};

const CampaignCreation = () => {
  const [campaignData, setCampaignData] = useState({
    title: '',
    voice: '',
    language: '',
    script: '',
    knowledgeBase: null
  });

  const [createdCampaign, setCreatedCampaign] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCampaignData({ ...campaignData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCampaignData({ ...campaignData, knowledgeBase: file });
  };

  const createCampaign = async () => {
    try {
      const formData = new FormData();
      formData.append('file', campaignData.knowledgeBase);
      const uploadResponse = await fetch('http://localhost:3000/upload-knowledge-base', {
        method: 'POST',
        body: formData
      });
      const uploadData = await uploadResponse.json();

      const createResponse = await fetch('http://localhost:3000/create-campaign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: campaignData.title,
          voice: campaignData.voice,
          language: campaignData.language,
          script: campaignData.script,
          knowledgeBase: uploadData.knowledgeBaseURL
        })
      });
      const createData = await createResponse.json();
      console.log('Campaign created:', createData);
      setCreatedCampaign(createData); 
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  return (
    <Card className="mt-4">
      <Card.Body>
        <h2>Create Campaign</h2>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title:</Form.Label>
            <Form.Control type="text" name="title" value={campaignData.title} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="voice">
            <Form.Label>Voice:</Form.Label>
            <Form.Control as="select" name="voice" value={campaignData.voice} onChange={handleInputChange}>
              <option value="">Select Voice</option>
              {supportedData.voices.map((voice, index) => (
                <option key={index} value={voice}>{voice}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="language">
            <Form.Label>Language:</Form.Label>
            <Form.Control as="select" name="language" value={campaignData.language} onChange={handleInputChange}>
              <option value="">Select Language</option>
              {supportedData.languages.map((language, index) => (
                <option key={index} value={language}>{language}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="script">
            <Form.Label>Script:</Form.Label>
            <Form.Control as="textarea" rows={3} name="script" value={campaignData.script} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="knowledge-base-file">
            <Form.Label>Upload Knowledge Base File:</Form.Label>
            <Form.Control type="file" name="knowledgeBase" onChange={handleFileChange} />
          </Form.Group>
          <Button variant="primary" onClick={createCampaign}>Create Campaign</Button>
        </Form>

        {createdCampaign && (
          <div className="mt-3">
            <h3>Campaign Created Successfully!</h3>
            <p><strong>ID:</strong> {createdCampaign.id}</p> 
            <p><strong>Title:</strong> {createdCampaign.title}</p>
            {/* Add other details as needed */}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default CampaignCreation;