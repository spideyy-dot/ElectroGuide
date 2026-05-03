# ElectroGuide - Civic AI Assistant (Demo)

ElectroGuide is a lightweight, high-performance civic assistant designed to help citizens navigate the complexities of the election process. This demo focuses on the **India 2026 Election Cycle**.

## 🏛️ Chosen Vertical
**Civic Technology & Election Assistance**
Providing clear, accessible, and interactive information to voters to increase engagement and reduce misinformation.

## 🧠 Approach and Logic
The solution is built with a **"Stability First"** approach:
1.  **Local Knowledge Base**: Instead of relying on a live AI API (which can be unstable or require expensive keys), this demo uses a structured JSON knowledge base.
2.  **Keyword Matching Engine**: The backend implements a robust keyword-based search that scans FAQs and News items to provide instant, relevant answers.
3.  **Lightweight Tech Stack**:
    - **Backend**: Node.js/Express for rapid response.
    - **Frontend**: Vanilla HTML/CSS/JS for zero-dependency performance and rich aesthetics.
    - **Security**: Implements `helmet` and `express-rate-limit` for production-ready protection.

## 🛠️ How the Solution Works
- **Chat Assistant**: Users can ask about "registration," "polling booths," or "latest news." The system tokenizes the query and matches it against the [election-faq.json](data/election-faq.json) and [election-news.json](data/election-news.json) databases.
- **Election Timeline**: An interactive timeline showing key dates for the 2026 cycle.
- **Civic Quizzes**: A gamified way to test user knowledge on voting procedures.
- **Calendar Integration**: Allows users to add key election dates directly to their Google Calendar.

## 📝 Assumptions Made
- **Target Audience**: Indian citizens looking for simplified election information for the upcoming 2026 cycle.
- **Demo Scope**: A curated knowledge base is sufficient to demonstrate the UX and core functionality without requiring an active Gemini API key.
- **Deployment**: The solution is optimized for containerized environments like Google Cloud Run.

---

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Run the local server**:
   ```bash
   node server/index.js
   ```
3. **Open [http://localhost:8080](http://localhost:8080)** in your browser.

## 🐳 Docker Deployment
```bash
docker build -t electroguide .
docker run -p 8080:8080 electroguide
```

## ☁️ Cloud Run Deployment
```bash
gcloud builds submit --tag gcr.io/civicai-495105/electroguide
gcloud run deploy electroguide --image gcr.io/civicai-495105/electroguide --platform managed --region us-central1 --allow-unauthenticated
```
