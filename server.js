const express = require('express');
const fetch = require('node-fetch');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const port = 3000;

const upload = multer({ dest: 'uploads/' });

app.use(express.json());

// Example middleware for CORS (if needed)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const supportedData = {
  languages: ['English', 'Spanish', 'French', 'German'],
  voices: ['Voice1', 'Voice2', 'Voice3']
};

app.get('/get-supported-data', async (req, res) => {
  try {
    res.json(supportedData);
  } catch (error) {
    res.status(500).send('Error fetching supported data');
  }
});

let campaignCounter = 1; // Start with campaign ID 1

app.post('/create-campaign', async (req, res) => {
  try {
    const { title, voice, language, script, knowledgeBase, purpose, calendar, firstLine, tone, postCallAnalysis, postCallAnalysisSchema } = req.body;

    // Example API call to Toingg API (replace with your actual API call)
    const createCampaignResponse = await fetch('https://www.toingg.com/api/v3/create_campaign', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer YOUR_ACCESS_TOKEN',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        voice,
        language,
        script,
        knowledgeBase,
        purpose,
        calendar,
        firstLine,
        tone,
        postCallAnalysis,
        postCallAnalysisSchema
      })
    });

    const campaignData = await createCampaignResponse.json();
    // Assign a new campaign ID (increment campaignCounter)
    campaignData.id = campaignCounter;
    campaignCounter++;
    res.json(campaignData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating campaign');
  }
});

app.post('/make-call', async (req, res) => {
  try {
    const { name, phoneNumber, campID } = req.body;

    // Example API call to Toingg API (replace with your actual API call)
    const makeCallResponse = await fetch('https://www.toingg.com/api/v3/make_call', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer YOUR_ACCESS_TOKEN',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        phoneNumber,
        campID
      })
    });

    const callData = await makeCallResponse.json();
    res.json(callData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error making call');
  }
});

app.get('/call-status/:callId', async (req, res) => {
  try {
    const { callId } = req.params;

    // Example API call to Toingg API (replace with your actual API call)
    const response = await fetch(`https://www.toingg.com/api/v3/call_status/${callId}`, {
      headers: {
        Authorization: 'Bearer YOUR_ACCESS_TOKEN',
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting call status');
  }
});

app.get('/get-transcription/:callId', async (req, res) => {
  try {
    const { callId } = req.params;

    // Example API call to Toingg API (replace with your actual API call)
    const response = await fetch(`https://www.toingg.com/api/v3/get_transcription/${callId}`, {
      headers: {
        Authorization: 'Bearer YOUR_ACCESS_TOKEN',
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting transcription');
  }
});

app.get('/get-post-call-analysis/:callId', async (req, res) => {
  try {
    const { callId } = req.params;

    // Example API call to Toingg API (replace with your actual API call)
    const response = await fetch(`https://www.toingg.com/api/v3/get_post_call_analysis/${callId}`, {
      headers: {
        Authorization: 'Bearer YOUR_ACCESS_TOKEN',
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting post-call analysis');
  }
});

app.post('/upload-knowledge-base', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;

    // Example logic to read file content (adjust based on file type)
    const knowledgeBaseContent = await fs.readFile(file.path, 'utf8');

    // Example API call to Toingg API (replace with your actual API call)
    const uploadKnowledgeBaseResponse = await fetch('https://www.toingg.com/api/v3/upload_knowledge_base', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer YOUR_ACCESS_TOKEN',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        knowledgeBaseContent
      })
    });

    const knowledgeBaseData = await uploadKnowledgeBaseResponse.json();
    res.json(knowledgeBaseData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading knowledge base content');
  }
});

// CORS preflight handler for update-campaign route
app.options('/update-campaign/:campId', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'PUT'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type'); 
  res.send();
});

// Update Campaign Route
app.put('/update-campaign/:campId', async (req, res) => {
  try {
    const { campId } = req.params;
    const { campaignModelData } = req.body;

    // Example API call to Toingg API (replace with your actual API call)
    const updateCampaignResponse = await fetch(`https://www.toingg.com/api/v3/update_campaign/${campId}`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer YOUR_ACCESS_TOKEN',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        campaignModelData
      })
    });

    const updatedCampaignData = await updateCampaignResponse.json();
    res.json(updatedCampaignData); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating campaign');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});