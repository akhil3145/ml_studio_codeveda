from fastapi import APIRouter
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error,r2_score
from services import dataset_service
from models.regression_models import regressionReuest
from models.regression_models import (regressionReuest, PredictionRequest)  
router  = APIRouter()

@router.get("/test-regression")
def test_regression():
    return{"message": "Regression route working"
    }

@router.post("/train-linear-regression")
def train_linear_regression(
    request: regressionReuest
):

    df = dataset_service.current_df

    if df is None:
        return {
            "error": "Upload dataset first"
        }

    target = request.target_column

    if target not in df.columns.astype(str):
        return {
            "error": "Target column not found"
        }

    X = df.drop(columns=[int(target)])
    y = df[int(target)]

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42
    )

    model = LinearRegression()

    model.fit(X_train, y_train)
    dataset_service.linear_regression_model = model

    dataset_service.target_column = target

    dataset_service.feature_columns = [
        str(col)

        for col in X.columns
    ]



    predictions = model.predict(X_test)

    mse = mean_squared_error(
        y_test,
        predictions
    )

    r2 = r2_score(
        y_test,
        predictions
    )

    return {
        "target_column": target,
        "training_rows": len(X_train),
        "testing_rows": len(X_test),
        "r2_score": round(float(r2), 4),
        "mse": round(float(mse), 4),
        "coefficients": {
            str(col): round(float(coef), 4)
            for col, coef in zip(
                X.columns,
                model.coef_
            )
        },
        "intercept": round(
            float(model.intercept_),
            4
        )
    }

@router.get("/model-info")
def model_info():

    if dataset_service.linear_regression_model is None:
        return {
            "error": "No trained model"
        }

    return {
        "target_column": dataset_service.target_column,
        "feature_columns": dataset_service.feature_columns
    }

@router.post("/predict-linear-regression")
def predict_linear_regression(
    request: PredictionRequest
):

    model = dataset_service.linear_regression_model

    if model is None:
        return {
            "error": "Train model first"
        }

    feature_order = dataset_service.feature_columns

    try:

        values = [
            request.features[col]
            for col in feature_order
        ]

    except KeyError as e:

        return {
            "error": f"Missing feature {e}"
        }

    prediction = model.predict([values])

    return {
        "prediction": round(
            float(prediction[0]),
            4
        )
    }

@router.get("/first-row")
def first_row():

    df = dataset_service.current_df

    if df is None:
        return {
            "error": "Upload dataset first"
        }

    return df.iloc[0].to_dict()