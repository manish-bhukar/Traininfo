import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PnrStatus() {
  const [pnrData, setPnrData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Get the pnr from URL params
  const { pnr } = useParams();

  useEffect(() => {
    async function fetchPnrData() {
      try {
        const response = await axios.get(`/PNRinfo/?pnr=${pnr}`);
        setPnrData(response.data);
        console.log(response)
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchPnrData();
  }, [pnr]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pnrData) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">PNR Status</h2>
      <p><strong>Booking Date:</strong> {pnrData.BookingDate}</p>
      <p><strong>Destination:</strong> {pnrData.DestinationName}</p>
      <p><strong>Arrival Time:</strong> {pnrData.ArrivalTime}</p>
      <p><strong>Class:</strong> {pnrData.Class}</p>
      {/* <p><strong>Coach:</strong> {pnrData.PassengerStatus[0].Coach}</p>
      <p><strong>Berth:</strong> {pnrData.PassengerStatus[0].Berth}</p> */}
    </div>
  );
}

export default PnrStatus;
