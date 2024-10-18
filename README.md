# Keypro Coding Challenge

## Setup Development Environment

This project uses Docker and Dev Containers to set up the development environment. Follow the steps below to get started.

### Prerequisites

- Docker installed on your machine
- Visual Studio Code with the Remote - Containers extension

### Steps

1. **Clone the Repository**

Clone into your development machine.

2. **Open in Visual Studio Code**

Open the project directory in Visual Studio Code.

3. **Reopen in Container**

Press F1 and select Remote-Containers: Reopen in Container. This will build the Docker container defined in the .devcontainer folder and open the project inside the container.

## Running the Services

With the development environment setup:

### Backend (Django)

1. **Navigate to the Backend Directory**

    ```sh 
    cd backend
    ```

2. **Run Migrations**

    ```sh 
    python manage.py migrate
    ```

3. **Start the Django Development Server**

    ```sh 
    python manage.py runserver
    ```

### Frontend (React)

1. **Navigate to the Frontend Directory**

    ```sh 
    cd frontend
    ```

2. **Install Dependencies**

    ```sh 
    npm install
    ```

3. **Start the React Development Server**
    
    ```sh 
    npm start
    ```