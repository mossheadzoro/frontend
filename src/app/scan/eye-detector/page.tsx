

"use client";

import { useState, useRef } from "react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import axios from "axios";

export default function EyeDiseaseScan() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isScanning, setIsScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);

  // Start webcam
  const startScan = async () => {
    setIsScanning(true);
    setResult(null);
    setUploadedImage(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
      setIsScanning(false);
    }
  };

  // Stop webcam
  const stopScan = () => {
    setIsScanning(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // Send frame to backend


const analyzeFrame = async () => {
  if (!videoRef.current || !canvasRef.current) return;

  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = videoRef.current.videoWidth;
  canvas.height = videoRef.current.videoHeight;
  ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

  canvas.toBlob(async (blob) => {
    if (!blob) return;

    const formData = new FormData();
    formData.append("file", blob, "frame.jpg");
    formData.append("skin_yellow", "false");
    formData.append("dark_urine", "false");
    formData.append("symptoms_list", "[]");

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/eye/predict-eye",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Res",res)
      setResult(res.data);
    } catch (err) {
      console.error("Error analyzing frame:", err);
    } finally {
      setLoading(false);
    }
  }, "image/jpeg");
};


  // Upload image instead of camera
 const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  stopScan();
  const previewUrl = URL.createObjectURL(file);
  setUploadedImage(previewUrl);
  setResult(null);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("skin_yellow", "false");
  formData.append("dark_urine", "false");
  formData.append("symptoms_list", "[]");

  setLoading(true);
  try {
    const res = await axios.post(
      "http://localhost:8000/eye/predict-eye",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(res)
    setResult(res.data);
  } catch (err) {
    console.error("Error analyzing upload:", err);
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center ">
        <section className="max-w-5xl w-full px-6 py-12  text-center">
          <h2 className="text-3xl font-bold mb-2">Eye Disease Detector</h2>
          <p className="text-gray-400 mb-6">
             Upload a clear image of your eye to screen for conditions.
          </p>

          <div className="grid md:grid-cols-1 gap-6 items-center justify-center text-center">
            {/* Webcam
            <div className="bg-gray-900 p-4 rounded-xl shadow-lg flex flex-col items-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="rounded-lg w-full max-h-80 bg-black"
                style={{ display: isScanning ? "block" : "none" }}
              />
              <canvas ref={canvasRef} className="hidden" />
              <div className="flex gap-3 mt-4">
                {!isScanning ? (
                  <button
                    onClick={startScan}
                    className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg"
                  >
                    Start Scan
                  </button>
                ) : (
                  <button
                    onClick={stopScan}
                    className="px-5 py-2 bg-red-600 hover:bg-red-500 rounded-lg"
                  >
                    Stop Scan
                  </button>
                )}
                <button
                  onClick={analyzeFrame}
                  disabled={!isScanning || loading}
                  className="px-5 py-2 bg-green-600 hover:bg-green-500 rounded-lg disabled:opacity-50"
                >
                  {loading ? "Analyzing..." : "Analyze Eye"}
                </button>
              </div>
            </div> */}

            {/* Upload */}
            <div className="bg-gray-900  p-4 rounded-xl shadow-lg flex flex-col ">
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Uploaded preview"
                  className="rounded-lg w-full max-h-80 object-contain mb-4"
                />
              ) : (
                <p className="mb-3 text-gray-400">Or upload an eye image</p>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="block w-full text-sm text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-cyan-600 file:text-white
                  hover:file:bg-cyan-500"
              />
            </div>
          </div>

          {/* Results */}
          <div className="mt-10 w-full">
            <h3 className="text-lg font-semibold mb-4">Results</h3>
            {result ? (
              <div className="bg-gray-800 p-6 rounded-2xl shadow space-y-4 text-gray-100">
                <p className="text-xl font-bold">
  Chances of {result.cnn_label.toUpperCase()} ({result.cnn_confidence}%)
</p>
                <p>{result.message}</p>
                {result.urgent_recommendation && (
                  <p className="text-red-400 font-semibold">
                    ⚠️ Urgent medical evaluation recommended
                  </p>
                )}
                <div>
                  <h4 className="font-semibold">Advice:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-300">
                    {result.advice?.map((a: string, i: number) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-gray-400">{result.disclaimer}</p>
              </div>
            ) : (
              <p className="text-gray-400">No results yet. Try scanning or upload an image.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
