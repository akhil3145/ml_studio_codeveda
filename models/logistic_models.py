from pydantic import BaseModel


class LogisticTrainRequest(BaseModel):
    target_column: str


class LogisticPredictionRequest(BaseModel):
    features: dict