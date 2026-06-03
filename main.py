from fastapi import FastAPI
from routes.preprocessing import router as preprocessing_router
from routes.upload import router as upload_router
from routes.regression import router as regression_router
from routes import knn
from routes import logistic_regression

app = FastAPI()

app.include_router(upload_router)
app.include_router(preprocessing_router)
app.include_router(regression_router)
app.include_router(knn.router)
app.include_router(logistic_regression.router)

@app.get("/")
def home():
    return {"message": "ML Studio Backend Running"}