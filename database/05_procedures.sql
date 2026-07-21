CREATE OR REPLACE PROCEDURE submit_booking_request (
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

END;
/

BEGIN
    submit_booking_request(
        p_student_id => 2,
        p_room_id => 2
    );
END;
/

SELECT *
FROM BOOKING_REQUESTS;

CREATE OR REPLACE PROCEDURE approve_request (
    p_request_id IN NUMBER
)
AS
    v_room_id         ROOMS.room_id%TYPE;
    v_capacity        ROOMS.capacity%TYPE;
    v_occupied        ROOMS.occupied_count%TYPE;
    v_payment_status  BOOKING_REQUESTS.payment_status%TYPE;
    v_request_status  BOOKING_REQUESTS.request_status%TYPE;
BEGIN

    -- Get booking details
    SELECT room_id, payment_status, request_status
    INTO v_room_id, v_payment_status, v_request_status
    FROM BOOKING_REQUESTS
    WHERE request_id = p_request_id;

    -- Check if request is still pending
    IF v_request_status <> 'Pending' THEN
        RAISE_APPLICATION_ERROR(
            -20004,
            'Only pending requests can be approved.'
        );
    END IF;

    -- Check payment status
    IF v_payment_status <> 'Paid' THEN
        RAISE_APPLICATION_ERROR(
            -20003,
            'Payment has not been completed.'
        );
    END IF;

    -- Get room details
    SELECT capacity, occupied_count
    INTO v_capacity, v_occupied
    FROM ROOMS
    WHERE room_id = v_room_id;

    -- Check room availability
    IF v_occupied >= v_capacity THEN
        RAISE_APPLICATION_ERROR(
            -20002,
            'Room is already full.'
        );
    END IF;

    -- Approve booking request
    UPDATE BOOKING_REQUESTS
    SET request_status = 'Approved'
    WHERE request_id = p_request_id
    AND request_status = 'Pending';

    COMMIT;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(
            -20005,
            'Booking request not found.'
        );

    WHEN OTHERS THEN
        RAISE;
END;
/

CREATE OR REPLACE PROCEDURE make_payment (
    p_request_id IN NUMBER,
    p_amount IN NUMBER
)
AS
    v_receipt VARCHAR2(50);
BEGIN

    -- Generate receipt number
    v_receipt := 'RCPT-' || TO_CHAR(seq_payment.NEXTVAL);

    -- Insert payment
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

    -- Update booking payment status
    UPDATE BOOKING_REQUESTS
    SET payment_status = 'Paid'
    WHERE request_id = p_request_id;

    COMMIT;

END;
/
CREATE OR REPLACE PROCEDURE reject_request (
    p_request_id IN NUMBER
)
AS
    v_request_status BOOKING_REQUESTS.request_status%TYPE;
BEGIN

    -- Check current request status
    SELECT request_status
    INTO v_request_status
    FROM BOOKING_REQUESTS
    WHERE request_id = p_request_id;

    -- Only pending requests can be rejected
    IF v_request_status <> 'Pending' THEN
        RAISE_APPLICATION_ERROR(
            -20006,
            'Only pending requests can be rejected.'
        );
    END IF;

    -- Reject the request
    UPDATE BOOKING_REQUESTS
    SET request_status = 'Rejected'
    WHERE request_id = p_request_id;

    COMMIT;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(
            -20007,
            'Booking request not found.'
        );

    WHEN OTHERS THEN
        RAISE;
END;
/

CREATE OR REPLACE PROCEDURE approve_all_requests
AS
    CURSOR c_requests IS
        SELECT request_id
        FROM BOOKING_REQUESTS
        WHERE request_status = 'Pending';

BEGIN
    FOR rec IN c_requests LOOP
        BEGIN
            approve_request(rec.request_id);
        EXCEPTION
            WHEN OTHERS THEN
                DBMS_OUTPUT.PUT_LINE(
                    'Request ' || rec.request_id || ': ' || SQLERRM
                );
        END;
    END LOOP;
END;
/
SET SERVEROUTPUT ON;
SELECT request_id,
       student_id,
       room_id,
       payment_status,
       request_status
FROM BOOKING_REQUESTS;

BEGIN
    make_payment(8, 50000);
    make_payment(9, 45000);
END;
/

BEGIN
    approve_all_requests;
END;
/

SELECT object_name, status
FROM user_objects
WHERE object_type='PROCEDURE';

BEGIN
    submit_booking_request(3,4);
END;
/