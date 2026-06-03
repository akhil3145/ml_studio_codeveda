from pydantic import BaseModel


class DecisionTreeTrainRequest(BaseModel):
    target_column: str


class DecisionTreePredictionRequest(BaseModel):
    features: dict