CREATE OR REPLACE PACKAGE hostel_package AS

    PROCEDURE submit_booking_request(
        p_student_id IN NUMBER,
        p_room_id IN NUMBER
    );

    PROCEDURE approve_request(
        p_request_id IN NUMBER
    );

    PROCEDURE make_payment(
        p_request_id IN NUMBER,
        p_amount IN NUMBER
    );

    PROCEDURE reject_request(
        p_request_id IN NUMBER
    );

    PROCEDURE approve_all_requests;
    PROCEDURE register_student(
    p_name           IN USERS.NAME%TYPE,
    p_email          IN USERS.EMAIL%TYPE,
    p_password       IN USERS.PASSWORD%TYPE,
    p_register_no    IN STUDENT_DETAILS.REGISTER_NO%TYPE,
    p_department     IN STUDENT_DETAILS.DEPARTMENT%TYPE,
    p_year           IN STUDENT_DETAILS.YEAR%TYPE,
    p_gender         IN STUDENT_DETAILS.GENDER%TYPE,
    p_phone          IN STUDENT_DETAILS.PHONE%TYPE,
    p_parent_name    IN STUDENT_DETAILS.PARENT_NAME%TYPE,
    p_parent_phone   IN STUDENT_DETAILS.PARENT_PHONE%TYPE,
    p_address        IN STUDENT_DETAILS.ADDRESS%TYPE
    );

    FUNCTION remaining_rooms(
        p_room_id IN NUMBER
    ) RETURN NUMBER;

    FUNCTION room_available(
        p_room_id IN NUMBER
    ) RETURN VARCHAR2;

    FUNCTION total_students_in_block(
        p_block_id IN NUMBER
    ) RETURN NUMBER;

END hostel_package;
/



