CREATE TABLE Users (
    id INTEGER PRIMARY KEY,
    name TEXT,
    email TEXT,
    password TEXT
);

CREATE TABLE Questions (
    id INTEGER PRIMARY KEY,
    title TEXT,
    topic TEXT,
    difficulty TEXT
);

CREATE TABLE Progress (
    user_id INTEGER,
    question_id INTEGER,
    status TEXT
);