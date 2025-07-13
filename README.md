# Agentic Ethereum Hackathon India

# Ethereum Based Multi-cloud Federation Secure IAM - [Code Connectors]

Welcome to our submission for the *Agentic Ethereum Hackathon* by Reskilll & Geodework! This repository includes our project code, documentation, and related assets.

---

## 📌 Problem Statement

Organizations today operate across multiple cloud platforms like AWS, Azure, GCP, Odoo, and more. But Identity and Access Management (IAM) remains fragmented and unsecure

---


## 💡 Our Solution

*Project Name:* Ethereum Based Multi-cloud Federation Secure IAM  

We propose a Decentralized Multi-Cloud Federation System that enables a user to authenticate seamlessly across cloud providers using:
Decentralized Identifiers (DIDs)
Verifiable Credentials (VCs)
Zero-Knowledge Proofs (ZKPs)
Smart Contracts for on-chain verification

This system allows one-time credential issuance and access to multiple clouds without manual IAM synchronization

---

## Execution

### Frontend
- Directory: `AgenticEthereumHackathonIndia/frontend/project`
- Command: `npm run dev`

### Backend
#### Option 1
- Directory: `AgenticEthereumHackathonIndia/backend/SecureIAM`
- Commands:
  ```
  mvn clean install
  mvn spring-boot:run
  ```

#### Option 2
- Directory: `AgenticEthereumHackathonIndia/backend/SecureIAM/target`
- Command:
  ```
  java -jar SecureIAM-0.0.1-SNAPSHOT.jar
  ```

### Python Microservice
- Directory: `AgenticEthereumHackathonIndia/backend/py-services/src`
- Command:
  ```
  uvicorn src.main:app --reload --port 8000
  ```

---

## 🧱 Tech Stack

- 🖥 Frontend: React
- ⚙ Backend: Java Spring Boot
- Microservices: Python and Java Spring Boot
- 🧠 AI: LangChain -Future implemented 
- 🔗 Blockchain: Ethereum, Solidity, Ganache
- 🔍 DB/Storage: PostgreSQL 

---

## 📽 Demo

- 🎥 *Video Link*: [YouTube/Drive Link]  

---

## 📂 Repository Structure

```bash
.
├── frontend/project          # Frontend code
├── backend/SecureIAM          # Backend code
├── backend/py-services          # Python Microservices
├── backend/py-services/src/services/zkp-prover         # Smart contracts
├── assets/             # PPT, video links, images
├── docs/               # Architecture diagram, notes
├── README.md           # A detailed description of your project

