# 🚀 ML Studio - Machine Learning Workflow Platform

<div align="center">

![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green?logo=fastapi)
![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-ML-orange?logo=scikitlearn)
![Pandas](https://img.shields.io/badge/Pandas-Data%20Processing-purple?logo=pandas)
![Status](https://img.shields.io/badge/Status-Active-success)

### A FastAPI-powered Machine Learning Studio for Dataset Analysis, Data Preprocessing, Model Training, and Real-Time Predictions.

</div>

---

# 📖 Overview

**ML Studio** is a machine learning platform developed using **FastAPI**, **Pandas**, and **Scikit-Learn**.

The project enables users to upload datasets, perform preprocessing operations, train machine learning models, evaluate performance metrics, and generate predictions through REST APIs.

Unlike traditional notebook-based workflows, this project exposes machine learning functionality through production-style API endpoints, making it easy to integrate with web applications and dashboards.

---

# ✨ Features

## 📂 Dataset Management

✅ Upload CSV Datasets

✅ Dataset Preview

✅ Dataset Metadata Analysis

✅ Data Type Inspection

✅ Missing Value Detection

---

## 🧹 Data Preprocessing

### Missing Value Handling

- Mean Imputation
- Median Imputation
- Mode Imputation

### Encoding Techniques

- Label Encoding
- One-Hot Encoding

### Feature Scaling

- Standard Scaling
- Min-Max Scaling

---

## 🤖 Machine Learning

### Linear Regression

- Train/Test Split
- Model Training
- Coefficient Analysis
- Intercept Analysis
- Performance Evaluation

### Prediction API

- Real-time Predictions
- Dynamic Feature Input
- Model Reusability

---

# 🏗️ System Architecture

```text
                User
                  │
                  ▼
        FastAPI REST Endpoints
                  │
                  ▼
          Dataset Processing
                  │
                  ▼
           Data Preprocessing
                  │
                  ▼
         Machine Learning Model
                  │
                  ▼
          Evaluation Metrics
                  │
                  ▼
             Predictions
```

---

# 🛠️ Technology Stack

| Category | Technology |
|-----------|------------|
| Backend | FastAPI |
| Language | Python |
| Data Processing | Pandas |
| Numerical Computing | NumPy |
| Machine Learning | Scikit-Learn |
| Validation | Pydantic |
| Server | Uvicorn |
| Version Control | Git & GitHub |

---

# 📁 Project Structure

```text
ML_STUDIO/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│
├── screenshots/
│
├── .gitignore
│
└── README.md
```

---

# 🔄 Application Workflow

```text
Upload Dataset
       │
       ▼
Dataset Analysis
       │
       ▼
Preprocessing
       │
       ▼
Train Model
       │
       ▼
Evaluate Performance
       │
       ▼
Store Model
       │
       ▼
Generate Predictions
```

---

# 📊 Model Performance

## Boston Housing Dataset

### Dataset Statistics

| Metric | Value |
|---------|---------|
| Rows | 506 |
| Columns | 14 |
| Missing Values | 0 |

---

## Linear Regression Results

| Metric | Score |
|---------|---------|
| R² Score | 0.6688 |
| Mean Squared Error | 24.2911 |
| Training Samples | 404 |
| Testing Samples | 102 |

---

## Prediction Example

### Input Features

```json
{
  "0": 0.00632,
  "1": 18,
  "2": 2.31,
  "3": 0,
  "4": 0.538,
  "5": 6.575,
  "6": 65.2,
  "7": 4.09,
  "8": 1,
  "9": 296,
  "10": 15.3,
  "11": 396.9,
  "12": 4.98
}
```

### Model Prediction

```json
{
  "prediction": 29.9534
}
```

### Actual Value

```text
24.0
```

---

# 📸 Screenshots

## 🔹 API Overview

![API Overview](screenshots/01_api_overview.png)

---

## 🔹 Dataset Upload

![Upload Dataset](screenshots/02_upload_form.png)

---

## 🔹 Dataset Successfully Loaded

![Dataset Loaded](screenshots/03_dataset_uploaded.png)

---

## 🔹 Dataset Information

![Dataset Information](screenshots/04_dataset_info.png)

---

## 🔹 Data Preprocessing

![Data Preprocessing](screenshots/05_preprocessing_scale.png)

---

## 🔹 Linear Regression Training

![Training Results](screenshots/06_regression_training.png)

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/akhil3145/ml_studio_codeveda.git
```

---

## Navigate to Backend

```bash
cd ml_studio_codeveda/backend
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Run FastAPI Server

```bash
uvicorn main:app --reload
```

---

## Open Swagger Documentation

```text
http://127.0.0.1:8000/docs
```

---

# 🎯 Future Enhancements

### Machine Learning

- [ ] K-Nearest Neighbors (KNN)
- [ ] Logistic Regression
- [ ] Decision Tree
- [ ] Random Forest
- [ ] Support Vector Machine (SVM)

### Platform Features

- [ ] React Frontend Dashboard
- [ ] Model Persistence (Joblib)
- [ ] Authentication System
- [ ] Dataset Versioning
- [ ] Docker Deployment
- [ ] Cloud Deployment

---

# 💡 Key Learnings

Through this project I gained practical experience in:

- Designing REST APIs with FastAPI
- Data preprocessing pipelines
- Machine Learning model training
- Feature engineering techniques
- Model evaluation and validation
- Backend architecture design
- Git and GitHub workflows

---

# 👨‍💻 Author

## Akhil Pandey

Computer Science Student | Machine Learning Enthusiast | Backend Developer

📌 Built as part of the **Codveda Machine Learning Internship Program**

---

<div align="center">

⭐ If you found this project interesting, consider starring the repository.

</div>