CREATE OR REPLACE PACKAGE BODY hostel_package AS

    ------------------------------------------------------------------
    -- Submit Booking Request
    ------------------------------------------------------------------
    PROCEDURE submit_booking_request (
        p_student_id IN NUMBER,
        p_room_id IN NUMBER
    )
    AS
    BEGIN
        INSERT INTO BOOKING_REQUESTS (
            request_id,
            student_id,
            room_id,
            payment_status,
            request_status,
            request_date
        )
        VALUES (
            seq_request.NEXTVAL,
            p_student_id,
            p_room_id,
            'Pending',
            'Pending',
            SYSDATE
        );

        COMMIT;
    END submit_booking_request;

    ------------------------------------------------------------------
    -- Make Payment
    ------------------------------------------------------------------
    PROCEDURE make_payment (
        p_request_id IN NUMBER,
        p_amount IN NUMBER
    )
    AS
        v_receipt VARCHAR2(50);
    BEGIN

        v_receipt := 'RCPT-' || TO_CHAR(seq_payment.NEXTVAL);

        INSERT INTO PAYMENTS (
            payment_id,
            request_id,
            amount,
            payment_date,
            receipt_number
        )
        VALUES (
            seq_payment.CURRVAL,
            p_request_id,
            p_amount,
            SYSDATE,
            v_receipt
        );

        UPDATE BOOKING_REQUESTS
        SET payment_status = 'Paid'
        WHERE request_id = p_request_id;

        COMMIT;

    END make_payment;

    ------------------------------------------------------------------
    -- Approve Request
    ------------------------------------------------------------------
    PROCEDURE approve_request (
        p_request_id IN NUMBER
    )
    AS
        v_room_id         ROOMS.room_id%TYPE;
        v_capacity        ROOMS.capacity%TYPE;
        v_occupied        ROOMS.occupied_count%TYPE;
        v_payment_status  BOOKING_REQUESTS.payment_status%TYPE;
        v_request_status  BOOKING_REQUESTS.request_status%TYPE;
    BEGIN

        SELECT room_id,
               payment_status,
               request_status
        INTO v_room_id,
             v_payment_status,
             v_request_status
        FROM BOOKING_REQUESTS
        WHERE request_id = p_request_id;

        IF v_request_status <> 'Pending' THEN
            RAISE_APPLICATION_ERROR(
                -20004,
                'Only pending requests can be approved.'
            );
        END IF;

        IF v_payment_status <> 'Paid' THEN
            RAISE_APPLICATION_ERROR(
                -20003,
                'Payment has not been completed.'
            );
        END IF;

        SELECT capacity,
               occupied_count
        INTO v_capacity,
             v_occupied
        FROM ROOMS
        WHERE room_id = v_room_id;

        IF v_occupied >= v_capacity THEN
            RAISE_APPLICATION_ERROR(
                -20002,
                'Room is already full.'
            );
        END IF;

        UPDATE BOOKING_REQUESTS
        SET request_status='Approved'
        WHERE request_id=p_request_id
        AND request_status='Pending';

        COMMIT;

    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(
                -20005,
                'Booking request not found.'
            );
    END approve_request;
    
    PROCEDURE register_student(
    p_name           IN USERS.NAME%TYPE,
    p_email          IN USERS.EMAIL%TYPE,
    p_password       IN USERS.PASSWORD%TYPE,
    p_register_no    IN STUDENT_DETAILS.REGISTER_NO%TYPE,
    p_department     IN STUDENT_DETAILS.DEPARTMENT%TYPE,
    p_year           IN STUDENT_DETAILS.YEAR%TYPE,
    p_gender         IN STUDENT_DETAILS.GENDER%TYPE,
    p_phone          IN STUDENT_DETAILS.PHONE%TYPE,
    p_parent_name    IN STUDENT_DETAILS.PARENT_NAME%TYPE,
    p_parent_phone   IN STUDENT_DETAILS.PARENT_PHONE%TYPE,
    p_address        IN STUDENT_DETAILS.ADDRESS%TYPE
    )
    IS
        v_user_id NUMBER;
        v_count   NUMBER;
    BEGIN

    -- Check duplicate email
    SELECT COUNT(*)
    INTO v_count
    FROM USERS
    WHERE EMAIL = p_email;

    IF v_count > 0 THEN
        RAISE_APPLICATION_ERROR(-20010, 'Email already exists.');
    END IF;

    -- Check duplicate register number
    SELECT COUNT(*)
    INTO v_count
    FROM STUDENT_DETAILS
    WHERE REGISTER_NO = p_register_no;

    IF v_count > 0 THEN
        RAISE_APPLICATION_ERROR(-20011, 'Register number already exists.');
    END IF;

    -- Generate User ID
    v_user_id := seq_user.NEXTVAL;

    -- Insert into USERS
    INSERT INTO USERS
    (
        USER_ID,
        NAME,
        EMAIL,
        PASSWORD,
        ROLE,
        CREATED_AT
    )
    VALUES
    (
        v_user_id,
        p_name,
        p_email,
        p_password,
        'STUDENT',
        SYSDATE
    );

    -- Insert into STUDENT_DETAILS
    INSERT INTO STUDENT_DETAILS
    (
        STUDENT_ID,
        USER_ID,
        REGISTER_NO,
        DEPARTMENT,
        YEAR,
        GENDER,
        PHONE,
        PARENT_NAME,
        PARENT_PHONE,
        ADDRESS
    )
    VALUES
    (
        seq_student.NEXTVAL,
        v_user_id,
        p_register_no,
        p_department,
        p_year,
        p_gender,
        p_phone,
        p_parent_name,
        p_parent_phone,
        p_address
    );

    END register_student;

    ------------------------------------------------------------------
    -- Reject Request
    ------------------------------------------------------------------
    PROCEDURE reject_request (
        p_request_id IN NUMBER
    )
    AS
        v_request_status BOOKING_REQUESTS.request_status%TYPE;
    BEGIN

        SELECT request_status
        INTO v_request_status
        FROM BOOKING_REQUESTS
        WHERE request_id = p_request_id;

        IF v_request_status <> 'Pending' THEN
            RAISE_APPLICATION_ERROR(
                -20006,
                'Only pending requests can be rejected.'
            );
        END IF;

        UPDATE BOOKING_REQUESTS
        SET request_status='Rejected'
        WHERE request_id=p_request_id;

        COMMIT;

    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(
                -20007,
                'Booking request not found.'
            );
    END reject_request;

    ------------------------------------------------------------------
    -- Approve All Requests
    ------------------------------------------------------------------
    PROCEDURE approve_all_requests
    AS
        CURSOR c_requests IS
            SELECT request_id
            FROM BOOKING_REQUESTS
            WHERE request_status='Pending';
    BEGIN

        FOR rec IN c_requests LOOP

            BEGIN
                approve_request(rec.request_id);

            EXCEPTION
                WHEN OTHERS THEN
                    DBMS_OUTPUT.PUT_LINE(
                        'Request '
                        || rec.request_id
                        || ' : '
                        || SQLERRM
                    );
            END;

        END LOOP;

    END approve_all_requests;

    ------------------------------------------------------------------
    -- Remaining Rooms
    ------------------------------------------------------------------
    FUNCTION remaining_rooms (
        p_room_id IN NUMBER
    )
    RETURN NUMBER
    AS
        v_capacity ROOMS.capacity%TYPE;
        v_occupied ROOMS.occupied_count%TYPE;
    BEGIN

        SELECT capacity,
               occupied_count
        INTO v_capacity,
             v_occupied
        FROM ROOMS
        WHERE room_id=p_room_id;

        RETURN v_capacity-v_occupied;

    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(
                -20008,
                'Room not found.'
            );
    END remaining_rooms;

    ------------------------------------------------------------------
    -- Room Available
    ------------------------------------------------------------------
    FUNCTION room_available (
        p_room_id IN NUMBER
    )
    RETURN VARCHAR2
    AS
    BEGIN

        IF remaining_rooms(p_room_id)>0 THEN
            RETURN 'Available';
        ELSE
            RETURN 'Full';
        END IF;

    END room_available;

    ------------------------------------------------------------------
    -- Total Students in Block
    ------------------------------------------------------------------
    FUNCTION total_students_in_block (
        p_block_id IN NUMBER
    )
    RETURN NUMBER
    AS
        v_total NUMBER;
    BEGIN

        SELECT COUNT(*)
        INTO v_total
        FROM BOOKING_REQUESTS br
        JOIN ROOMS r
        ON br.room_id=r.room_id
        WHERE r.block_id=p_block_id
        AND br.request_status='Approved';

        RETURN v_total;

    END total_students_in_block;

END hostel_package;
/

SHOW ERRORS PACKAGE BODY hostel_package;

BEGIN
    hostel_package.submit_booking_request(7,2);
END;
/
select * from users;
commit;