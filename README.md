# Toingg Campaign Management Frontend

This project implements a React-based frontend for managing Toingg campaigns. It allows users to:

- **Create Campaigns:** 
    - Provide campaign details like title, voice, language, script, knowledge base, purpose, calendar, first line, and tone.
    - Upload a knowledge base file.
    - Enable post-call analysis.
- **Make Calls:**
    - Provide individual contact information (name, phone number) or upload a CSV file with a list of contacts.
    - Select a campaign for the call.
- **Check Call Status:**
    - Retrieve the status of a call using the call ID.
- **Get Call Transcription:**
    - Retrieve the transcription of a call using the call ID.
- **Get Post-Call Analysis:**
    - Retrieve the post-call analysis of a call using the call ID (assuming the campaign is enabled for post-call analysis).
- **Update Campaigns:**
    - Provide the campaign ID and update the campaign details.


## Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Backend Setup (Express.js):**
    ```
    You need to have a backend server running (e.g., using Express.js) with the API endpoints defined in the backend/ directory. This code includes example API endpoints.
    Make sure to update the API routes (create-campaign, update-campaign) in your backend to handle the new data structure from the frontend.
    Replace YOUR_ACCESS_TOKEN with your actual Toingg API access token.
    ```
3. ## Running the Application

1. **Start the Backend Server:**
   ```bash
   node server.js
   ```

2. **Start the Frontend:**
   ```bash
   npm run start 
   ```

## Project Structure

```
src/
  - App.js
  - CampaignCreation.js
  - MakeCall.js
  - CallStatus.js
  - CallTranscription.js
  - CallAnalysis.js
  - UpdateCampaign.js
```

## Notes

- This project is designed to interact with the Toingg API. Make sure you have an account and access token to use the API.
- The backend code is an example and might need adjustments based on the specific structure of the Toingg API. 
- Error handling and UI improvements are recommended for a production-ready application.

## To-Do

- Implement more robust error handling.
- Add features like:
    - Search for campaigns.
    - Delete campaigns.
    - View campaign analytics.
- Improve the user interface (UI) and user experience (UX).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
```

**Remember:**

- You'll need to update the backend code and API routes to actually interact with the Toingg API. 
- This README is a starting point. You can customize it further based on your project's specifics.