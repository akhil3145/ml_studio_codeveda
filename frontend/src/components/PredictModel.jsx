import { useState } from "react";
import axios from "axios";

function PredictModel({
  datasetInfo,
  targetColumn,
}) {
  const [inputs, setInputs] = useState({});
  const [prediction, setPrediction] = useState("");

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
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict-knn",
        {
          features: inputs,
        }
      );

      setPrediction(response.data.prediction);
    } catch (error) {
      console.error(error);
      alert("Prediction failed");
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
      >
        Predict
      </button>

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
