import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

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
  
export default CallStatus;