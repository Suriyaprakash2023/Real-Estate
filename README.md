# FoodKing

FoodKing is a full-stack food delivery app where users can order food from different restaurants, track their orders, and more. The app is built with React on the frontend, Django on the backend, and PostgreSQL for the database.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation Instructions](#installation-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Tech Stack

- **Frontend:** React
- **Backend:** Django
- **Database:** PostgreSQL

## Features

- User authentication and authorization
- Browse and view restaurants and their menus
- Add items to the cart and place orders
- Real-time order tracking
- Admin panel to manage restaurants, menus, and orders

## Installation Instructions

To run this project locally, follow these instructions.

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/FoodKing.git](https://github.com/Suriyaprakash2023/FoodKing.git)
    cd FoodKing/server
    ```

2. Set up a virtual environment (optional but recommended):

    ```bash
    python -m venv env
    source env/bin/activate  # On Windows: env\Scripts\activate
    ```

3. Install the required dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Set up PostgreSQL and update the `settings.py` file with your database credentials.

5. Run database migrations:

    ```bash
    python manage.py migrate
    ```

6. Create a superuser (optional for admin panel access):

    ```bash
    python manage.py createsuperuser
    ```

7. Run the Django development server:

    ```bash
    python manage.py runserver
    ```

### Frontend Setup

1. Navigate to the frontend folder:

    ```bash
    cd ../client 
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Start the React development server:

    ```bash
    npm start
    ```

    The app will be available at `h
