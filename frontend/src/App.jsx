import "./App.css";
import { useState } from "react";
import PredictModel from "./components/PredictModel";
import UploadDataset from "./components/UploadDataset";
import TrainModel from "./components/TrainModel";

function App() {
  const [datasetInfo, setDatasetInfo] = useState(null);
  const [targetColumn, setTargetColumn] = useState("");
  const [model, setModel] = useState("knn");

  return (
    <div className="app-container">
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Machine Learning Workspace</p>
          <h1 className="title">ML Studio</h1>
          <p className="subtitle">
            Upload a dataset, train a model, and run predictions from one focused workspace.
          </p>
        </div>

        <div className="hero-stats" aria-label="Workspace summary">
          <div className="stat-pill">
            <span className="stat-label">Flow</span>
            <strong>Upload, train, predict</strong>
          </div>

          <div className="stat-pill">
            <span className="stat-label">Models</span>
            <strong>5 algorithms ready</strong>
          </div>

          <div className="stat-pill">
            <span className="stat-label">Status</span>
            <strong>{datasetInfo ? "Dataset loaded" : "Waiting for dataset"}</strong>
          </div>
        </div>
      </header>

      <section className="workspace-grid">
        <UploadDataset setDatasetInfo={setDatasetInfo} />

        <TrainModel
          datasetInfo={datasetInfo}
          targetColumn={targetColumn}
          setTargetColumn={setTargetColumn}
          model={model}
          setModel={setModel}
        />

        <PredictModel
          datasetInfo={datasetInfo}
          targetColumn={targetColumn}
          model={model}
        />
      </section>
    </div>
  );
}

export default App;
