CREATE OR REPLACE TRIGGER trg_prevent_multiple_requests
BEFORE INSERT ON BOOKING_REQUESTS
FOR EACH ROW
DECLARE
    v_count NUMBER;
BEGIN

    SELECT COUNT(*)
    INTO v_count
    FROM BOOKING_REQUESTS
    WHERE student_id = :NEW.student_id
      AND request_status IN ('Pending', 'Approved');

    IF v_count > 0 THEN
        RAISE_APPLICATION_ERROR(
            -20001,
            'Student already has an active booking request.'
        );
    END IF;

END;
/

CREATE OR REPLACE TRIGGER trg_update_room_occupancy
AFTER UPDATE OF request_status
ON BOOKING_REQUESTS
FOR EACH ROW
WHEN (
    OLD.request_status = 'Pending'
    AND NEW.request_status = 'Approved'
)
BEGIN

    UPDATE ROOMS
    SET occupied_count = occupied_count + 1
    WHERE room_id = :NEW.room_id;

END;
/

SELECT room_id,
       room_number,
       capacity,
       occupied_count
FROM ROOMS
WHERE room_id = 2;