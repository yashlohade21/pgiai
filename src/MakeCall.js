import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const MakeCall = () => {
  const [callData, setCallData] = useState({
    name: '',
    phoneNumber: '',
    campID: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCallData({ ...callData, [name]: value });
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
          <Button variant="primary" onClick={makeCall}>Make Call</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default MakeCall;