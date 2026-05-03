const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatWindow = document.getElementById('chat-window');
const timelineContainer = document.getElementById('timeline');

let chatHistory = [];

const timelineData = [
    { step: 1, title: "Voter List Update", desc: "Check your name on the electoral roll.", date: "2026-03-01", location: "Online Portal / ERO Office" },
    { step: 2, title: "Nomination Filing", desc: "Candidates file their nominations.", date: "2026-03-20", location: "Returning Officer's Office" },
    { step: 3, title: "Polling Day", desc: "Go to your polling booth and vote.", date: "2026-04-19", location: "Your Assigned Polling Station" },
    { step: 4, title: "Counting Day", desc: "Results are declared.", date: "2026-05-05", location: "Designated Counting Centers" }
];

function renderTimeline() {
    timelineContainer.innerHTML = '';
    timelineData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'timeline-node upcoming'; // Default all to upcoming, we can add logic later to determine state based on date
        div.innerHTML = `
            <div class="timeline-dot">${item.step}</div>
            <div class="timeline-content">
                <span class="timeline-location">${DOMPurify.sanitize(item.location)}</span>
                <h3>${DOMPurify.sanitize(item.title)}</h3>
                <p>${DOMPurify.sanitize(item.desc)}</p>
                <button class="btn-secondary" onclick="addToCalendar('${item.title}', '${item.desc}', '${item.date}')">
                    🗓️ ${item.date}
                </button>
            </div>
        `;
        timelineContainer.appendChild(div);
    });
}

// Timeline is static for India
renderTimeline();

async function addToCalendar(title, desc, date) {
    try {
        const query = new URLSearchParams({ title, description: desc, date }).toString();
        const res = await fetch(`/api/calendar/auth-url?${query}`);
        const data = await res.json();
        if (data.url) {
            window.open(data.url, '_blank', 'width=500,height=600');
        } else {
            alert('Calendar integration not configured properly.');
        }
    } catch (err) {
        console.error('Error opening calendar link', err);
    }
}

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `message ${sender === 'model' ? 'model' : 'user'}`;
    const sanitizedText = DOMPurify.sanitize(text);
    
    if (sender === 'model') {
        div.innerHTML = `
            <div class="electra-avatar">E</div>
            <div class="bubble-ai">${sanitizedText}</div>
        `;
    } else {
        div.innerHTML = `<div class="bubble-user">${sanitizedText}</div>`;
    }
    
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function showTypingIndicator() {
    const div = document.createElement('div');
    div.className = 'typing-indicator';
    div.id = 'typing-indicator';
    div.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    chatInput.value = '';
    
    showTypingIndicator();

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: text,
                jurisdiction: "India",
                history: chatHistory
            })
        });

        removeTypingIndicator();

        if (response.ok) {
            const data = await response.json();
            addMessage(data.reply, 'model');
            
            chatHistory.push({ role: 'user', text: text });
            chatHistory.push({ role: 'model', text: data.reply });
        } else {
            addMessage('Oops, I had trouble connecting to the server. Please try again.', 'model');
        }
    } catch (error) {
        removeTypingIndicator();
        addMessage('Sorry, a network error occurred.', 'model');
    }
});

// --- View Navigation Logic ---
const navItems = document.querySelectorAll('.nav-item');
const viewSections = document.querySelectorAll('.view-section');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all
        navItems.forEach(nav => nav.classList.remove('active'));
        viewSections.forEach(view => view.classList.remove('active'));
        
        // Add active class to clicked item and target view
        item.classList.add('active');
        const targetId = item.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});


// --- Quiz Logic ---
const quizQuestions = [
    {
        question: "What is the minimum age to vote in India?",
        options: ["16 years", "18 years", "21 years", "25 years"],
        answer: 1
    },
    {
        question: "Which machine is used for casting votes in India?",
        options: ["Electronic Voting Machine (EVM)", "Automated Teller Machine (ATM)", "VVPAT alone", "Ballot Box"],
        answer: 0
    },
    {
        question: "What ID is primarily issued for voting?",
        options: ["Aadhar Card", "EPIC (Voter ID)", "Passport", "Driving License"],
        answer: 1
    }
];

