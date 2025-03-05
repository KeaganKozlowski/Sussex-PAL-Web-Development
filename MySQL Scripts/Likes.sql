CREATE TABLE Likes (
    UserID INT,
    JobID INT,
    PRIMARY KEY (UserID, JobID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (JobID) REFERENCES Jobs(JobID) ON DELETE CASCADE
);