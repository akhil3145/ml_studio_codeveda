from pydantic import BaseModel

class MissingValueRequest(BaseModel):
    column:str
    method:str

class EncodeRequest(BaseModel):
    column:str

class ScaleRequest(BaseModel):
    column:list[str]
    method:str