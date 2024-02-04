import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as cocoModel from "@tensorflow-models/coco-ssd";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [model, setModel] = useState();
  const [objectName, setObjectName] = useState("");
  const [objectScore, setObjectScore] = useState("");

  async function loadModel() {
    try {
      const dataset = await cocoModel.load();
      setModel(dataset);
      console.log("dataset ready....");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    tf.ready().then(() => {
      loadModel();
    });
  }, []);

  async function predict() {
    const detection = await model.detect(
      document.getElementById("VideoSource")
    );
    if (detection.length > 0) {
      detection.map((result) => {
        setObjectName(result.class);
        setObjectScore(result.score);
      });
    }
    console.log(detection);
  }

  const videoOption = {
    width: 720,
    height: 480,
    facingMode: "environment",
  };

  return (
    <>
      <div className="App">
        <h1>Deep Learning With Javascript</h1>
        <h3>{objectName ? objectName : ""}</h3>
        <h3>{objectScore ? objectScore : ""}</h3>
        <button className="tombol" onClick={() => predict()}>
          Tebak Object
        </button>
        <Webcam id="VideoSource" audio={false} videoConstraints={videoOption} />
      </div>
    </>
  );
}

export default App;
