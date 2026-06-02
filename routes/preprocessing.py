import pandas as pd 
from fastapi import APIRouter
from models.preprocessing_models import MissingValueRequest
from services import dataset_service
from sklearn.preprocessing import LabelEncoder
from models.preprocessing_models import EncodeRequest
from sklearn.preprocessing import (LabelEncoder, StandardScaler,MinMaxScaler)
from models.preprocessing_models import (MissingValueRequest, ScaleRequest)
router = APIRouter()


@router.get("/test-preprocessing")
def test_preprocessing():
    return {
        "message": "Preprocessing route working"
    }


@router.post("/fill-missing")
def fill_missing(request: MissingValueRequest):

    df = dataset_service.current_df

    if df is None:
        return {
            "error": "Upload dataset first"
        }

    if request.column not in df.columns:
        return {
            "error": "Column not found"
        }

    if request.method == "mean":
        value = df[request.column].mean()

    elif request.method == "median":
        value = df[request.column].median()

    elif request.method == "mode":
        value = df[request.column].mode()[0]

    else:
        return {
            "error": "Method must be mean, median, or mode"
        }

    missing_before = int(df[request.column].isnull().sum())

    df[request.column] = df[request.column].fillna(value)

    missing_after = int(df[request.column].isnull().sum())

    return {
        "column": request.column,
        "method": request.method,
        "filled_with": str(value),
        "missing_before": missing_before,
        "missing_after": missing_after
    }

@router.post("/encode")
def encode(request: EncodeRequest):

    df = dataset_service.current_df

    if df is None:
        return {
            "error": "Upload dataset first"
        }

    if request.column not in df.columns:
        return {
            "error": "Column not found"
        }

    le = LabelEncoder()
    df[request.column] = le.fit_transform(df[request.column])

    return {
        "column": request.column,
        "encoded_values": df[request.column].tolist()
    }

@router.get("/dataset-info")
def dataset_info():

    print(dataset_service.current_df)
    df = dataset_service.current_df

    if df is None:
        return {
            "error": "Upload dataset first"
        }

    return {
        "rows": int(df.shape[0]),
        "columns": int(df.shape[1]),

        "data_types": {
            col: str(dtype)
            for col, dtype in df.dtypes.items()
        },

        "missing_values": {
            col: int(count)
            for col, count in df.isnull().sum().items()
        }
    }

@router.post("/label-encode")
def label_encode(request: EncodeRequest):

    df = dataset_service.current_df

    if df is None:
        return {
            "error": "Upload dataset first"
        }

    if request.column not in df.columns:
        return {
            "error": "Column not found"
        }

    encoder = LabelEncoder()

    df[request.column] = encoder.fit_transform(
        df[request.column]
    )

    mapping = {
        original: int(encoded)
        for original, encoded
        in zip(
            encoder.classes_,
            encoder.transform(encoder.classes_)
        )
    }

    return {
        "column": request.column,
        "mapping": mapping
    }


@router.post("/one-hot-encode")
def one_hot_encode(request: EncodeRequest):

    df = dataset_service.current_df

    if df is None:
        return {
            "error": "Upload dataset first"
        }

    if request.column not in df.columns:
        return {
            "error": "Column not found"
        }

    categories = df[request.column].unique().tolist()

    encoded_df = pd.get_dummies(
        df,
        columns=[request.column]
    )

    dataset_service.current_df = encoded_df

    return {
        "encoded_column": request.column,
        "categories": categories,
        "new_columns": encoded_df.columns.tolist()
    }

@router.post("/scale-data")
def scale_data(request:ScaleRequest):
    df = dataset_service.current_df

    if df is None:
        return{
            "error": "Upload dataset first"
        }
    for column in request.column:
        if column  not in df.columns:
            return {
                "error":f"{column} not found"
            }
    if request.method == "standard":
        scaler = StandardScaler()

    elif request.method == "minmax":
        scaler = MinMaxScaler()

    else:
        return {
            "error": "method must be standard or minmax"
        }
    df[request.column] = scaler.fit_transform(df[request.columns])

    return {
        "scaled_columns": request.column,
        "method": request.method
    }

@router.get("/preview")
def preview():

    df = dataset_service.current_df

    if df is None:
        return {
            "error": "Upload dataset first"
        }

    return {
        "preview": df.head().to_dict(orient="records")
    }