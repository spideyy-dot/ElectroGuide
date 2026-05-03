# ElectroGuide (Demo Version)

ElectroGuide is an AI-inspired civic assistant demo that helps users understand the election process using a local knowledge base.

## Local Dev Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the local server:
   ```bash
   node server/index.js
   ```
3. Open [http://localhost:8080](http://localhost:8080) in your browser.

## Docker Local Test

1. Build the Docker image:
   ```bash
   docker build -t electroguide .
   ```
2. Run the Docker container:
   ```bash
   docker run -p 8080:8080 electroguide
   ```

## Cloud Run Deployment

Ensure you have the Google Cloud CLI (`gcloud`) installed and configured.

### Build and Deploy
```bash
# Build and push image
gcloud builds submit --tag gcr.io/civicai-495105/electroguide

# Deploy to Cloud Run
gcloud run deploy electroguide \
  --image gcr.io/civicai-495105/electroguide \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

The deployed URL will look like: `https://electroguide-xxxxxx-uc.a.run.app`
