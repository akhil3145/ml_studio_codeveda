import { useState } from "react";
import axios from "axios";

function TrainModel({ datasetInfo, targetColumn ,setTargetColumn,model,setModel})  {
  
  const [result, setResult] = useState(null);

  const handleTrain = async () => {
    if (!targetColumn) {
      alert("Please select a target column");
      return;
    }

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
      }
      else if (model === "linear-regression") {
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
    } catch (error) {
      console.error(error);
      alert("Training failed");
    }
  };

  return (
    <div className="card">
      <h2>🤖 Train Model</h2>

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

      <br />
      <br />

      {datasetInfo && (
        <>
          <label>Target Column</label>

          <br />

          <select
            value={targetColumn}
            onChange={(e) =>
              setTargetColumn(e.target.value)
            }
          >
            <option value="">
              Select Column
            </option>

            {datasetInfo.column_names.map(
              (col) => (
                <option
                  key={col}
                  value={col}
                >
                  {col}
                </option>
              )
            )}
          </select>

          <br />
          <br />
        </>
      )}

      <button
        className="upload-btn"
        onClick={handleTrain}
      >
        Train Model
      </button>

      {result && (
        <div
          className="card"
          style={{ marginTop: "20px" }}
        >
          <h3>📈 Training Results</h3>

          <p>
            <strong>Accuracy:</strong>{" "}
            {result.accuracy}
          </p>

          <p>
            <strong>Training Rows:</strong>{" "}
            {result.training_rows}
          </p>

          <p>
            <strong>Testing Rows:</strong>{" "}
            {result.testing_rows}
          </p>
        </div>
      )}
    </div>
  );
}

export default TrainModel;