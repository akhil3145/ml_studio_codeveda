from fastapi import APIRouter

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    confusion_matrix,
    classification_report
)

from services import dataset_service
from models.logistic_models import (
    LogisticTrainRequest,
    LogisticPredictionRequest
)

router = APIRouter()

@router.get("/test-logistic")
def test_logistic():
    return {
        "message": "Logistic Regression route working"
    }

@router.post("/train-logistic")
def train_logistic(
    request: LogisticTrainRequest
):

    df = dataset_service.current_df

    if df is None:
        return {
            "error": "Upload dataset first"
        }

    target = request.target_column

    if target not in df.columns:
        return {
            "error": "Target column not found"
        }

    X = df.drop(columns=[target])
    y = df[target]

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42
    )

    model = LogisticRegression(
        max_iter=1000
    )

    model.fit(
        X_train,
        y_train
    )

    predictions = model.predict(
        X_test
    )

    accuracy = accuracy_score(
        y_test,
        predictions
    )

    matrix = confusion_matrix(
        y_test,
        predictions
    )

    report = classification_report(
        y_test,
        predictions,
        output_dict=True
    )

    dataset_service.logistic_model = model
    dataset_service.logistic_feature_columns = (
        X.columns.tolist()
    )
    dataset_service.logistic_target_column = target

    return {
        "accuracy": round(
            float(accuracy),
            4
        ),
        "confusion_matrix":
            matrix.tolist(),
        "classification_report":
            report,
        "training_rows":
            len(X_train),
        "testing_rows":
            len(X_test)
    }

@router.post("/predict-logistic")
def predict_logistic(
    request: LogisticPredictionRequest
):

    model = dataset_service.logistic_model

    if model is None:
        return {
            "error": "Train model first"
        }

    feature_order = (
        dataset_service.logistic_feature_columns
    )

    try:

        values = [
            request.features[col]
            for col in feature_order # type: ignore
        ]

    except KeyError as e:

        return {
            "error": f"Missing feature {e}"
        }

    prediction = model.predict(
        [values]
    )

    return {
        "prediction": str(
            prediction[0]
        )
    }