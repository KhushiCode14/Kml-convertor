import React from "react";
const DummyData = {
  Point: 10,
  LineString: 5,
  Polygon: 3,
  MultiPoint: 7,
  MultiLineString: 2,
  MultiPolygon: 4,
};
const SummaryTable = () => {
  return (
    <div className="mt-4">
      <h3>Summary</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Element Type</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(DummyData).map(([type, count]) => (
            <tr key={type}>
              <td>{type}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryTable;
