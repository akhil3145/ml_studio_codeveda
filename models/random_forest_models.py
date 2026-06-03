from pydantic import BaseModel


class RandomForestTrainRequest(BaseModel):
    target_column: str


class RandomForestPredictionRequest(BaseModel):
    features: dict
    