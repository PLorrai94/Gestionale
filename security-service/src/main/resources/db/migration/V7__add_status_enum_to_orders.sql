-- Aggiunta vincolo di enumerazione fittizia sul campo STATUS
-- Oracle non supporta ENUM, quindi si usa un check constraint
ALTER TABLE ORDERS
ADD CONSTRAINT CHK_ORDER_STATUS CHECK (STATUS IN ('PENDING', 'SHIPPED', 'CANCELLED'));