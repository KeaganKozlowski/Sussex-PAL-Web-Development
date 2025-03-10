CREATE TABLE Applications (
    ApplicationID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    JobID INT,
    ApplicationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Pending', 'Reviewed', 'Interviewing', 'Rejected', 'Accepted') DEFAULT 'Pending',
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (JobID) REFERENCES Jobs(JobID) ON DELETE CASCADE
);