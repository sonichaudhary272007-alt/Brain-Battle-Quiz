/**
 * BRAIN BATTLE | INTERACTIVE QUIZ PLATFORM
 * Core Engine & Interactive UI Logic
 */

// =====================================
// 1. QUIZ STATE & CONFIGURATION
// =====================================

let selectedCategory = 9;         // Default: General Knowledge
let selectedDifficulty = "easy";  // Default: Easy
let selectedCount = 5;            // Default: 5 Questions

let questions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;

// Question Bank Fallback for guaranteed zero-downtime & offline support
const FALLBACK_QUESTION_BANK = {
    // 9: General Knowledge
    9: {
        easy: [
            { question: "What is the capital city of France?", correct_answer: "Paris", incorrect_answers: ["Rome", "Madrid", "Berlin"] },
            { question: "How many days are in a leap year?", correct_answer: "366", incorrect_answers: ["365", "364", "367"] },
            { question: "Which planet in our solar system is known as the Red Planet?", correct_answer: "Mars", incorrect_answers: ["Venus", "Jupiter", "Saturn"] },
            { question: "What is the largest ocean on Earth?", correct_answer: "Pacific Ocean", incorrect_answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"] },
            { question: "Who painted the famous artwork Mona Lisa?", correct_answer: "Leonardo da Vinci", incorrect_answers: ["Pablo Picasso", "Vincent van Gogh", "Michelangelo"] }
        ],
        medium: [
            { question: "Which country gifted the Statue of Liberty to the United States?", correct_answer: "France", incorrect_answers: ["Germany", "United Kingdom", "Spain"] },
            { question: "What is the official currency of Japan?", correct_answer: "Yen", incorrect_answers: ["Won", "Yuan", "Ringgit"] },
            { question: "In which year did the Titanic sink in the Atlantic Ocean?", correct_answer: "1912", incorrect_answers: ["1905", "1918", "1923"] },
            { question: "What is the hottest planet in the Solar System?", correct_answer: "Venus", incorrect_answers: ["Mercury", "Mars", "Jupiter"] },
            { question: "Which element has the chemical symbol 'Au'?", correct_answer: "Gold", incorrect_answers: ["Silver", "Copper", "Aluminum"] }
        ],
        hard: [
            { question: "What is the rarest blood type among human beings?", correct_answer: "AB Negative", incorrect_answers: ["O Positive", "B Negative", "A Negative"] },
            { question: "Which treaty officially concluded World War I in 1919?", correct_answer: "Treaty of Versailles", incorrect_answers: ["Treaty of Paris", "Treaty of Utrecht", "Treaty of Ghent"] },
            { question: "What is the smallest independent state in the world by area?", correct_answer: "Vatican City", incorrect_answers: ["Monaco", "Nauru", "San Marino"] },
            { question: "In which century was the printing press invented by Johannes Gutenberg?", correct_answer: "15th Century", incorrect_answers: ["14th Century", "16th Century", "13th Century"] },
            { question: "What is the main gas found in the atmosphere of Titan, Saturn's largest moon?", correct_answer: "Nitrogen", incorrect_answers: ["Methane", "Oxygen", "Hydrogen"] }
        ]
    },
    // 18: Computer Science
    18: {
        easy: [
            { question: "What does 'HTML' stand for?", correct_answer: "HyperText Markup Language", incorrect_answers: ["HighText Machine Language", "HyperTransfer Markup Language", "Home Tool Markup Language"] },
            { question: "Which key combination is commonly used to Copy text in most OS?", correct_answer: "Ctrl + C", incorrect_answers: ["Ctrl + V", "Ctrl + X", "Ctrl + Z"] },
            { question: "Which language is primarily used for styling web pages?", correct_answer: "CSS", incorrect_answers: ["HTML", "Python", "SQL"] },
            { question: "What does 'CPU' stand for in computer hardware?", correct_answer: "Central Processing Unit", incorrect_answers: ["Computer Personal Unit", "Central Program Utility", "Central Power Unit"] },
            { question: "Which company developed the Android mobile operating system?", correct_answer: "Google", incorrect_answers: ["Apple", "Microsoft", "Samsung"] }
        ],
        medium: [
            { question: "Which data structure uses the 'First In, First Out' (FIFO) principle?", correct_answer: "Queue", incorrect_answers: ["Stack", "Tree", "Graph"] },
            { question: "In JavaScript, which keyword is used to declare a block-scoped variable that cannot be reassigned?", correct_answer: "const", incorrect_answers: ["var", "let", "def"] },
            { question: "What does 'HTTP' status code 404 signify?", correct_answer: "Not Found", incorrect_answers: ["Unauthorized", "Internal Server Error", "Forbidden"] },
            { question: "Which algorithm design paradigm does Merge Sort utilize?", correct_answer: "Divide and Conquer", incorrect_answers: ["Greedy Approach", "Dynamic Programming", "Backtracking"] },
            { question: "What is the default port number for secure web traffic using HTTPS?", correct_answer: "443", incorrect_answers: ["80", "8080", "22"] }
        ],
        hard: [
            { question: "What is the worst-case time complexity of QuickSort?", correct_answer: "O(n²)", incorrect_answers: ["O(n log n)", "O(n)", "O(log n)"] },
            { question: "Which consensus algorithm is originally used in Bitcoin's blockchain?", correct_answer: "Proof of Work", incorrect_answers: ["Proof of Stake", "Raft", "Paxos"] },
            { question: "In relational databases, which normal form eliminates transitive dependencies?", correct_answer: "Third Normal Form (3NF)", incorrect_answers: ["First Normal Form (1NF)", "Second Normal Form (2NF)", "Boyce-Codd Normal Form (BCNF)"] },
            { question: "What is the term for a function that calls itself in programming?", correct_answer: "Recursion", incorrect_answers: ["Polymorphism", "Encapsulation", "Inheritance"] },
            { question: "Which register in the x86 CPU architecture points to the current instruction being executed?", correct_answer: "EIP / RIP", incorrect_answers: ["ESP / RSP", "EAX / RAX", "EBP / RBP"] }
        ]
    },
    // 17: Science & Nature
    17: {
        easy: [
            { question: "What is the chemical formula for water?", correct_answer: "H2O", incorrect_answers: ["CO2", "O2", "NaCl"] },
            { question: "Which part of the plant conducts photosynthesis?", correct_answer: "Leaf", incorrect_answers: ["Root", "Stem", "Flower"] },
            { question: "What is the center of an atom called?", correct_answer: "Nucleus", incorrect_answers: ["Electron", "Proton", "Neutron"] },
            { question: "Which organ in the human body pumps blood?", correct_answer: "Heart", incorrect_answers: ["Lungs", "Brain", "Liver"] },
            { question: "What is the closest star to planet Earth?", correct_answer: "The Sun", incorrect_answers: ["Proxima Centauri", "Sirius", "Alpha Centauri"] }
        ],
        medium: [
            { question: "What organelle is famously called the 'powerhouse of the cell'?", correct_answer: "Mitochondria", incorrect_answers: ["Ribosome", "Nucleus", "Golgi apparatus"] },
            { question: "What is the speed of light in vacuum (approximate)?", correct_answer: "300,000 km/s", incorrect_answers: ["150,000 km/s", "1,000,000 km/s", "30,000 km/s"] },
            { question: "What is the most abundant gas in Earth's atmosphere?", correct_answer: "Nitrogen", incorrect_answers: ["Oxygen", "Carbon Dioxide", "Argon"] },
            { question: "Which metal is liquid at standard room temperature?", correct_answer: "Mercury", incorrect_answers: ["Lead", "Gallium", "Sodium"] },
            { question: "What is the pH level of pure distilled water?", correct_answer: "7", incorrect_answers: ["5", "8", "0"] }
        ],
        hard: [
            { question: "What is the value of absolute zero in degrees Celsius?", correct_answer: "-273.15°C", incorrect_answers: ["-212.00°C", "-459.67°C", "-100.00°C"] },
            { question: "Which subatomic particle was discovered by J.J. Thomson in 1897?", correct_answer: "Electron", incorrect_answers: ["Proton", "Neutron", "Quark"] },
            { question: "What is the name of the process by which cells divide to produce gametes?", correct_answer: "Meiosis", incorrect_answers: ["Mitosis", "Binary Fission", "Cytokinesis"] },
            { question: "What type of star is our Sun classified as?", correct_answer: "Yellow Dwarf (G-type)", incorrect_answers: ["Red Giant", "White Dwarf", "Blue Supergiant"] },
            { question: "What law of thermodynamics states that entropy of an isolated system always increases?", correct_answer: "Second Law", incorrect_answers: ["First Law", "Third Law", "Zeroth Law"] }
        ]
    },
    // 23: History
    23: {
        easy: [
            { question: "Who was the first President of the United States?", correct_answer: "George Washington", incorrect_answers: ["Thomas Jefferson", "Abraham Lincoln", "John Adams"] },
            { question: "Which ancient civilization built the Great Pyramids of Giza?", correct_answer: "Ancient Egyptians", incorrect_answers: ["Romans", "Greeks", "Mayans"] },
            { question: "In which year did Christopher Columbus reach the Americas?", correct_answer: "1492", incorrect_answers: ["1500", "1488", "1512"] },
            { question: "Which wall divided Berlin from 1961 to 1989?", correct_answer: "Berlin Wall", incorrect_answers: ["Great Wall", "Hadrian's Wall", "Iron Wall"] },
            { question: "Who was known as the 'Maid of Orléans' during the Hundred Years' War?", correct_answer: "Joan of Arc", incorrect_answers: ["Marie Antoinette", "Queen Elizabeth I", "Catherine the Great"] }
        ],
        medium: [
            { question: "In which year did World War II end?", correct_answer: "1945", incorrect_answers: ["1944", "1946", "1939"] },
            { question: "Who was the famous Macedonian king who conquered the Persian Empire?", correct_answer: "Alexander the Great", incorrect_answers: ["Julius Caesar", "King Philip II", "Pericles"] },
            { question: "Which famous document was signed in England in 1215 to limit royal power?", correct_answer: "Magna Carta", incorrect_answers: ["Bill of Rights", "Domesday Book", "Petition of Right"] },
            { question: "Who was the leader of the Soviet Union during the Cuban Missile Crisis?", correct_answer: "Nikita Khrushchev", incorrect_answers: ["Joseph Stalin", "Leonid Brezhnev", "Mikhail Gorbachev"] },
            { question: "What empire was ruled by Suleiman the Magnificent in the 16th century?", correct_answer: "Ottoman Empire", incorrect_answers: ["Persian Empire", "Mughal Empire", "Byzantine Empire"] }
        ],
        hard: [
            { question: "In what year did the Fall of Constantinople take place?", correct_answer: "1453", incorrect_answers: ["1492", "1204", "1517"] },
            { question: "Which Roman Emperor famously legalized Christianity with the Edict of Milan in 313 AD?", correct_answer: "Constantine the Great", incorrect_answers: ["Nero", "Marcus Aurelius", "Trajan"] },
            { question: "Who was the first Emperor of a unified China?", correct_answer: "Qin Shi Huang", incorrect_answers: ["Kublai Khan", "Sun Yat-sen", "Emperor Wu of Han"] },
            { question: "What was the code name for the Allied invasion of Normandy in June 1944?", correct_answer: "Operation Overlord", incorrect_answers: ["Operation Barbarossa", "Operation Market Garden", "Operation Torch"] },
            { question: "Which treaty ended the Thirty Years' War in 1648?", correct_answer: "Peace of Westphalia", incorrect_answers: ["Treaty of Utrecht", "Treaty of Tordesillas", "Treaty of Madrid"] }
        ]
    },
    // 21: Sports
    21: {
        easy: [
            { question: "How many players are on the field for one team in a standard soccer match?", correct_answer: "11", incorrect_answers: ["9", "10", "12"] },
            { question: "In tennis, what term represents a score of zero?", correct_answer: "Love", incorrect_answers: ["Nil", "Zero", "Fault"] },
            { question: "How many rings are featured on the official Olympic flag?", correct_answer: "5", incorrect_answers: ["4", "6", "7"] },
            { question: "Which country has won the most FIFA World Cup tournaments in history?", correct_answer: "Brazil", incorrect_answers: ["Germany", "Italy", "Argentina"] },
            { question: "In bowling, what is the term for knocking down all 10 pins on the first roll?", correct_answer: "Strike", incorrect_answers: ["Spare", "Split", "Turkey"] }
        ],
        medium: [
            { question: "In basketball, how many seconds does an NBA team have to attempt a shot?", correct_answer: "24 seconds", incorrect_answers: ["30 seconds", "20 seconds", "35 seconds"] },
            { question: "Which Grand Slam tennis tournament is played on grass courts?", correct_answer: "Wimbledon", incorrect_answers: ["US Open", "French Open", "Australian Open"] },
            { question: "How long is an official marathon race in miles and yards?", correct_answer: "26 miles 385 yards", incorrect_answers: ["25 miles", "27 miles 100 yards", "26 miles exactly"] },
            { question: "Which Jamaican sprinter holds the world record in the 100m sprint (9.58s)?", correct_answer: "Usain Bolt", incorrect_answers: ["Tyson Gay", "Yohan Blake", "Asafa Powell"] },
            { question: "In cricket, how many balls are bowled in one standard 'over'?", correct_answer: "6", incorrect_answers: ["8", "5", "10"] }
        ],
        hard: [
            { question: "Where were the first modern Olympic Games held in 1896?", correct_answer: "Athens, Greece", incorrect_answers: ["Paris, France", "London, UK", "Rome, Italy"] },
            { question: "Who was the first Formula 1 driver to achieve 7 World Championship titles?", correct_answer: "Michael Schumacher", incorrect_answers: ["Ayrton Senna", "Lewis Hamilton", "Alain Prost"] },
            { question: "In golf, what is the term for scoring three strokes under par on a single hole?", correct_answer: "Albatross (Double Eagle)", incorrect_answers: ["Eagle", "Birdie", "Condor"] },
            { question: "Which NFL team won the very first Super Bowl in 1967?", correct_answer: "Green Bay Packers", incorrect_answers: ["Kansas City Chiefs", "Dallas Cowboys", "Oakland Raiders"] },
            { question: "In badminton, what is the official name of the missile hit by rackets?", correct_answer: "Shuttlecock", incorrect_answers: ["Birdie Ball", "Feather Sphere", "Smash Ball"] }
        ]
    },
    // 22: Geography
    22: {
        easy: [
            { question: "What is the capital city of Japan?", correct_answer: "Tokyo", incorrect_answers: ["Kyoto", "Osaka", "Nagoya"] },
            { question: "Which is the largest continent on Earth by land area?", correct_answer: "Asia", incorrect_answers: ["Africa", "North America", "Europe"] },
            { question: "What is the longest river in the world?", correct_answer: "Nile River", incorrect_answers: ["Amazon River", "Yangtze River", "Mississippi River"] },
            { question: "Which country is home to the Great Barrier Reef?", correct_answer: "Australia", incorrect_answers: ["Fiji", "New Zealand", "Indonesia"] },
            { question: "What is the tallest mountain in the world above sea level?", correct_answer: "Mount Everest", incorrect_answers: ["K2", "Kangchenjunga", "Mount Kilimanjaro"] }
        ],
        medium: [
            { question: "What is the capital city of Canada?", correct_answer: "Ottawa", incorrect_answers: ["Toronto", "Vancouver", "Montreal"] },
            { question: "Which desert is the largest hot desert in the world?", correct_answer: "Sahara Desert", incorrect_answers: ["Gobi Desert", "Kalahari Desert", "Arabian Desert"] },
            { question: "Which European country is known for its fjords and capital city Oslo?", correct_answer: "Norway", incorrect_answers: ["Sweden", "Finland", "Denmark"] },
            { question: "Through which South American country does the majority of the Amazon Rainforest lie?", correct_answer: "Brazil", incorrect_answers: ["Peru", "Colombia", "Argentina"] },
            { question: "What body of water separates the United Kingdom from mainland Europe?", correct_answer: "English Channel", incorrect_answers: ["North Sea", "Irish Sea", "Strait of Gibraltar"] }
        ],
        hard: [
            { question: "What is the capital city of Australia?", correct_answer: "Canberra", incorrect_answers: ["Sydney", "Melbourne", "Brisbane"] },
            { question: "What is the deepest known location on planet Earth?", correct_answer: "Mariana Trench", incorrect_answers: ["Puerto Rico Trench", "Java Trench", "Tonga Trench"] },
            { question: "Which African country was formerly known as Abyssinia?", correct_answer: "Ethiopia", incorrect_answers: ["Eritrea", "Sudan", "Somalia"] },
            { question: "Which strait connects the Atlantic Ocean to the Mediterranean Sea?", correct_answer: "Strait of Gibraltar", incorrect_answers: ["Bosphorus Strait", "Strait of Malacca", "Dardanelles"] },
            { question: "What is the only country in the world that borders both Spain and France?", correct_answer: "Andorra", incorrect_answers: ["Monaco", "Portugal", "Luxembourg"] }
        ]
    }
};


// =====================================
// 2. SCREEN NAVIGATION
// =====================================

/**
 * Hides all main screen sections
 */
function hideAllScreens() {
    const screens = [
        "homeScreen",
        "selectionScreen",
        "quizScreen",
        "resultScreen",
        "features",
        "howItWorks"
    ];

    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add("hidden");
    });
}

