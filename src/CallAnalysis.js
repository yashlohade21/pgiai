import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

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
export default CallAnalysis