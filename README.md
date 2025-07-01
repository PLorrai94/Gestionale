# Gestionale Microservizi - Java, Spring, Oracle, Docker

> Progetto realizzato da uno sviluppatore backend Java come **esercizio di stile e portfolio** per dimostrare competenze architetturali e tecniche nel contesto dei microservizi.  
> Obiettivo: **inserimento nel curriculum** come progetto dimostrativo.

## 🧭 Descrizione del Progetto

Questo progetto è una **piattaforma gestionale a microservizi** sviluppata in Java, con Spring Boot, Oracle Database e Docker. L'obiettivo è creare un sistema modulare, sicuro e scalabile, prendendo ispirazione dalle funzionalità essenziali dei moderni software ERP.

## 🏗️ Architettura a Microservizi

### Microservizi Identificati:

- **UI Service**  
  Gestisce l'interfaccia grafica e le interazioni utente.

- **Management & Processing Service**  
  Contiene la logica di business principale (utenti, ordini, prodotti, ecc.).

- **Batch Service**  
  Esegue elaborazioni asincrone pianificate (es. report, aggiornamenti notturni).

- **Security Service**  
  Gestisce autenticazione, autorizzazione, ruoli e utenti.

## ⚙️ Tecnologie Utilizzate

| Categoria            | Tecnologie                                         |
|----------------------|----------------------------------------------------|
| Linguaggio           | Java                                               |
| Backend Framework    | Spring Boot, Spring Security, Spring Cloud         |
| Database             | Oracle Database (XE o tramite container Docker)    |
| API                  | RESTful API, Spring Cloud Gateway                  |
| Sicurezza            | JWT, Spring Security, Authentication Provider      |
| Container            | Docker                                             |
| Orchestrazione (*)   | Kubernetes (opzionale per ambienti avanzati)       |
| Async Messaging (*)  | Kafka / RabbitMQ (per Batch e disaccoppiamento)    |

> ⚠️ *Le funzionalità contrassegnate con (*) sono opzionali o future espansioni.*

## 🔗 Comunicazione Inter-Servizi

- **RESTful API**: per la comunicazione sincrona tra servizi.
- **Event-driven** (opzionale): tramite Kafka o RabbitMQ per elaborazioni asincrone.

## 📜 API Gateway

Utilizzo di:
- **Spring Cloud Gateway** oppure
- **Netflix Zuul** (per integrazioni con Spring Cloud Netflix)

## 📦 Containerizzazione & DevOps

- Ogni microservizio è **containerizzato con Docker**
- Definita una struttura per il deployment semplice in ambienti di sviluppo.
- Futuro supporto per orchestrazione con Kubernetes.

## 🛡️ Sicurezza

- **JWT** per la gestione dei token e accesso sicuro alle API.
- Ruoli e permessi gestiti tramite Spring Security e database Oracle.

## 📝 Autore

Sviluppato da **PLorrai94**  
Backend Developer & Appassionato di Architetture Distribuite

Questo progetto è stato realizzato con l'obiettivo di **esercitarmi, migliorare il mio portfolio**, e dimostrare competenze concrete nella progettazione di sistemi enterprise moderni.

---

### 📌 Note

- Il progetto è attualmente **in sviluppo attivo**.
- L'ambiente di sviluppo utilizza **Maven**, **Docker**, e uno stack Spring full-featured.
