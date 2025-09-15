USE student_management;

-- Seed Users
INSERT INTO users (name, email) VALUES
('Alice Johnson', 'alice@example.com'),
('Bob Smith', 'bob@example.com'),
('Charlie Brown', 'charlie@example.com');

-- Seed Students
INSERT INTO students (name, email, enrollment_date) VALUES
('David Lee', 'david@student.com', '2025-01-10'),
('Eva Green', 'eva@student.com', '2025-02-15'),
('Frank White', 'frank@student.com', '2025-03-05');

-- Seed Courses
INSERT INTO courses (title, description) VALUES
('Mathematics', 'Basic Math Course'),
('Physics', 'Fundamentals of Physics'),
('Chemistry', 'Introduction to Chemistry');

-- Seed Student-Course Assignments
INSERT INTO student_courses (student_id, course_id) VALUES
(1, 1), -- David → Mathematics
(1, 2), -- David → Physics
(2, 1), -- Eva → Mathematics
(3, 3); -- Frank → Chemistry
