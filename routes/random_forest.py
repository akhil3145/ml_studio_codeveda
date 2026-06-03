
from fastapi import APIRouter

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    confusion_matrix,
    classification_report
)

from services import dataset_service
from models.random_forest_models import (
    RandomForestTrainRequest,
    RandomForestPredictionRequest
)

router = APIRouter()

@router.get("/test-random-forest")
def test_random_forest():

    return {
        "message": "Random Forest route working"
    }

@router.post("/train-random-forest")
def train_random_forest(
    request: RandomForestTrainRequest
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

    model = RandomForestClassifier(
        n_estimators=100,
        random_state=42
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

    dataset_service.random_forest_model = model
    dataset_service.random_forest_feature_columns = (
        X.columns.tolist()
    )
    dataset_service.random_forest_target_column = target

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

@router.post("/predict-random-forest")
def predict_random_forest(
    request: RandomForestPredictionRequest
):

    model = dataset_service.random_forest_model

    if model is None:
        return {
            "error": "Train model first"
        }

    feature_order = (
        dataset_service.random_forest_feature_columns
    )

    try:

        values = [
            request.features[col]
            for col in feature_order
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