# ML Studio

<div align="center">

![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Build-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Language-Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![scikit-learn](https://img.shields.io/badge/ML-scikit--learn-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active%20Development-0F172A?style=for-the-badge)

**A full-stack machine learning dashboard for dataset upload, model training, evaluation, and browser-based prediction.**

</div>

---

## 🚀 Overview

ML Studio is a web-based machine learning platform designed to make core ML workflows accessible through a clean, interactive dashboard. Users can upload CSV datasets, inspect dataset structure, select a target column, train multiple machine learning models, review performance metrics, and generate predictions directly from the browser.

This project is built as a serious full-stack application that combines modern frontend development with production-style API design and practical machine learning integration. It is intended to demonstrate applied engineering across UI, API architecture, and model orchestration.

## 🎯 Why This Project Matters

ML Studio is more than a demo interface for machine learning. It reflects the kind of product thinking required to turn technical workflows into usable software:

- Browser-based dataset ingestion and model workflow
- Clear separation between frontend and backend responsibilities
- Multiple model training routes exposed through a consistent API
- Responsive user interface with status indicators and feedback states
- Extensible foundation for adding preprocessing, experiment tracking, and model persistence

## ✨ Features

- Upload CSV datasets
- Dataset summary and feature inspection
- Target column selection
- Train machine learning models
- KNN Classification
- Logistic Regression
- Decision Tree
- Random Forest
- Linear Regression
- Real-time prediction interface
- Accuracy and training metrics
- Responsive dashboard UI
- Loading states and status indicators

## 🔄 Workflow

1. Upload dataset
2. Inspect dataset information
3. Select target column
4. Select model
5. Train model
6. View metrics
7. Make predictions

## 🛠️ Tech Stack

### 🎨 Frontend

- React
- Vite
- Axios
- CSS

### ⚙️ Backend

- FastAPI
- Python
- Pandas
- NumPy
- Scikit-learn

## 🏗️ Architecture

ML Studio uses a straightforward full-stack architecture with a React client consuming a FastAPI backend.

```text
[ React + Vite Frontend ]
          |
          | HTTP / JSON
          v
[ FastAPI Backend ]
          |
          | Dataset parsing, model training, prediction
          v
[ Pandas + NumPy + scikit-learn ]
```

### 🖥️ Frontend Responsibilities

- File upload UI
- Dataset summary display
- Target/model selection
- Metrics presentation
- Prediction form
- Loading and status feedback

### 🔌 Backend Responsibilities

- CSV ingestion
- Dataset metadata extraction
- Model training endpoints
- Prediction endpoint
- ML workflow orchestration using scikit-learn

## 📸 Screenshots

Below is the current product flow captured from the application UI. Save the screenshot files inside `backend/screenshots/` with these filenames:

- `hero-overview.png`
- `01_upload_dataset.png`
- `02_train_model.png`
- `03_prediction_result.png`

### Hero Overview

![Hero Overview](./screenshots/hero-overview.png)

### Dataset Upload and Inspection

![Dataset Upload and Inspection](./screenshots/01_upload_dataset.png)

### Model Training Results

![Model Training Results](./screenshots/02_train_model.png)

### Prediction Interface

![Prediction Interface](./screenshots/03_prediction_result.png)

## 📦 Installation

### ✅ Prerequisites

Make sure you have installed:

- Node.js 18+
- npm
- Python 3.10+
- pip

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ml-studio.git
cd ml-studio
```

### 2. Set Up the Backend

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:

#### Windows

```bash
venv\Scripts\activate
```

#### macOS / Linux

```bash
source venv/bin/activate
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

Backend should run on:

```bash
http://127.0.0.1:8000
```

### 3. Set Up the Frontend

Open a new terminal:

```bash
cd backend/frontend
npm install
npm run dev
```

Frontend should run on:

```bash
http://127.0.0.1:5173
```

## ▶️ Usage

### 📁 Upload a Dataset

- Open the frontend in the browser
- Upload a CSV file
- Wait for dataset information to appear

### 🔍 Inspect the Dataset

- Review file name, row count, and column count
- Inspect available feature and target columns

### 🧠 Train a Model

- Select a machine learning model
- Choose the target column
- Click `Train Model`
- Review accuracy and training metrics

### 📈 Make Predictions

- Enter values for feature columns
- Click `Predict`
- Review the prediction output in the dashboard

## 🗂️ Project Structure

```text
ML_studio/
|-- README.md
|-- backend/
|   |-- main.py
|   |-- requirements.txt
|   |-- models/
|   |   |-- decision_tree_models.py
|   |   |-- knn_models.py
|   |   |-- logistic_models.py
|   |   |-- preprocessing_models.py
|   |   |-- random_forest_models.py
|   |   `-- regression_models.py
|   |-- routes/
|   |   |-- decision_tree.py
|   |   |-- knn.py
|   |   |-- logistic_regression.py
|   |   |-- preprocessing.py
|   |   |-- random_forest.py
|   |   |-- regression.py
|   |   `-- upload.py
|   |-- screenshots/
|   |   |-- 01_upload_dataset.png
|   |   |-- 02_train_model.png
|   |   |-- 03_prediction_result.png
|   |   `-- hero-overview.png
|   |-- services/
|   |   `-- dataset_service.py
|   `-- frontend/
|       |-- package.json
|       |-- vite.config.js
|       |-- public/
|       `-- src/
|           |-- App.jsx
|           |-- App.css
|           |-- index.css
|           `-- components/
|               |-- UploadDataset.jsx
|               |-- TrainModel.jsx
|               `-- PredictModel.jsx
```

## 🌐 API Overview

The frontend communicates with the backend using HTTP requests via Axios.

### Example Routes

- `POST /upload`
- `POST /train-knn`
- `POST /train-logistic`
- `POST /train-decision-tree`
- `POST /train-random-forest`
- `POST /train-linear-regression`
- `POST /predict-knn`

This route-based design keeps each training workflow modular and easy to extend.

## 🚧 Future Improvements

- Model persistence and download support
- Additional evaluation metrics such as precision, recall, F1-score, and RMSE
- Confusion matrix and visual performance charts
- Feature preprocessing controls from the UI
- Hyperparameter tuning panel
- Model comparison view
- Authentication and user workspaces
- Deployment with Docker and cloud hosting
- File validation and schema-aware input handling
- Prediction support for all trained model types

## 📚 Learning Outcomes

This project demonstrates practical experience in:

- Building full-stack applications with React and FastAPI
- Designing clean API-driven frontend workflows
- Integrating machine learning models into user-facing software
- Managing dataset upload and inspection pipelines
- Structuring backend services and route modules
- Presenting ML outputs through thoughtful UI/UX
- Handling asynchronous loading, success, and error states
- Organizing a project in a scalable, recruiter-friendly way

## 👤 Author

**Akhil Pandey**

Computer Science Student | Machine Learning Intern

GitHub: https://github.com/akhil3145

LinkedIn: https://www.linkedin.com/in/akhil3145/


## 🙌 Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Pandas](https://pandas.pydata.org/)
- [NumPy](https://numpy.org/)
- [scikit-learn](https://scikit-learn.org/)

Special thanks to the open-source ecosystem for the tools and libraries that make projects like this possible.

## 💼 Portfolio Note

ML Studio is positioned as a practical engineering project that bridges product design, API development, and applied machine learning. It is especially suitable for showcasing:

- Full-stack development ability
- API integration skills
- ML application engineering
- UI/UX improvement work
- End-to-end product execution

