import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TrainRouteMap = () => {
  const { trainNo } = useParams(); // Get trainNo from URL params
  const [routeData, setRouteData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:6080/getRoute?trainNo=${trainNo}`);
        const responseData = response.data;
        const data = responseData.data; // Extract route data from the response

        // Add an 'order' property to each station
        const stationsWithOrder = data.map((station, index) => ({
          ...station,
          order: index + 1, // Assign order based on the index
        }));

        // Sort the stations based on the 'order' property
        const sortedStations = stationsWithOrder.sort((a, b) => a.order - b.order);

        setRouteData(sortedStations);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching train route data:", error);
        setLoading(false);
      }
    };

    fetchRouteData();
  }, [trainNo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (routeData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-md shadow-md">
          <p className="text-red-500">No data found for this train number</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex flex-wrap">
        {routeData.map((station) => (
          <div key={station.station_code} className="w-1/2 p-2">
            <div className="bg-emerald-600 border-gray-300 p-4 rounded-lg shadow-lg">
                
              <p className="font-semibold">{station.source_stn_name}</p>
              <p className="text-gray-500">Zone: {station.zone}</p>
              <p>Arrive: {station.arrive}</p>
              <p>Depart: {station.depart}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainRouteMap;
