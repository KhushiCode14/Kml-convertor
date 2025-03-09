import toGeoJSON from "@mapbox/togeojson"; //using mapbox 
import { DOMParser } from "xmldom";

/**
 * Parses a KML file and converts it to GeoJSON.
 * @param {string} kmlContent - The content of the KML file as a string.
 * @returns {Object} - A GeoJSON object representing the KML data.
 */
export const parseKML = (kmlContent) => {
  try {
    // Parse the KML content into an XML document
    const kmlDoc = new DOMParser().parseFromString(kmlContent, "text/xml");
    // Convert KML to GeoJSON
    const geojson = toGeoJSON.kml(kmlDoc);
    return geojson;
  } catch (error) {
    console.error("Error parsing KML file:", error);
    return null;
  }
};