/**
 * Shows the Quiz Selection (Customization) screen
 */
function showSelection() {
    hideAllScreens();
    const selection = document.getElementById("selectionScreen");
    if (selection) {
        selection.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

/**
 * Returns to the Home landing page
 */
function goHome() {
    hideAllScreens();
    
    const home = document.getElementById("homeScreen");
    const features = document.getElementById("features");
    const howItWorks = document.getElementById("howItWorks");

    if (home) home.classList.remove("hidden");
    if (features) features.classList.remove("hidden");
    if (howItWorks) howItWorks.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Scrolls smoothly to a specific section on the home page
 */
function scrollToSection(sectionId) {
    // Ensure home sections are visible
    const home = document.getElementById("homeScreen");
    if (home && home.classList.contains("hidden")) {
        goHome();
    }
    setTimeout(() => {
        const target = document.getElementById(sectionId);
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, 50);
}


// =====================================
// 3. SELECTION CONTROLS
// =====================================

/**
 * Selects a category card
 */
function selectCategory(element, categoryId) {
    document.querySelectorAll(".category-card").forEach(card => {
        card.classList.remove("active");
    });
    element.classList.add("active");
    selectedCategory = parseInt(categoryId, 10);
}

/**
 * Selects a difficulty tier
 */
function selectDifficulty(element, difficulty) {
    document.querySelectorAll(".difficulty-card, .difficulty-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    element.classList.add("active");
    selectedDifficulty = difficulty;
}

/**
 * Selects question count
 */
function selectCount(element, count) {
    document.querySelectorAll(".count-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    element.classList.add("active");
    selectedCount = parseInt(count, 10);
}


// =====================================
// 4. API FETCH & FALLBACK MECHANISM
// =====================================

/**
 * Helper: Safely decode HTML entities returned by trivia APIs
 */
function decodeHTML(text) {
    if (!text) return "";
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
}

/**
 * Helper: Shuffles an array randomly using Fisher-Yates algorithm
 */
function shuffleAnswers(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

/**
 * Helper: Retrieves fallback questions when API is rate-limited or unavailable
 */
function getFallbackQuestions(category, difficulty, count) {
    let pool = [];
    if (FALLBACK_QUESTION_BANK[category] && FALLBACK_QUESTION_BANK[category][difficulty]) {
        pool = [...FALLBACK_QUESTION_BANK[category][difficulty]];
    } else if (FALLBACK_QUESTION_BANK[9] && FALLBACK_QUESTION_BANK[9].easy) {
        pool = [...FALLBACK_QUESTION_BANK[9].easy];
    }

    // Shuffle the pool to give variety
    pool = shuffleAnswers(pool);

    // If pool has fewer questions than requested count, duplicate/cycle them
    const results = [];
    for (let i = 0; i < count; i++) {
        results.push(pool[i % pool.length]);
    }
    return results;
}

/**
 * Initiates the challenge: loads questions and displays the quiz interface
 */
async function beginChallenge() {
    const startButton = document.getElementById("startChallengeBtn");
    const errorMessage = document.getElementById("selectionError");

    if (startButton) {
        startButton.disabled = true;
        startButton.innerHTML = `<span>Loading Arena...</span>`;
    }
    if (errorMessage) errorMessage.textContent = "";

    // Reset quiz state
    questions = [];
    currentQuestion = 0;
    score = 0;
    answered = false;

    // Show quiz screen
    hideAllScreens();
    const quizScreen = document.getElementById("quizScreen");
    if (quizScreen) quizScreen.classList.remove("hidden");

    // Reset quiz elements to initial loading state
    const questionText = document.getElementById("questionText");
    const answerContainer = document.getElementById("answerButtons");
    const feedback = document.getElementById("answerFeedback");
    const nextButton = document.getElementById("nextButton");
    const progressFill = document.getElementById("progressFill");

    if (questionText) questionText.textContent = "Summoning your challenge questions...";
    if (answerContainer) answerContainer.innerHTML = "";
    if (feedback) {
        feedback.className = "feedback";
        feedback.textContent = "";
    }
    if (nextButton) {
        nextButton.classList.add("hidden");
        nextButton.disabled = true;
    }
    if (progressFill) progressFill.style.width = "0%";

    // Attempt to fetch from Open Trivia Database API
    const apiURL = `https://opentdb.com/api.php?amount=${selectedCount}&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`;

    try {
        // Use AbortController for a 4.5-second timeout so user is never stuck
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4500);

        const response = await fetch(apiURL, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`Server status: ${response.status}`);
        }

        const data = await response.json();

        if (data.response_code === 0 && data.results && data.results.length > 0) {
            questions = data.results;
        } else {
            // API rate limit (code 5) or no results (code 1) -> use high-quality fallback bank
            console.warn("Trivia API returned code", data.response_code, "- activating offline question bank");
            questions = getFallbackQuestions(selectedCategory, selectedDifficulty, selectedCount);
        }
    } catch (error) {
        // Network error, offline mode or timeout -> seamless fallback
        console.warn("API request failed or timed out:", error.message, "- utilizing fallback bank");
        questions = getFallbackQuestions(selectedCategory, selectedDifficulty, selectedCount);
    } finally {
        if (startButton) {
            startButton.disabled = false;
            startButton.innerHTML = `<span>Start Challenge</span> <span class="btn-arrow">→</span>`;
        }

        // Render the first question
        if (questions && questions.length > 0) {
            displayQuestion();
        } else {
            if (questionText) questionText.textContent = "Unable to load questions. Please try again.";
        }
    }
}


// =====================================
// 5. DISPLAY QUESTION LOGIC
// =====================================

/**
 * Renders the current question and generates answer option cards
 */
function displayQuestion() {
    answered = false;

    if (!questions || currentQuestion >= questions.length) {
        showResult();
        return;
    }

    const question = questions[currentQuestion];

    // Update HUD Category title
    const activeCategoryEl = document.querySelector(".category-card.active h3");
    const categoryTitle = activeCategoryEl ? activeCategoryEl.textContent : "General Knowledge";
    const questionCategoryEl = document.getElementById("questionCategory");
    if (questionCategoryEl) questionCategoryEl.textContent = categoryTitle;

    // Update HUD Tracker (e.g., Question 1 of 5)
    const questionNumberEl = document.getElementById("questionNumber");
    if (questionNumberEl) {
        questionNumberEl.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    }

    // Update HUD Score
    const scoreDisplayEl = document.getElementById("scoreDisplay");
    if (scoreDisplayEl) {
        scoreDisplayEl.textContent = `Score: ${score}`;
    }

    // Update Difficulty badge
    const difficultyBadgeEl = document.getElementById("difficultyBadge");
    if (difficultyBadgeEl) {
        difficultyBadgeEl.textContent = `Difficulty: ${selectedDifficulty.toUpperCase()}`;
    }

    // Update Question text
    const questionTextEl = document.getElementById("questionText");
    if (questionTextEl) {
        questionTextEl.textContent = decodeHTML(question.question);
    }

    // Reset Feedback element
    const feedbackEl = document.getElementById("answerFeedback");
    if (feedbackEl) {
        feedbackEl.className = "feedback";
        feedbackEl.innerHTML = "";
    }

    // Reset Next Question button (Must ALWAYS be hidden and disabled until answered)
    const nextButtonEl = document.getElementById("nextButton");
    if (nextButtonEl) {
        nextButtonEl.classList.add("hidden");
        nextButtonEl.disabled = true;

        if (currentQuestion === questions.length - 1) {
            nextButtonEl.innerHTML = `<span>See Result</span> <span class="btn-arrow">🏆</span>`;
        } else {
            nextButtonEl.innerHTML = `<span>Next Question</span> <span class="btn-arrow">→</span>`;
        }
    }

    // Update Progress bar (shows progress leading into current question)
    const progressFillEl = document.getElementById("progressFill");
    if (progressFillEl) {
        const progressPercentage = (currentQuestion / questions.length) * 100;
        progressFillEl.style.width = `${progressPercentage}%`;
    }

    // Prepare and shuffle 4 answer options
    const allAnswers = [
        ...question.incorrect_answers,
        question.correct_answer
    ];
    const shuffledAnswers = shuffleAnswers(allAnswers);

    // Populate answer container
    const container = document.getElementById("answerButtons");
    if (!container) return;

    container.innerHTML = "";
    const keyLabels = ["A", "B", "C", "D"];

    shuffledAnswers.forEach((answerText, index) => {
        const button = document.createElement("button");
        button.className = "answer-btn";
        button.type = "button";

        button.innerHTML = `
            <span class="answer-key-badge">${keyLabels[index] || "•"}</span>
            <span class="answer-text-content">${decodeHTML(answerText)}</span>
            <span class="answer-status-icon">✓</span>
        `;

        button.onclick = function () {
            checkAnswer(button, answerText);
        };

        container.appendChild(button);
    });
}


// =====================================
// 6. CHECK ANSWER & REAL-TIME FEEDBACK
// =====================================

/**
 * Handles answer selection, highlights correct/wrong, displays feedback, unlocks Next button
 */
function checkAnswer(selectedButton, selectedAnswer) {
    if (answered) return; // Prevent multiple clicks on the same question
    answered = true;

    const currentQData = questions[currentQuestion];
    const correctAnswer = currentQData.correct_answer;
    const allButtons = document.querySelectorAll(".answer-btn");

    // Disable all buttons immediately and highlight the correct one
    allButtons.forEach(btn => {
        btn.disabled = true;
        const textContent = btn.querySelector(".answer-text-content");
        if (textContent && textContent.textContent === decodeHTML(correctAnswer)) {
            btn.classList.add("correct");
            const statusIcon = btn.querySelector(".answer-status-icon");
            if (statusIcon) statusIcon.textContent = "✓";
        }
    });

    const feedbackEl = document.getElementById("answerFeedback");

    // Compare decoded strings to eliminate HTML entity discrepancy
    const isCorrect = decodeHTML(selectedAnswer) === decodeHTML(correctAnswer);

    if (isCorrect) {
        score++;

        if (feedbackEl) {
            feedbackEl.className = "feedback success show";
            feedbackEl.innerHTML = `
                <div class="feedback-badge"><span class="feedback-icon">✓</span></div>
                <div class="feedback-text">
                    <strong>Correct! Great job!</strong>
                </div>
            `;
        }
    } else {
        selectedButton.classList.add("wrong");
        const wrongIcon = selectedButton.querySelector(".answer-status-icon");
        if (wrongIcon) wrongIcon.textContent = "✕";

        if (feedbackEl) {
            feedbackEl.className = "feedback failure show";
            feedbackEl.innerHTML = `
                <div class="feedback-badge"><span class="feedback-icon">✕</span></div>
                <div class="feedback-text">
                    <strong>Incorrect! The correct answer is:</strong> <span>${decodeHTML(correctAnswer)}</span>
                </div>
            `;
        }
    }

    // Immediately update live HUD score
    const scoreDisplayEl = document.getElementById("scoreDisplay");
    if (scoreDisplayEl) {
        scoreDisplayEl.textContent = `Score: ${score}`;
    }

    // Immediately update progress bar to reflect answered question
    const progressFillEl = document.getElementById("progressFill");
    if (progressFillEl) {
        const completedPercentage = ((currentQuestion + 1) / questions.length) * 100;
        progressFillEl.style.width = `${completedPercentage}%`;
    }

    // Reveal and enable Next Question button
    const nextButtonEl = document.getElementById("nextButton");
    if (nextButtonEl) {
        nextButtonEl.disabled = false;
        nextButtonEl.classList.remove("hidden");

        if (currentQuestion === questions.length - 1) {
            nextButtonEl.innerHTML = `<span>See Result</span> <span class="btn-arrow">🏆</span>`;
        } else {
            nextButtonEl.innerHTML = `<span>Next Question</span> <span class="btn-arrow">→</span>`;
        }
    }
}


// =====================================
// 7. NEXT QUESTION & QUIZ FLOW
// =====================================

/**
 * Advances to next question or opens the result dashboard
 */
function nextQuestion() {
    if (!answered) return; // Prevent skipping without answering

    currentQuestion++;

    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        showResult();
    }
}


// =====================================
// 8. FINAL RESULT SCREEN & STATS
// =====================================

/**
 * Displays the final gaming dashboard result screen with animated accuracy circle
 */
function showResult() {
    hideAllScreens();

    const resultScreen = document.getElementById("resultScreen");
    if (resultScreen) {
        resultScreen.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Ensure progress bar is full
    const progressFillEl = document.getElementById("progressFill");
    if (progressFillEl) progressFillEl.style.width = "100%";

    // Compute metrics
    const totalQuestions = questions.length || 1;
    const wrongAnswers = Math.max(0, totalQuestions - score);
    const accuracy = Math.round((score / totalQuestions) * 100);
    const xpTotal = score * 100;

    // Render numbers in DOM
    const finalScoreEl = document.getElementById("finalScore");
    const correctAnswersEl = document.getElementById("correctAnswers");
    const wrongAnswersEl = document.getElementById("wrongAnswers");
    const percentageEl = document.getElementById("percentage");
    const xpEarnedEl = document.getElementById("xpEarned");

    if (finalScoreEl) finalScoreEl.textContent = `${score} / ${totalQuestions}`;
    if (correctAnswersEl) correctAnswersEl.textContent = score;
    if (wrongAnswersEl) wrongAnswersEl.textContent = wrongAnswers;
    if (percentageEl) percentageEl.textContent = `${accuracy}%`;
    if (xpEarnedEl) xpEarnedEl.textContent = `${xpTotal} XP`;

    // Animate Circular Accuracy Indicator (SVG ring)
    const accuracyCircle = document.getElementById("accuracyCircle");
    if (accuracyCircle) {
        // Set stroke color according to accuracy
        if (accuracy >= 80) {
            accuracyCircle.style.stroke = "#10b981"; // Emerald
        } else if (accuracy >= 50) {
            accuracyCircle.style.stroke = "#8b5cf6"; // Purple
        } else {
            accuracyCircle.style.stroke = "#f59e0b"; // Amber
        }

        // Animate stroke dasharray to accuracy percentage
        setTimeout(() => {
            accuracyCircle.setAttribute("stroke-dasharray", `${accuracy}, 100`);
        }, 150);
    }

    // Rank title and performance message
    let message = "";
    let rankTitle = "";

    if (accuracy === 100) {
        message = "Flawless victory! You answered every question with surgical precision. 🏆";
        rankTitle = "👑 Legendary Grandmaster";
    } else if (accuracy >= 70) {
        message = "Outstanding achievement! Your knowledge command is exemplary. 🎉";
        rankTitle = "⭐ Trivia Champion";
    } else if (accuracy >= 40) {
        message = "Solid effort! Keep sharpening your expertise to reach the elite ranks. 👍";
        rankTitle = "🎯 Rising Challenger";
    } else {
        message = "Every challenge is a learning milestone! Dive back in and conquer next time. 💪";
        rankTitle = "📚 Knowledge Explorer";
    }

    const resultMessageEl = document.getElementById("resultMessage");
    if (resultMessageEl) resultMessageEl.textContent = message;

    const rankBadgeEl = document.getElementById("rankBadge");
    if (rankBadgeEl) rankBadgeEl.innerHTML = `<span>${rankTitle}</span>`;
}


// =====================================
// 9. RESTART QUIZ
// =====================================

/**
 * Restarts the quiz with fresh questions and reset counters
 */
function restartQuiz() {
    beginChallenge();
}
