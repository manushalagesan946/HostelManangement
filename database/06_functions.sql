CREATE OR REPLACE FUNCTION remaining_rooms (
    p_room_id IN NUMBER
)
RETURN NUMBER
AS
    v_capacity   ROOMS.capacity%TYPE;
    v_occupied   ROOMS.occupied_count%TYPE;
BEGIN
    -- Get room details
    SELECT capacity, occupied_count
    INTO v_capacity, v_occupied
    FROM ROOMS
    WHERE room_id = p_room_id;

    -- Return available beds
    RETURN (v_capacity - v_occupied);

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(
            -20008,
            'Room not found.'
        );
END;
/

CREATE OR REPLACE FUNCTION room_available (
    p_room_id IN NUMBER
)
RETURN VARCHAR2
AS
    v_remaining NUMBER;
BEGIN
    -- Get remaining beds using the previous function
    v_remaining := remaining_rooms(p_room_id);

    IF v_remaining > 0 THEN
        RETURN 'Available';
    ELSE
        RETURN 'Full';
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        RAISE;
END;
/

CREATE OR REPLACE FUNCTION total_students_in_block (
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
        ON br.room_id = r.room_id
    WHERE r.block_id = p_block_id
      AND br.request_status = 'Approved';

    RETURN v_total;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN 0;
END;
/