let currentQuizIndex = 0;
let quizScore = 0;

const quizStartScreen = document.getElementById('quiz-start-screen');
const quizContainer = document.getElementById('quiz-container');
const quizResultScreen = document.getElementById('quiz-result-screen');
const nextQuizBtn = document.getElementById('next-quiz-btn');

document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
document.getElementById('restart-quiz-btn').addEventListener('click', startQuiz);
nextQuizBtn.addEventListener('click', nextQuizQuestion);

function startQuiz() {
    currentQuizIndex = 0;
    quizScore = 0;
    quizStartScreen.style.display = 'none';
    quizResultScreen.style.display = 'none';
    quizContainer.style.display = 'block';
    document.getElementById('quiz-total-num').textContent = quizQuestions.length;
    renderQuizQuestion();
}

function renderQuizQuestion() {
    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');
    const feedbackEl = document.getElementById('quiz-feedback');
    
    document.getElementById('quiz-current-num').textContent = currentQuizIndex + 1;
    feedbackEl.textContent = '';
    optionsEl.innerHTML = '';
    nextQuizBtn.style.display = 'none';
    
    const q = quizQuestions[currentQuizIndex];
    questionEl.textContent = q.question;
    
    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-btn';
        btn.textContent = opt;
        btn.onclick = () => checkQuizAnswer(index, btn);
        optionsEl.appendChild(btn);
    });
}

function checkQuizAnswer(selectedIndex, selectedBtn) {
    const q = quizQuestions[currentQuizIndex];
    const feedbackEl = document.getElementById('quiz-feedback');
    const optionsEl = document.getElementById('quiz-options');
    
    // Disable all buttons
    Array.from(optionsEl.children).forEach(btn => btn.disabled = true);
    selectedBtn.classList.add('selected');
    
    if (selectedIndex === q.answer) {
        feedbackEl.textContent = "Correct! Well done.";
        feedbackEl.style.color = "var(--green-700)";
        selectedBtn.classList.add('correct');
        quizScore++;
    } else {
        feedbackEl.textContent = `Incorrect. The right answer was "${q.options[q.answer]}".`;
        feedbackEl.style.color = "var(--red-700)";
        selectedBtn.classList.add('incorrect');
        // Highlight correct
        optionsEl.children[q.answer].classList.add('correct');
    }
    
    nextQuizBtn.style.display = 'inline-flex';
}

function nextQuizQuestion() {
    currentQuizIndex++;
    if (currentQuizIndex >= quizQuestions.length) {
        showQuizResults();
    } else {
        renderQuizQuestion();
    }
}

function showQuizResults() {
    quizContainer.style.display = 'none';
    quizResultScreen.style.display = 'block';
    document.getElementById('quiz-score').textContent = quizScore;
    document.getElementById('quiz-max-score').textContent = quizQuestions.length;
}


// --- FAQ Logic ---
const faqData = [
  {
    "question": "How do I register to vote?",
    "answer": "You can register to vote online through the Voter Helpline App or the Election Commission of India (ECI) portal using Form 6."
  },
  {
    "question": "What is an EVM?",
    "answer": "An Electronic Voting Machine (EVM) is used to cast votes in Indian elections. You press the button next to your chosen candidate's symbol."
  },
  {
    "question": "Do I need an ID to vote?",
    "answer": "Yes, you need your Voter ID (EPIC) or any of the 12 alternative approved photo identity documents (like Aadhar, PAN Card, Passport) to vote at the polling booth."
  }
];

function renderFAQs() {
    const faqList = document.getElementById('faq-list');
    faqList.innerHTML = '';
    
    faqData.forEach(faq => {
        const item = document.createElement('div');
        item.className = 'faq-item';
        
        item.innerHTML = `
            <button class="faq-question" aria-expanded="false">
                ${DOMPurify.sanitize(faq.question)}
                <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="faq-answer">
                ${DOMPurify.sanitize(faq.answer)}
            </div>
        `;
        
        const btn = item.querySelector('.faq-question');
        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            // Close others (optional, but good for accordion)
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('open');
                i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            
            if (!isOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
        
        faqList.appendChild(item);
    });
}

renderFAQs();
