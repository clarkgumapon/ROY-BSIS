# Expense Tracker Application

A full-stack expense tracking application with a modern React frontend and FastAPI backend. This application helps users track, categorize, and visualize their personal expenses.

![Expense Tracker Screenshot](https://via.placeholder.com/800x450.png?text=Expense+Tracker+Dashboard)

## Features

### User Features
- **User Authentication**: Register new accounts and login securely
- **Expense Management**: Add, edit, and delete expense records
- **Categorization**: Organize expenses by customizable categories
- **Budget Tracking**: Set monthly budgets and monitor spending against them
- **Data Visualization**: View spending patterns through various chart types:
  - Pie charts for expense breakdown by category
  - Bar charts for category distribution
  - Line charts for expense trends over time
  - Comparison charts for budget vs. actual spending
- **Recent Transactions**: Quickly review latest expenses
- **Date Filtering**: Filter expenses by date ranges
- **Dark Mode**: Always-on dark mode for better visual comfort

### Technical Features
- **Modern UI**: Built with Next.js, React 19, and Tailwind CSS
- **Responsive Design**: Works well on mobile, tablet, and desktop devices
- **Interactive Charts**: Powered by Recharts
- **Animations**: Smooth transitions with Framer Motion
- **Type Safety**: Full TypeScript integration
- **REST API**: Backend built with FastAPI and SQLAlchemy
- **SQLite Database**: Local storage for expense data
- **JWT Authentication**: Secure user authentication

## Getting Started

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- npm or pnpm

### Frontend Setup
1. Clone the repository
   ```
   git clone <repository-url>
   cd expense-tracker
   ```

2. Install frontend dependencies
   ```
   npm install
   # or
   pnpm install
   ```

3. Start the development server
   ```
   npm run dev
   # or
   pnpm run dev
   ```

4. Open http://localhost:3000 in your browser

### Backend Setup
1. Navigate to the backend directory
   ```
   cd backend
   ```

2. Create a virtual environment (optional but recommended)
   ```
   python -m venv venv
   # Windows
   .\venv\Scripts\activate
   # Unix or MacOS
   source venv/bin/activate
   ```

3. Install Python dependencies
   ```
   pip install -r requirements.txt
   ```

4. Start the backend server
   ```
   uvicorn main:app --reload
   ```

The backend API will be available at http://localhost:8000. The application uses SQLite with SQLAlchemy ORM. The database file will be created automatically when you first run the application.

## API Documentation

Once the backend is running, you can access the auto-generated API documentation at:
- http://localhost:8000/docs (Swagger UI)
- http://localhost:8000/redoc (ReDoc)

### Main API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /token | Login and get access token |
| POST | /users/ | Register new user |
| GET | /expenses/ | Get all expenses |
| POST | /expenses/ | Create new expense |
| PUT | /expenses/{id} | Update expense |
| DELETE | /expenses/{id} | Delete expense |
| GET | /expenses/stats/category | Get expenses by category |
| GET | /expenses/stats/time | Get expenses by time period |

## Usage Guide

### Adding Expenses
1. Log in to your account
2. Navigate to the "Add Expense" page
3. Fill in the expense details:
   - Amount
   - Category
   - Description
   - Date
4. Click "Save" to record the expense

### Viewing Statistics
The dashboard provides various visualizations:
- **Total Expenses**: Sum of all recorded expenses
- **Remaining Budget**: Difference between monthly budget and expenses
- **Average Daily Expense**: Average spending per transaction
- **Budget Utilization**: Percentage of monthly budget used

Charts are interactive and provide tooltips with detailed information.

### Managing Expenses
From the "Recent Transactions" section:
- Click the edit icon to modify an expense
- Click the delete icon to remove an expense

## Customization

### Currency Settings
You can change your preferred currency in the settings page.

### Monthly Budget
Adjust your monthly budget in the settings to better track your spending goals.

## Troubleshooting

### Common Issues
- **Backend connection errors**: Ensure the FastAPI server is running at http://localhost:8000
- **Authentication issues**: Check if your token has expired; try logging in again
- **Database errors**: If the database becomes corrupted, delete the `expense_tracker.db` file and restart the server

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [SQLAlchemy](https://www.sqlalchemy.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [Shadcn UI](https://ui.shadcn.com/) 