import { useState } from "react";

function TrainModel() {
  const [model, setModel] = useState("knn");

  const handleTrain = () => {
    alert(`Training ${model}`);
  };

  return (
    <div className="card">
      <h2>🤖 Train Model</h2>

      <select
        value={model}
        onChange={(e) =>
          setModel(e.target.value)
        }
      >
        <option value="knn">
          KNN
        </option>

        <option value="logistic">
          Logistic Regression
        </option>

        <option value="decision-tree">
          Decision Tree
        </option>

        <option value="random-forest">
          Random Forest
        </option>

        <option value="linear-regression">
          Linear Regression
        </option>
      </select>

      <br />
      <br />

      <button
        className="upload-btn"
        onClick={handleTrain}
      >
        Train Model
      </button>
    </div>
  );
}

export default TrainModel;