import { useState } from "react";
import axios from "axios";

function UploadDataset({ setDatasetInfo }) {
  const [file, setFile] = useState(null);
  const [localDatasetInfo, setLocalDatasetInfo] =
    useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/upload",
        formData
      );

      setDatasetInfo(response.data);
      setLocalDatasetInfo(response.data);

    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div className="card">
      <h2>📂 Upload Dataset</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        className="upload-btn"
        onClick={handleUpload}
      >
        Upload
      </button>

      {localDatasetInfo && (
        <div className="card">
          <h3>📊 Dataset Information</h3>

          <p>
            <strong>File:</strong>{" "}
            {localDatasetInfo.filename}
          </p>

          <p>
            <strong>Rows:</strong>{" "}
            {localDatasetInfo.rows}
          </p>

          <p>
            <strong>Columns:</strong>{" "}
            {localDatasetInfo.columns}
          </p>

          <div className="column-list">
            <h4>Column Names</h4>

            {localDatasetInfo.column_names.map(
              (col) => (
                <div
                  className="column-item"
                  key={col}
                >
                  • {col}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadDataset;