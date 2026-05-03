const express = require('express');
const router = express.Router();
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.CALENDAR_CLIENT_ID,
  process.env.CALENDAR_CLIENT_SECRET,
  process.env.CALENDAR_REDIRECT_URI || 'http://localhost:8080/api/calendar/callback'
);

router.get('/auth-url', (req, res) => {
    const scopes = ['https://www.googleapis.com/auth/calendar.events'];
    
    // We encode the event info into the state parameter
    const stateStr = Buffer.from(JSON.stringify(req.query)).toString('base64');
    
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        state: stateStr
    });
    
    res.json({ url });
});

router.get('/callback', async (req, res) => {
    const { code, state } = req.query;
    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
        
        let eventData = {};
        if (state) {
            eventData = JSON.parse(Buffer.from(state, 'base64').toString('utf8'));
        }

        const date = eventData.date || new Date().toISOString().split('T')[0];

        const event = {
            summary: eventData.title || 'Election Deadline',
            description: eventData.description || 'Important civic deadline.',
            start: { date: date },
            end: { date: date },
        };

        await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });

        res.send(`
            <html><body>
            <h2>Event Added!</h2>
            <p>The election deadline has been added to your Google Calendar.</p>
            <script>setTimeout(() => window.close(), 3000);</script>
            </body></html>
        `);
    } catch (error) {
        console.error('Calendar Error:', error);
        res.status(500).send('Failed to add event to calendar. Please try again.');
    }
});

module.exports = router;
