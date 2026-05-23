# Crop Recommendation System

A full-stack web application that provides crop recommendations based on environmental factors such as temperature, humidity, rainfall, and soil nutrients (Nitrogen, Phosphorus, Potassium).

## Architecture

This project consists of two main components:
- **Backend (Express.js)**: A REST API that handles prediction requests. It utilizes a pre-trained machine learning model (`crop_model.pkl`) to generate recommendations.
- **Frontend (React + Vite)**: A modern, user-friendly interface that allows users to input environmental parameters and view crop recommendations. It also features interactive charts for data analytics.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shreyas-blr/DADV-MINI-PROJECT.git
   cd DADV-MINI-PROJECT
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

## Running the Application

To run both the frontend and backend servers locally, follow these steps:

1. **Start the Backend Server:**
   ```bash
   cd backend
   npm run dev
   ```
   The backend API will be available at `http://localhost:5001`.

2. **Start the Frontend Server:**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend application will be accessible at `http://localhost:5173`.

## Features

- **Crop Prediction**: Get accurate crop recommendations by inputting Nitrogen (N), Phosphorus (P), Potassium (K), Temperature, Humidity, pH, and Rainfall.
- **Interactive Dashboard**: Modern UI/UX with high-quality illustrations and icons instead of basic emojis.
- **Analytics**: Visualize environmental data and its relation to crop suitability using interactive charts.

## Technologies Used

- **Frontend**: React, Vite, Recharts, React Icons
- **Backend**: Node.js, Express.js
- **Machine Learning**: Python (scikit-learn) - *Model exported as `crop_model.pkl`*
