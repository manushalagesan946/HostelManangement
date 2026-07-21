INSERT INTO USERS (
    user_id,
    name,
    email,
    password,
    role
)
VALUES (
    seq_user.NEXTVAL,
    'Admin',
    'admin@hostel.com',
    'admin123',
    'ADMIN'
);

INSERT INTO USERS VALUES (
    seq_user.NEXTVAL,
    'Rahul Kumar',
    'rahul@gmail.com',
    'rahul123',
    'STUDENT',
    SYSDATE
);

INSERT INTO USERS VALUES (
    seq_user.NEXTVAL,
    'Arjun Raj',
    'arjun@gmail.com',
    'arjun123',
    'STUDENT',
    SYSDATE
);

INSERT INTO USERS VALUES (
    seq_user.NEXTVAL,
    'Priya Sharma',
    'priya@gmail.com',
    'priya123',
    'STUDENT',
    SYSDATE
);

INSERT INTO USERS VALUES (
    seq_user.NEXTVAL,
    'Sneha Reddy',
    'sneha@gmail.com',
    'sneha123',
    'STUDENT',
    SYSDATE
);

INSERT INTO USERS VALUES (
    seq_user.NEXTVAL,
    'Karthik S',
    'karthik@gmail.com',
    'karthik123',
    'STUDENT',
    SYSDATE
);

select * from users;


INSERT INTO BLOCKS
VALUES (
    seq_block.NEXTVAL,
    'A Block',
    'Male',
    'Boys Hostel Block A'
);

INSERT INTO BLOCKS
VALUES (
    seq_block.NEXTVAL,
    'B Block',
    'Male',
    'Boys Hostel Block B'
);

INSERT INTO BLOCKS
VALUES (
    seq_block.NEXTVAL,
    'C Block',
    'Female',
    'Girls Hostel Block'
);
select * from users;

select * from blocks;

INSERT INTO ROOMS VALUES
(seq_room.NEXTVAL, 2, 'A101', 3, 0, 50000);

INSERT INTO ROOMS VALUES
(seq_room.NEXTVAL, 2, 'A102', 3, 0, 50000);

INSERT INTO ROOMS VALUES
(seq_room.NEXTVAL, 2, 'A103', 2, 0, 45000);

INSERT INTO ROOMS VALUES
(seq_room.NEXTVAL, 2, 'A104', 2, 0, 45000);

INSERT INTO ROOMS VALUES
(seq_room.NEXTVAL, 2, 'A105', 4, 0, 60000);


INSERT INTO ROOMS VALUES
(seq_room.NEXTVAL, 4, 'C101', 3, 0, 50000);

INSERT INTO ROOMS VALUES
(seq_room.NEXTVAL, 4, 'C102', 3, 0, 50000);

INSERT INTO ROOMS VALUES
(seq_room.NEXTVAL, 4, 'C103', 2, 0, 45000);

INSERT INTO ROOMS VALUES
(seq_room.NEXTVAL, 4, 'C104', 2, 0, 45000);

INSERT INTO ROOMS VALUES
(seq_room.NEXTVAL, 4, 'C105', 4, 0, 60000);

SELECT * FROM ROOMS
ORDER BY room_id;

INSERT INTO STUDENT_DETAILS VALUES
(seq_student.NEXTVAL, 3, '22CSE001', 'CSE', 4, 'Male',
 '9876543210', 'Ramesh Kumar', '9876500001', 'Chennai');

INSERT INTO STUDENT_DETAILS VALUES
(seq_student.NEXTVAL, 4, '22CSE002', 'CSE', 4, 'Male',
 '9876543211', 'Suresh Raj', '9876500002', 'Coimbatore');

INSERT INTO STUDENT_DETAILS VALUES
(seq_student.NEXTVAL, 5, '22ECE001', 'ECE', 3, 'Female',
 '9876543212', 'Mohan Sharma', '9876500003', 'Madurai');

INSERT INTO STUDENT_DETAILS VALUES
(seq_student.NEXTVAL, 6, '22IT001', 'IT', 2, 'Female',
 '9876543213', 'Reddy Kumar', '9876500004', 'Salem');

INSERT INTO STUDENT_DETAILS VALUES
(seq_student.NEXTVAL, 7, '22AIML001', 'AIML', 1, 'Male',
 '9876543214', 'Sathish', '9876500005', 'Trichy');
 
 SELECT
    s.student_id,
    u.name,
    s.register_no,
    s.department,
    s.year
FROM STUDENT_DETAILS s
JOIN USERS u
ON s.user_id = u.user_id;

commit;