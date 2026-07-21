CREATE TABLE USERS (
    user_id NUMBER PRIMARY KEY,
    name VARCHAR2(100) NOT NULL,
    email VARCHAR2(100) NOT NULL UNIQUE,
    password VARCHAR2(255) NOT NULL,
    role VARCHAR2(10) NOT NULL
        CHECK (role IN ('ADMIN', 'STUDENT')),
    created_at DATE DEFAULT SYSDATE
);

DESC USERS;

CREATE TABLE BLOCKS (
    block_id NUMBER PRIMARY KEY,
    block_name VARCHAR2(50) NOT NULL UNIQUE,
    gender_type VARCHAR2(10) NOT NULL
        CHECK (gender_type IN ('Male', 'Female')),
    description VARCHAR2(255)
);

CREATE TABLE ROOMS (
    room_id NUMBER PRIMARY KEY,
    block_id NUMBER NOT NULL,
    room_number VARCHAR2(20) NOT NULL,
    capacity NUMBER NOT NULL
        CHECK (capacity > 0),
    occupied_count NUMBER DEFAULT 0
        CHECK (occupied_count >= 0),
    fee NUMBER NOT NULL
        CHECK (fee > 0),

    CONSTRAINT fk_room_block
        FOREIGN KEY (block_id)
        REFERENCES BLOCKS(block_id),

    CONSTRAINT uq_block_room
        UNIQUE (block_id, room_number)
);

CREATE TABLE STUDENT_DETAILS (
    student_id NUMBER PRIMARY KEY,
    user_id NUMBER NOT NULL UNIQUE,
    register_no VARCHAR2(30) NOT NULL UNIQUE,
    department VARCHAR2(50) NOT NULL,
    year NUMBER NOT NULL
        CHECK (year BETWEEN 1 AND 4),
    gender VARCHAR2(10) NOT NULL
        CHECK (gender IN ('Male', 'Female')),
    phone VARCHAR2(15) NOT NULL,
    parent_name VARCHAR2(100),
    parent_phone VARCHAR2(15),
    address VARCHAR2(255),

    CONSTRAINT fk_student_user
        FOREIGN KEY (user_id)
        REFERENCES USERS(user_id)
);

CREATE TABLE BOOKING_REQUESTS (
    request_id NUMBER PRIMARY KEY,
    student_id NUMBER NOT NULL,
    room_id NUMBER NOT NULL,

    payment_status VARCHAR2(10) DEFAULT 'Pending'
        CHECK (payment_status IN ('Pending', 'Paid')),

    request_status VARCHAR2(10) DEFAULT 'Pending'
        CHECK (request_status IN ('Pending', 'Approved', 'Rejected')),

    request_date DATE DEFAULT SYSDATE,

    remarks VARCHAR2(255),

    CONSTRAINT fk_request_student
        FOREIGN KEY (student_id)
        REFERENCES STUDENT_DETAILS(student_id),

    CONSTRAINT fk_request_room
        FOREIGN KEY (room_id)
        REFERENCES ROOMS(room_id)
);

CREATE TABLE PAYMENTS (
    payment_id NUMBER PRIMARY KEY,
    request_id NUMBER NOT NULL UNIQUE,
    amount NUMBER NOT NULL
        CHECK (amount > 0),
    payment_date DATE DEFAULT SYSDATE,
    receipt_number VARCHAR2(50) NOT NULL UNIQUE,

    CONSTRAINT fk_payment_request
        FOREIGN KEY (request_id)
        REFERENCES BOOKING_REQUESTS(request_id)
);

SELECT table_name
FROM user_tables
ORDER BY table_name;