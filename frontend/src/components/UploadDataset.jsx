import { useState } from "react";
import axios from "axios";

function UploadDataset({ setDatasetInfo }) {
  const [file, setFile] = useState(null);
  const [localDatasetInfo, setLocalDatasetInfo] = useState(null);

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
    <section className="card panel">
      <div className="section-heading">
        <p className="section-kicker">Step 1</p>
        <h2>Upload Dataset</h2>
        <p className="section-description">
          Add a CSV file to inspect its size and available columns before training.
        </p>
      </div>

      <div className="field-group">
        <label className="field-label">Dataset file</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      <button
        className="upload-btn"
        onClick={handleUpload}
      >
        Upload Dataset
      </button>

      {localDatasetInfo && (
        <div className="subcard">
          <div className="section-heading compact">
            <p className="section-kicker">Dataset Summary</p>
            <h3>Imported file details</h3>
          </div>

          <div className="metric-grid">
            <div className="metric-card">
              <span className="metric-label">File</span>
              <strong className="metric-value metric-value-text">
                {localDatasetInfo.filename}
              </strong>
            </div>

            <div className="metric-card">
              <span className="metric-label">Rows</span>
              <strong className="metric-value">
                {localDatasetInfo.rows}
              </strong>
            </div>

            <div className="metric-card">
              <span className="metric-label">Columns</span>
              <strong className="metric-value">
                {localDatasetInfo.columns}
              </strong>
            </div>
          </div>

          <div className="tag-section">
            <h4>Column Names</h4>

            <div className="column-list">
              {localDatasetInfo.column_names.map((col) => (
                <div
                  className="column-item"
                  key={col}
                >
                  {col}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default UploadDataset;
