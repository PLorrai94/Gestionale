package com.PierLorrai.Gestionale.security_service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class TestDbConnection {

    public static void main(String[] args) {
        String url = "jdbc:oracle:thin:@localhost:1521/XEPDB1"; // O XEPDB1 se preferisci riprovare
        String user = "GESTIONALE_OWNER";
        String password = "GESTIONALE_PASS"; // La password esatta che stai usando

        try {
            // Carica il driver Oracle in modo esplicito (non sempre necessario ma buona pratica per test)
            Class.forName("oracle.jdbc.driver.OracleDriver");

            System.out.println("Tentativo di connessione al database...");
            try (Connection connection = DriverManager.getConnection(url, user, password)) {
                if (connection != null) {
                    System.out.println("Connessione riuscita per l'utente GESTIONALE_OWNER!");
                    connection.close();
                } else {
                    System.out.println("Connessione fallita: la connessione è null.");
                }
            }
        } catch (ClassNotFoundException e) {
            System.err.println("Driver JDBC Oracle non trovato: " + e.getMessage());
        } catch (SQLException e) {
            System.err.println("Errore di connessione al database per GESTIONALE_OWNER:");
            System.err.println("SQL State: " + e.getSQLState());
            System.err.println("Error Code: " + e.getErrorCode());
            System.err.println("Message: " + e.getMessage());
        }
    }
}
