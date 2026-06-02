from pydantic import BaseModel
from typing import Dict
class regressionReuest(BaseModel):
    target_column:str

class PredictionRequest(BaseModel):
    features: Dict[str,float]
    