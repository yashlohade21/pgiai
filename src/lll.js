import React, { useState } from 'react';
import { Form, Button, Card, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Papa from 'papaparse'; // Import Papaparse for CSV handling

// Campaign Creation Component
const CampaignCreation = () => {
  const [campaignData, setCampaignData] = useState({
    title: '',
    voice: '',
    language: '',
    script: '',
    knowledgeBase: null,
    purpose: '', 
    calendar: '', 
    firstLine: '', 
    tone: '', 
    postCallAnalysis: false,
    postCallAnalysisSchema: {} 
  });

  const [createdCampaign, setCreatedCampaign] = useState(null); 

  const supportedData = {
    languages: ['English', 'Spanish', 'French', 'German'],
    voices: ['Voice1', 'Voice2', 'Voice3']
  };

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
          knowledgeBase: uploadData.knowledgeBaseURL,
          purpose: campaignData.purpose,
          calendar: campaignData.calendar,
          firstLine: campaignData.firstLine,
          tone: campaignData.tone,
          postCallAnalysis: campaignData.postCallAnalysis,
          postCallAnalysisSchema: campaignData.postCallAnalysisSchema
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
          <Form.Group controlId="purpose">
            <Form.Label>Purpose:</Form.Label>
            <Form.Control type="text" name="purpose" value={campaignData.purpose} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="calendar">
            <Form.Label>Calendar:</Form.Label>
            <Form.Control type="text" name="calendar" value={campaignData.calendar} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="firstLine">
            <Form.Label>First Line:</Form.Label>
            <Form.Control type="text" name="firstLine" value={campaignData.firstLine} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="tone">
            <Form.Label>Tone:</Form.Label>
            <Form.Control type="text" name="tone" value={campaignData.tone} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="postCallAnalysis">
            <Form.Check 
              type="checkbox"
              label="Enable Post Call Analysis"
              name="postCallAnalysis"
              checked={campaignData.postCallAnalysis}
              onChange={(e) => setCampaignData({ ...campaignData, postCallAnalysis: e.target.checked })}
            />
          </Form.Group>
          {/* ... (Add more fields as needed for postCallAnalysisSchema) */}
          <Button variant="primary" onClick={createCampaign}>Create Campaign</Button>
        </Form>

        {createdCampaign && (
          <div className="mt-3">
            <h3>Campaign Created Successfully!</h3>
            <p><strong>ID:</strong> {createdCampaign.id}</p> 
            <p><strong>Title:</strong> {createdCampaign.title}</p>
            {/* Add other details as needed */}
            <p>
              <strong>Campaign ID:</strong> {createdCampaign.id} {/* Display the campaign ID */}
            </p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

// Make Call Component
const MakeCall = () => {
  const [callData, setCallData] = useState({
    name: '',
    phoneNumber: '',
    campID: '' // Add campID to callData state
  });

  const [contacts, setContacts] = useState([]);
  const [csvFile, setCsvFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCallData({ ...callData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
  };

  const parseCSV = () => {
    if (csvFile) {
      Papa.parse(csvFile, {
        header: true,
        complete: (results) => {
          setContacts(results.data);
        }
      });
    }
  };

  const makeCall = async () => {
    try {
      const makeCallResponse = await fetch('http://localhost:3000/make-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: callData.name,
          phoneNumber: callData.phoneNumber,
          campID: callData.campID 
        })
      });
      const callDataResponse = await makeCallResponse.json();
      console.log('Call made:', callDataResponse);
      // Update UI or perform actions after call is made
    } catch (error) {
      console.error('Error making call:', error);
    }
  };

  return (
    <Card className="mt-4">
      <Card.Body>
        <h2>Make a Call</h2>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" name="name" value={callData.name} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="phone-number">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control type="tel" name="phoneNumber" value={callData.phoneNumber} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="camp-id">
            <Form.Label>Campaign ID:</Form.Label>
            <Form.Control type="text" name="campID" value={callData.campID} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="csv-file">
            <Form.Label>Upload CSV (Name, Phone Number):</Form.Label>
            <Form.Control type="file" accept=".csv" onChange={handleFileChange} />
            <Button variant="secondary" onClick={parseCSV} className="mt-2">Parse CSV</Button>
          </Form.Group>
          <Button variant="primary" onClick={makeCall}>Make Call</Button>
        </Form>

        {/* Display contacts from CSV */}
        {contacts.length > 0 && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={index}>
                  <td>{contact.name}</td>
                  <td>{contact.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

// Call Status Component
const CallStatus = () => {
  const [callId, setCallId] = useState('');
  const [callStatus, setCallStatus] = useState(null); 

  const getCallStatus = async () => {
    try {
      const response = await fetch(`http://localhost:3000/call-status/${callId}`);
      const data = await response.json();
      console.log('Call status:', data);
      setCallStatus(data); 
    } catch (error) {
      console.error('Error getting call status:', error);
    }
  };

  return (
    <Card className="mt-4">
      <Card.Body>
        <h2>Call Status</h2>
        <Form>
          <Form.Group controlId="call-id">
            <Form.Label>Call ID:</Form.Label>
            <Form.Control type="text" value={callId} onChange={(e) => setCallId(e.target.value)} />
          </Form.Group>
          <Button variant="primary" onClick={getCallStatus}>Get Call Status</Button>
          <div className="mt-3">
            <strong>Call Status:</strong> {callStatus && <span>{callStatus.status}</span>}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

// Call Transcription Component
const CallTranscription = () => {
  const [callId, setCallId] = useState('');
  const [callTranscription, setCallTranscription] = useState('');

  const getTranscription = async () => {
    try {
      const response = await fetch(`http://localhost:3000/get-transcription/${callId}`);
      const data = await response.json();
      console.log('Transcription:', data);
      setCallTranscription(data.transcription); 
    } catch (error) {
      console.error('Error getting transcription:', error);
    }
  };

  return (
    <Card className="mt-4">
      <Card.Body>
        <h2>Call Transcription</h2>
        <Form>
          <Form.Group controlId="call-id-transcription">
            <Form.Label>Call ID:</Form.Label>
            <Form.Control type="text" value={callId} onChange={(e) => setCallId(e.target.value)} />
          </Form.Group>
          <Button variant="primary" onClick={getTranscription}>Get Transcription</Button>
          <div className="mt-3">
            <strong>Transcription:</strong> {callTranscription && <span>{callTranscription}</span>}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

// Call Analysis Component
const CallAnalysis = () => {
  const [callId, setCallId] = useState('');
  const [callAnalysis, setCallAnalysis] = useState('');

  const getAnalysis = async () => {
    try {
      const response = await fetch(`http://localhost:3000/get-post-call-analysis/${callId}`);
      const data = await response.json();
      console.log('Analysis:', data);
      setCallAnalysis(data.analysis);
    } catch (error) {
      console.error('Error getting analysis:', error);
    }
  };

  return (
    <Card className="mt-4">
      <Card.Body>
        <h2>Post-Call Analysis</h2>
        <Form>
          <Form.Group controlId="call-id-analysis">
            <Form.Label>Call ID:</Form.Label>
            <Form.Control type="text" value={callId} onChange={(e) => setCallId(e.target.value)} />
          </Form.Group>
          <Button variant="primary" onClick={getAnalysis}>Get Analysis</Button>
          <div className="mt-3">
            <strong>Analysis:</strong> {callAnalysis && <span>{callAnalysis}</span>}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

// Update Campaign Component
const UpdateCampaign = () => {
  const [campId, setCampId] = useState('');
  const [campaignData, setCampaignData] = useState({
    title: '',
    voice: '',
    language: '',
    script: '',
    knowledgeBase: '',
    purpose: '', 
    calendar: '', 
    firstLine: '', 
    tone: '', 
    postCallAnalysis: false,
    postCallAnalysisSchema: {} 
  });
  const [updatedCampaign, setUpdatedCampaign] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCampaignData({ ...campaignData, [name]: value });
  };

  const updateCampaign = async () => {
    try {
      const updateResponse = await fetch(`http://localhost:3000/update-campaign/${campId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          campaignModelData: campaignData
        })
      });
      const updateData = await updateResponse.json();
      console.log('Campaign Updated:', updateData);
      setUpdatedCampaign(updateData);
    } catch (error) {
      console.error('Error updating campaign:', error);
    }
  };

  return (
    <Card className="mt-4">
      <Card.Body>
        <h2>Update Campaign</h2>
        <Form>
          <Form.Group controlId="campId">
            <Form.Label>Campaign ID:</Form.Label>
            <Form.Control 
              type="text" 
              name="campId" 
              value={campId} 
              onChange={(e) => setCampId(e.target.value)} 
            />
          </Form.Group>
          <Form.Group controlId="title">
            <Form.Label>Title:</Form.Label>
            <Form.Control type="text" name="title" value={campaignData.title} onChange={handleInputChange} />
          </Form.Group>
          {/* Add other input fields for voice, language, script, etc.  */}
          <Button variant="primary" onClick={updateCampaign}>Update Campaign</Button>
        </Form>

        {updatedCampaign && (
          <div className="mt-3">
            <h3>Campaign Updated Successfully!</h3>
            <p><strong>ID:</strong> {updatedCampaign.id}</p> 
            <p><strong>Title:</strong> {updatedCampaign.title}</p>
            {/* Add other details as needed */}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

// App Component
const App = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Toingg Campaign Page</h1>
      <div className="row">
        <div className="col-md-6">
          <CampaignCreation />
          <UpdateCampaign />
        </div>
        <div className="col-md-6">
          <MakeCall />
          <CallStatus />
          <CallTranscription />
          <CallAnalysis />
        </div>
      </div>
    </div>
  );
};

export default App;

