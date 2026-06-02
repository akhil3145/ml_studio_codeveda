from fastapi import APIRouter, UploadFile, File
import pandas as pd

from services import dataset_service

router = APIRouter()


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    try:
        dataset_service.current_df = pd.read_csv(file.file)

        if dataset_service.current_df.shape[1] == 1:
            raise Exception("Likely whitespace separated")

    except:
        file.file.seek(0)

        dataset_service.current_df = pd.read_csv(
            file.file,
            sep=r"\s+",
            header=None
        )

    return {
        "filename": file.filename,
        "rows": dataset_service.current_df.shape[0],
        "columns": dataset_service.current_df.shape[1],
        "column_names": dataset_service.current_df.columns.tolist()
    }