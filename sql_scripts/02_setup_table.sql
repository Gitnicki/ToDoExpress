USE todoexpress;

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    taskname VARCHAR(255) NOT NULL,
    taskstatus VARCHAR(255) DEFAULT 'open'
);
