from pydantic import BaseModel


class KNNTrainRequest(BaseModel):
    target_column: str
    n_neighbors: int = 5

class KNNPredictionRequest(BaseModel):
    features: dict