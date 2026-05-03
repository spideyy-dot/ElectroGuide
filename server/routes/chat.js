const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Load Knowledge Bases (Demo Data)
const faqPath = path.join(__dirname, '../../data/election-faq.json');
const newsPath = path.join(__dirname, '../../data/election-news.json');

let knowledgeBase = {
    faq: [],
    news: []
};

function loadData() {
    try {
        if (fs.existsSync(faqPath)) {
            knowledgeBase.faq = JSON.parse(fs.readFileSync(faqPath, 'utf8'));
        }
        if (fs.existsSync(newsPath)) {
            knowledgeBase.news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
        }
    } catch (error) {
        console.error("Could not load knowledge base data:", error);
    }
}

loadData();

router.post('/', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: "Message is required." });
        }

        const query = message.toLowerCase().trim();
        let reply = "";

        // 1. Handle Casual Greetings
        const greetings = ['hi', 'hello', 'hey', 'namaste', 'greetings'];
        if (greetings.some(g => query === g || query.startsWith(g + ' '))) {
            reply = "Hello! I'm Electra, your civic assistant. I can help you with 2026 election news and FAQs. What would you like to know?";
            return res.json({ reply });
        }

        // 2. Search FAQ
        const faqMatch = knowledgeBase.faq.find(item => 
            query.includes(item.question.toLowerCase()) || 
            item.question.toLowerCase().split(' ').some(word => word.length > 4 && query.includes(word))
        );

        if (faqMatch) {
            reply = `**FAQ Answer:** ${faqMatch.answer}\n\n`;
        }

        // 3. Search News
        const newsMatches = knowledgeBase.news.filter(item => 
            query.includes(item.title.toLowerCase()) || 
            item.tags.some(tag => query.includes(tag.toLowerCase())) ||
            item.summary.toLowerCase().split(' ').some(word => word.length > 5 && query.includes(word))
        );

        if (newsMatches.length > 0) {
            reply += `**Related News:**\n`;
            newsMatches.slice(0, 2).forEach(news => {
                reply += `- *${news.title}* (${news.date}): ${news.summary}\n`;
            });
        }

        // 4. Fallback
        if (!reply) {
            reply = "I'm sorry, I couldn't find specific news or FAQ entries related to your query. Try asking about 'registration', 'polling booths', or 'nomination'.";
        }

        console.log(`Knowledge-based response for: ${message.substring(0, 50)}...`);
        res.json({ reply });

    } catch (error) {
        console.error("Chat API Error:", error.message);
        res.status(500).json({ 
            error: "Failed to process request.",
            details: error.message 
        });
    }
});

module.exports = router;
