import React from "react";
const dummyData = [
  { type: "LineString", length: 120.5 },
  { type: "MultiLineString", length: 200.3 },
  { type: "Polygon", length: 0 }, // Polygons generally don’t have lengths, but included as a placeholder
  { type: "Path", length: 95.8 },
];
const DetailedTable = () => {
  return (
    <div className="mt-4">
      <h3>Detailed Information</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Element Type</th>
            <th>Length</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((item, index) => (
            <tr key={index}>
              <td>{item.type}</td>
              <td>{item.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailedTable;
