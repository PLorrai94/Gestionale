-- V16__insert_default_admin_user.sql
-- Seed a default admin user with password "admin" (BCrypt encoded).
-- This password is intentionally weak and MUST be changed after first login.

INSERT INTO USERS (USERNAME, EMAIL, PASSWORD, ENABLED, ACCOUNT_NON_LOCKED, FAILED_LOGIN_ATTEMPTS, CREATED_AT, UPDATED_AT)
VALUES ('admin', 'admin@gestionale.local', '$2b$10$szHcv7ZbEX5QpcsaV1Cgde/XVxtJCtlSkwHeOWTLOPtONtO/.EQ8m', 1, 1, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Assign ADMIN role
INSERT INTO USER_ROLES (USER_ID, ROLE_ID)
SELECT u.ID, r.ID FROM USERS u, ROLES r WHERE u.USERNAME = 'admin' AND r.NAME = 'ADMIN';

-- Assign USER role
INSERT INTO USER_ROLES (USER_ID, ROLE_ID)
SELECT u.ID, r.ID FROM USERS u, ROLES r WHERE u.USERNAME = 'admin' AND r.NAME = 'USER';
