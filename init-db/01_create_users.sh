#!/bin/bash
# =============================================================================
# 01_create_users.sh
# Runs once on first DB startup (via gvenzl/oracle-free init mechanism).
# Executes against FREEPDB1 using env vars for passwords.
# =============================================================================

# Passwords from environment (set in docker-compose-db.yml)
OWNER_PASS="${GESTIONALE_OWNER_PASSWORD:-gestionale_owner_pass}"
SEC_PASS="${SECURITY_DB_PASSWORD:-security_user_pass}"
MGMT_PASS="${MANAGEMENT_DB_PASSWORD:-management_user_pass}"
BATCH_PASS="${BATCH_DB_PASSWORD:-batch_user_pass}"

sqlplus -s SYSTEM/"${ORACLE_PASSWORD}"@//localhost:1521/FREEPDB1 <<EOF

-- GESTIONALE_OWNER — Schema owner, runs Flyway migrations (DDL)
CREATE USER GESTIONALE_OWNER IDENTIFIED BY "${OWNER_PASS}"
    DEFAULT TABLESPACE USERS
    TEMPORARY TABLESPACE TEMP
    ACCOUNT UNLOCK;

GRANT CONNECT, RESOURCE TO GESTIONALE_OWNER;
GRANT UNLIMITED TABLESPACE TO GESTIONALE_OWNER;

-- SECURITY_USER — security-service application user (DML only)
CREATE USER SECURITY_USER IDENTIFIED BY "${SEC_PASS}"
    DEFAULT TABLESPACE USERS
    TEMPORARY TABLESPACE TEMP
    ACCOUNT UNLOCK;

GRANT CREATE SESSION TO SECURITY_USER;

-- MANAGEMENT_USER — management-service application user (DML only)
CREATE USER MANAGEMENT_USER IDENTIFIED BY "${MGMT_PASS}"
    DEFAULT TABLESPACE USERS
    TEMPORARY TABLESPACE TEMP
    ACCOUNT UNLOCK;

GRANT CREATE SESSION TO MANAGEMENT_USER;

-- BATCH_USER — batch-service application user (DML only)
CREATE USER BATCH_USER IDENTIFIED BY "${BATCH_PASS}"
    DEFAULT TABLESPACE USERS
    TEMPORARY TABLESPACE TEMP
    ACCOUNT UNLOCK;

GRANT CREATE SESSION TO BATCH_USER;
GRANT CREATE TABLE TO BATCH_USER;
GRANT CREATE SEQUENCE TO BATCH_USER;
GRANT UNLIMITED TABLESPACE TO BATCH_USER;

EXIT;
EOF
