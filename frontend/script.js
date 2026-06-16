/* ELEMENTS */

const loginBtn = document.getElementById("loginBtn");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const dashboard = document.getElementById("dashboard");
const questionsSection = document.getElementById("questionsSection");
const darkBtn = document.getElementById("darkModeBtn");

/* DATA */

let solvedQuestions = [];

/* GET STARTED */

loginBtn.addEventListener("click", () => {
    loginBtn.style.display = "none";
    loginForm.style.display = "block";
});

/* SHOW REGISTER */

document
.getElementById("showRegister")
.addEventListener("click", () => {

    loginForm.style.display = "none";
    registerForm.style.display = "block";

});

/* REGISTER */

document
.getElementById("registerBtn")
.addEventListener("click", () => {

    const name =
        document.getElementById("regName")
        .value.trim();

    const email =
        document.getElementById("regEmail")
        .value.trim();

    const password =
        document.getElementById("regPassword")
        .value.trim();

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    const user = {
        name,
        email,
        password
    };

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );

    alert("Registration Successful!");

    registerForm.style.display = "none";
    loginForm.style.display = "block";

});

/* LOGIN */

document
.querySelector(".submit-btn")
.addEventListener("click", () => {

    const email =
        document.getElementById("email")
        .value.trim();

    const password =
        document.getElementById("password")
        .value.trim();

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    if (!user) {
        alert("Please Register First");
        return;
    }

    if (
        email === user.email &&
        password === user.password
    ) {

        loginForm.style.display = "none";

        dashboard.style.display = "block";

        questionsSection.style.display = "block";

        document.getElementById(
            "userName"
        ).innerText = user.name;

    } else {

        alert("Invalid Credentials");

    }

});

/* RENDER QUESTIONS */

function renderQuestions() {

    const container =
        document.getElementById(
            "questionContainer"
        );

    container.innerHTML = "";

    questions.forEach(question => {

        const solved =
            solvedQuestions.includes(
                question.id
            );

        container.innerHTML += `
        <div
            class="question ${solved ? 'completed' : ''}"
            data-topic="${question.topic}"
        >

            <span>
                ${question.title}

                <small
                    class="${question.difficulty.toLowerCase()}"
                >
                    ${question.difficulty}
                </small>
            </span>

            <button
                onclick="markSolved(${question.id})"
            >
                ${solved ? "Solved" : "Solve"}
            </button>

        </div>
        `;
    });

}

/* SOLVE QUESTION */

function markSolved(id) {

    if (!solvedQuestions.includes(id)) {

        solvedQuestions.push(id);

        localStorage.setItem(
            "solvedQuestions",
            JSON.stringify(
                solvedQuestions
            )
        );

        document.getElementById(
            "solvedCount"
        ).innerText =
            solvedQuestions.length;

        updateProgress();
        updateStatistics();
        updateAchievement();
        handleStreak();
        renderQuestions();

    }

}

/* PROGRESS */

function updateProgress() {

    const percentage =
        Math.round(
            (
                solvedQuestions.length /
                questions.length
            ) * 100
        );

    document.getElementById(
        "progressPercent"
    ).innerText =
        percentage + "%";

    document.getElementById(
        "progressBar"
    ).style.width =
        percentage + "%";

}

/* STATISTICS */

function updateStatistics() {

    let easy = 0;
    let medium = 0;
    let hard = 0;

    solvedQuestions.forEach(id => {

        const question =
            questions.find(
                q => q.id === id
            );

        if (!question) return;

        if (question.difficulty === "Easy")
            easy++;

        if (question.difficulty === "Medium")
            medium++;

        if (question.difficulty === "Hard")
            hard++;

    });

    document.getElementById(
        "easySolved"
    ).innerText = easy;

    document.getElementById(
        "mediumSolved"
    ).innerText = medium;

    document.getElementById(
        "hardSolved"
    ).innerText = hard;

    updateRank();

}

/* RANK */

function updateRank() {

    const total =
        solvedQuestions.length;

    let rank =
        "Beginner";

    if (total >= 3)
        rank = "Intermediate";

    if (total >= 5)
        rank = "Advanced";

    if (total >= 7)
        rank = "Expert";

    document.getElementById(
        "userRank"
    ).innerText = rank;

}

/* ACHIEVEMENTS */

function updateAchievement() {

    const total =
        solvedQuestions.length;

    let badge =
        "New Coder";

    if (total >= 3)
        badge = "Problem Solver";

    if (total >= 5)
        badge = "DSA Warrior";

    if (total >= 7)
        badge = "Interview Ready";

    document.getElementById(
        "achievementBadge"
    ).innerText = badge;

}

/* STREAK SYSTEM */

function updateStreak() {

    const streak =
        localStorage.getItem(
            "streak"
        ) || 0;

    const lastSolved =
        localStorage.getItem(
            "lastSolved"
        ) || "Never";

    document.getElementById(
        "streakCount"
    ).innerText =
        streak + " Days";

    document.getElementById(
        "lastSolvedDate"
    ).innerText =
        lastSolved;

}

function handleStreak() {

    const today =
        new Date()
        .toLocaleDateString();

    const lastSolved =
        localStorage.getItem(
            "lastSolved"
        );

    let streak =
        parseInt(
            localStorage.getItem(
                "streak"
            )
        ) || 0;

    if (lastSolved !== today) {

        streak++;

        localStorage.setItem(
            "streak",
            streak
        );

        localStorage.setItem(
            "lastSolved",
            today
        );

    }

    updateStreak();

}

/* SEARCH */

document
.getElementById("searchBox")
.addEventListener("keyup", function () {

    const search =
        this.value.toLowerCase();

    document
    .querySelectorAll(".question")
    .forEach(question => {

        question.style.display =
            question.innerText
            .toLowerCase()
            .includes(search)
            ? "flex"
            : "none";

    });

});

/* FILTER */

document
.getElementById("topicFilter")
.addEventListener("change", function () {

    const topic =
        this.value;

    document
    .querySelectorAll(".question")
    .forEach(question => {

        if (
            topic === "all" ||
            question.dataset.topic === topic
        ) {
            question.style.display = "flex";
        } else {
            question.style.display = "none";
        }

    });

});

/* DARK MODE */

darkBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    darkBtn.textContent =
        document.body.classList.contains("dark")
        ? "Light Mode"
        : "Dark Mode";

});

/* LOGOUT */

document
.getElementById("logoutBtn")
.addEventListener("click", () => {

    dashboard.style.display = "none";
    questionsSection.style.display = "none";
    loginBtn.style.display = "block";

});

/* LOAD */

window.onload = () => {

    solvedQuestions =
        JSON.parse(
            localStorage.getItem(
                "solvedQuestions"
            )
        ) || [];

    document.getElementById(
        "solvedCount"
    ).innerText =
        solvedQuestions.length;

    renderQuestions();

    updateProgress();
    updateStatistics();
    updateAchievement();
    updateStreak();

};