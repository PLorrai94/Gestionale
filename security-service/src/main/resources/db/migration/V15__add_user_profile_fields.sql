-- Add new profile columns to USERS table
ALTER TABLE USERS ADD (
    FIRST_NAME VARCHAR2(50),
    LAST_NAME VARCHAR2(50),
    PHONE_NUMBER VARCHAR2(20)
);

COMMENT ON COLUMN USERS.FIRST_NAME IS 'User first name (optional)';
COMMENT ON COLUMN USERS.LAST_NAME IS 'User last name (optional)';
COMMENT ON COLUMN USERS.PHONE_NUMBER IS 'User phone number (optional)';
