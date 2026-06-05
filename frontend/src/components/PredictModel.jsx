import { useState } from "react";
import axios from "axios";

function PredictModel({
  datasetInfo,
  targetColumn,
}) {
  const [inputs, setInputs] =
    useState({});

  const [prediction,
    setPrediction] =
    useState("");

  const handleChange = (
    column,
    value
  ) => {
    setInputs({
      ...inputs,
      [column]: Number(value),
    });
  };

  const handlePredict =
    async () => {
      try {
        const response =
          await axios.post(
            "http://127.0.0.1:8000/predict-knn",
            {
              features: inputs,
            }
          );

        setPrediction(
          response.data.prediction
        );
      } catch (error) {
        console.error(error);
        alert(
          "Prediction failed"
        );
      }
    };

  if (
    !datasetInfo ||
    !targetColumn
  ) {
    return null;
  }

  const featureColumns =
    datasetInfo.column_names.filter(
      (col) =>
        col !== targetColumn
    );

  return (
    <div className="card">
      <h2>🔮 Predict</h2>

      {featureColumns.map(
        (column) => (
          <div key={column}>
            <label>
              {column}
            </label>

            <br />

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

            <br />
            <br />
          </div>
        )
      )}

      <button
        className="upload-btn"
        onClick={handlePredict}
      >
        Predict
      </button>

      {prediction && (
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <h3>
            Prediction:
          </h3>

          <p>
            {prediction}
          </p>
        </div>
      )}
    </div>
  );
}

export default PredictModel;