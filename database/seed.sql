USE student_management;

INSERT INTO users (name, email) VALUES
('Rakib', 'rakib@example.com'),
('Rafin', 'rafin@example.com'),
('RM', 'rm@example.com');

INSERT INTO students (name, email, enrollment_date) VALUES
('Leon', 'leon@student.com', '2025-01-10'),
('Rizvi', 'rizvi@student.com', '2025-02-15'),
('Sakib', 'sakib@student.com', '2025-03-05');

INSERT INTO courses (title, description) VALUES
('Mathematics', 'Basic Math Course'),
('Physics', 'Fundamentals of Physics'),
('Chemistry', 'Introduction to Chemistry');

INSERT INTO student_courses (student_id, course_id) VALUES
(1, 1), 
(1, 2), 
(2, 1), 
(3, 3); 
