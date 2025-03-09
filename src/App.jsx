import React, { useState } from "react";
import { parseKML } from "./utils/KmlParser";
import SummaryTable from "./components/SummaryTable";
import DetailedTable from "./components/DetailedTable";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const App = () => {
  const [kmlData, setKmlData] = useState(null); // store kml data
  const [summaryData, setSummaryData] = useState(null);
  const [detailedData, setDetailedData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        try {
          let parsedData;
          if (file.name.endsWith(".kml")) {
            parsedData = parseKML(fileContent);
          } else if (file.name.endsWith(".geojson")) {
            parsedData = JSON.parse(fileContent);
          } else {
            alert(
              "Unsupported file type. Please upload a .kml or .geojson file."
            );
            return;
          }
          setKmlData(parsedData);
        } catch (error) {
          console.error("Error parsing file:", error);
          alert("Invalid file. Please upload a valid .kml or .geojson file.");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSummaryClick = () => {
    if (kmlData) {
      const elementCounts = {};
      kmlData.features.forEach((feature) => {
        const type = feature.geometry.type;
        elementCounts[type] = (elementCounts[type] || 0) + 1;
      });
      setSummaryData(elementCounts);
    }
  };

  const handleDetailedClick = () => {
    if (kmlData) {
      const detailedData = kmlData.features
        .filter((feature) =>
          ["LineString", "MultiLineString"].includes(feature.geometry.type)
        )
        .map((feature) => ({
          type: feature.geometry.type,
          length: calculateLength(feature.geometry.coordinates),
        }));
      setDetailedData(detailedData);
    }
  };

  const calculateLength = (coordinates) => {
    return coordinates.length; // Placeholder calculation
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10 px-4">
      <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        KML/GeoJSON File Visualizer
      </h1>
      <div className="glassmorphism max-w-lg p-6 rounded-lg shadow-md mb-6">
        <input
          type="file"
          accept=".kml,.geojson"
          onChange={handleFileUpload}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex justify-between mt-4">
          <button
            onClick={handleSummaryClick}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 shadow"
          >
            Summary
          </button>
          <button
            onClick={handleDetailedClick}
            className="px-4 py-2 bg-purple-500 text-white font-semibold rounded hover:bg-purple-600 shadow"
          >
            Detailed
          </button>
        </div>
      </div>

      {summaryData && (
        <div className="glassmorphism max-w-4xl w-full p-6 rounded-lg shadow-lg mt-4">
          <SummaryTable data={summaryData} />
        </div>
      )}
      {detailedData && (
        <div className="glassmorphism max-w-4xl w-full p-6 rounded-lg shadow-lg mt-4">
          <DetailedTable data={detailedData} />
        </div>
      )}
      {kmlData && (
        <div className="glassmorphism max-w-5xl w-full rounded-lg overflow-hidden shadow-lg mt-8">
          <h3 className="text-center text-xl font-bold text-gray-700 p-4 bg-white">
            Map Visualization
          </h3>
          <div style={{ height: "500px" }}>
            <MapContainer
              center={[0, 0]}
              zoom={2}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <GeoJSON data={kmlData} />
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
