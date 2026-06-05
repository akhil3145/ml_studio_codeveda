import "./App.css";
import { useState } from "react";
import PredictModel from "./components/PredictModel";
import UploadDataset from "./components/UploadDataset";
import TrainModel from "./components/TrainModel";

function App() {
  const [datasetInfo, setDatasetInfo] =
          useState(null);

     const [targetColumn,
         setTargetColumn] =
          useState("");

     const[model,selectModel] =
          useState("knn");

  return (
    <div className="app-container">
      <h1 className="title">
        🚀 ML Studio
      </h1>

      <UploadDataset
        setDatasetInfo={setDatasetInfo}
      />

      <TrainModel
        datasetInfo={datasetInfo}
        targetColumn={targetColumn}
        setTargetColumn={setTargetColumn}
        model = {model}
        selectModel = {selectModel}
      />

      <PredictModel
        datasetInfo={datasetInfo}
        targetColumn={targetColumn}
        model = {model}
      />
    </div>
  );
}

export default App;