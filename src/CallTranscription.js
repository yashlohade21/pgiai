import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

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

export default CallTranscription;