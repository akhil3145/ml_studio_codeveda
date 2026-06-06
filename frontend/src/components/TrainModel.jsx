import { useState } from "react";
import axios from "axios";

function TrainModel({
  datasetInfo,
  targetColumn,
  setTargetColumn,
  model,
  setModel,
}) {
  const [result, setResult] = useState(null);
  const [isTraining, setIsTraining] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleTrain = async () => {
    if (!targetColumn) {
      alert("Please select a target column");
      return;
    }

    setIsTraining(true);
    setStatus({
      type: "loading",
      message: "Training model...",
    });

    try {
      let endpoint = "";

      if (model === "knn") {
        endpoint = "/train-knn";
      } else if (model === "logistic") {
        endpoint = "/train-logistic";
      } else if (model === "decision-tree") {
        endpoint = "/train-decision-tree";
      } else if (model === "random-forest") {
        endpoint = "/train-random-forest";
      } else if (model === "linear-regression") {
        endpoint = "/train-linear-regression";
      }

      let payload = {
        target_column: targetColumn,
      };

      if (model === "knn") {
        payload.n_neighbors = 5;
      }

      const response = await axios.post(
        `http://127.0.0.1:8000${endpoint}`,
        payload
      );

      setResult(response.data);
      setStatus({
        type: "success",
        message: "Model trained successfully",
      });
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message: "Training failed",
      });
      alert("Training failed");
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <section className="card panel">
      <div className="section-heading">
        <p className="section-kicker">Step 2</p>
        <h2>Train Model</h2>
        <p className="section-description">
          Choose an algorithm, select the target column, and keep the current training flow intact.
        </p>
      </div>

      <div className="field-group">
        <label className="field-label">Model type</label>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value="knn">KNN</option>
          <option value="logistic">Logistic Regression</option>
          <option value="decision-tree">Decision Tree</option>
          <option value="random-forest">Random Forest</option>
          <option value="linear-regression">Linear Regression</option>
        </select>
      </div>

      {datasetInfo && (
        <div className="field-group">
          <label className="field-label">Target Column</label>
          <select
            value={targetColumn}
            onChange={(e) => setTargetColumn(e.target.value)}
          >
            <option value="">
              Select Column
            </option>

            {datasetInfo.column_names.map((col) => (
              <option
                key={col}
                value={col}
              >
                {col}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        className="upload-btn"
        onClick={handleTrain}
        disabled={isTraining}
      >
        {isTraining ? (
          <>
            <span className="button-spinner" aria-hidden="true" />
            Training...
          </>
        ) : (
          "Train Model"
        )}
      </button>

      {status.message && (
        <div className={`status-message ${status.type}`}>
          {status.type === "loading" && (
            <span className="status-spinner" aria-hidden="true" />
          )}
          <span>
            {status.type === "success" && "✅ "}
            {status.type === "error" && "❌ "}
            {status.message}
          </span>
        </div>
      )}

      {result && (
        <div className="subcard">
          <div className="section-heading compact">
            <p className="section-kicker">Training Output</p>
            <h3>Model results</h3>
          </div>

          <div className="metric-grid">
            <div className="metric-card accent">
              <span className="metric-label">Accuracy</span>
              <strong className="metric-value">
                {(Number(result.accuracy) * 100).toFixed(1)}%
              </strong>
            </div>

            <div className="metric-card">
              <span className="metric-label">Training Rows</span>
              <strong className="metric-value">
                {result.training_rows}
              </strong>
            </div>

            <div className="metric-card">
              <span className="metric-label">Testing Rows</span>
              <strong className="metric-value">
                {result.testing_rows}
              </strong>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default TrainModel;
