# Web Scraping Workflow Automation Platform

This project is a web application designed to automate **web scraping workflows** through a **visual and intuitive interface**.  
It allows users to create, execute, monitor, and share scraping workflows **without writing code**.

The project was developed as an academic project at **VisioAd** in a summer internship.

---

## Features

- Visual workflow editor (node-based)
- Create, edit, and delete scraping workflows
- Execute workflows and monitor their progress
- View execution history and detailed logs
- Share workflows via public links (read-only)
- Clone shared workflows
- Secure authentication and user management

---

## Actors

- **User**
  - Create, edit, execute, share, and clone workflows
  - View execution results and logs

- **Guest**
  - View shared workflows in read-only mode

---

## Architecture

The application follows the **MVC (Model–View–Controller)** architectural pattern to ensure:
- Clear separation of concerns
- Maintainability
- Scalability

---

## Technologies Used

- **Next.js** – Full-stack React framework
- **React Flow** – Visual workflow editor
- **Puppeteer** – Web scraping engine
- **Prisma** – ORM for database management
- **Clerk** – Authentication and user management
- **PostgreSQL** – Database
- **Figma** – UI/UX design
- **Postman** – API testing
- **GitHub** – Version control

---

## User Interface

### Authentication
Secure authentication using Clerk.

<img width="1921" height="1081" alt="image" src="https://github.com/user-attachments/assets/5f80fecc-6489-41b7-8bcb-28e014f916a6" />

---

### Dashboard
Overview of executions, phases, and statistics.

<img width="1921" height="1081" alt="image" src="https://github.com/user-attachments/assets/ca0fe7fa-6626-4e51-86c1-ab38065b11f7" />

---

### Workflow Management
List of all workflows with options to execute, edit, delete, or share.

<img width="1921" height="1081" alt="image" src="https://github.com/user-attachments/assets/b8c77e60-55d6-42ab-85bd-c8948f531218" />

---


### Visual Workflow Editor
Drag-and-drop editor to build scraping workflows using connected nodes.

<img width="1921" height="1081" alt="image" src="https://github.com/user-attachments/assets/3dddaf88-eccb-432b-8468-04676d7b20cd" />

---

### Execution Monitoring
Track workflow executions and view their status.

<img width="1921" height="1081" alt="image" src="https://github.com/user-attachments/assets/20e0e4dc-8f85-448c-8a38-2faa4e8d917a" />

---

### Logs Viewer
Detailed logs for debugging and monitoring workflow behavior.

<img width="1921" height="1081" alt="image" src="https://github.com/user-attachments/assets/3d7d7cee-662f-4f2e-acd9-b2234372d4f2" />

