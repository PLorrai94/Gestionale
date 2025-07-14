-- Eseguire come SYSTEM

GRANT SELECT, UPDATE ON management_user.ORDERS TO batch_user;
GRANT SELECT ON management_user.ORDER_ITEMS TO batch_user;
GRANT SELECT, UPDATE ON management_user.PRODUCTS TO batch_user;

COMMIT;
