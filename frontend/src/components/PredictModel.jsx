import { useState } from "react";
import axios from "axios";

function PredictModel({
  datasetInfo,
  targetColumn,
}) {
  const [inputs, setInputs] = useState({});
  const [prediction, setPrediction] = useState("");
  const [isPredicting, setIsPredicting] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleChange = (
    column,
    value
  ) => {
    setInputs({
      ...inputs,
      [column]: Number(value),
    });
  };

  const handlePredict = async () => {
    setIsPredicting(true);
    setStatus({
      type: "loading",
      message: "Generating prediction...",
    });

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict-knn",
        {
          features: inputs,
        }
      );

      setPrediction(response.data.prediction);
      setStatus({
        type: "success",
        message: "Prediction complete",
      });
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message: "Prediction failed",
      });
      alert("Prediction failed");
    } finally {
      setIsPredicting(false);
    }
  };

  if (!datasetInfo || !targetColumn) {
    return null;
  }

  const featureColumns = datasetInfo.column_names.filter(
    (col) => col !== targetColumn
  );

  return (
    <section className="card panel full-span">
      <div className="section-heading">
        <p className="section-kicker">Step 3</p>
        <h2>Predict</h2>
        <p className="section-description">
          Enter feature values for the selected dataset columns and generate a prediction.
        </p>
      </div>

      <div className="predict-grid">
        {featureColumns.map((column) => (
          <div key={column} className="field-group">
            <label className="field-label">
              {column}
            </label>

            <input
              type="number"
              step="any"
              onChange={(e) =>
                handleChange(
                  column,
                  e.target.value
                )
              }
            />
          </div>
        ))}
      </div>

      <button
        className="upload-btn"
        onClick={handlePredict}
        disabled={isPredicting}
      >
        {isPredicting ? (
          <>
            <span className="button-spinner" aria-hidden="true" />
            Predicting...
          </>
        ) : (
          "Predict"
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

      {prediction && (
        <div className="subcard prediction-card">
          <p className="section-kicker">Prediction Result</p>
          <h3>Output</h3>
          <p className="prediction-value">
            {prediction}
          </p>
        </div>
      )}
    </section>
  );
}

export default PredictModel;
