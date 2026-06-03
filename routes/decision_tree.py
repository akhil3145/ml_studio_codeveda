from fastapi import APIRouter

from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import (
    accuracy_score,
    confusion_matrix,
    classification_report
)

from services import dataset_service
from models.decision_tree_models import (
    DecisionTreeTrainRequest,
    DecisionTreePredictionRequest
)

router = APIRouter()

@router.get("/test-decision-tree")
def test_decision_tree():

    return {
        "message": "Decision Tree route working"
    }

@router.post("/train-decision-tree")
def train_decision_tree(
    request: DecisionTreeTrainRequest
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

    model = DecisionTreeClassifier(
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

    dataset_service.decision_tree_model = model
    dataset_service.decision_tree_feature_columns = (
        X.columns.tolist()
    )
    dataset_service.decision_tree_target_column = target

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

@router.post("/predict-decision-tree")
def predict_decision_tree(
    request: DecisionTreePredictionRequest
):

    model = dataset_service.decision_tree_model

    if model is None:
        return {
            "error": "Train model first"
        }

    feature_order = (
        dataset_service.decision_tree_feature_columns
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