import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Tickets() {
  const [tickets, setTickets] = useState(null);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false); // State to track simulation status

  useEffect(() => {
    let interval;

    // Start monitoring if the simulation is running
    if (isSimulationRunning) {
      interval = setInterval(() => {
        monitorSimulation();
      }, 1); //To monitor the system asap
    }

    // Cleanup interval when the component unmounts or simulation stops
    return () => clearInterval(interval);
	
  }, [isSimulationRunning]); // Dependency ensures this effect runs when simulation status changes

  const startSimulation = async () => {
    try {
      await axios.post("http://localhost:8080/api/tickets/start");
      setIsSimulationRunning(true); // Start monitoring
      alert("System Started successfully");
    } catch (error) {
      console.error("Error starting simulation:", error);
    }
  };

  const stopSimulation = async () => {
    try {
      await axios.post("http://localhost:8080/api/tickets/stop");
      setIsSimulationRunning(false); // Stop monitoring
      alert("System Stopped successfully");
    } catch (error) {
      console.error("Error stopping simulation:", error);
    }
  };

  const monitorSimulation = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/tickets/monitor");
      setTickets(result.data);
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    }
  };

  return (
    <div className="col-md-8 offset-md-2 border rounded p-4 mt-5 shadow">
      <div className="py-4">
        <h1 className="mb-5">Ticket Details</h1>
        <button className="btn btn-success me-2" onClick={startSimulation}>Start Simulation</button>
        <button className="btn btn-danger me-2" onClick={stopSimulation}>Stop Simulation</button>

		{/* Simulation Status Header */}
        <h4 className="mb-5 mt-5">
          {isSimulationRunning ? "Simulation Status: Running" : "Simulation Status: Stopped"}
        </h4>

        <div className="col-md-8 offset-md-2 border rounded p-4 mt-5 shadow">
          <h3 className="mb-4 mt-4">Ticket Status</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Total Tickets to Sell</th>
                <th scope="col">Total Sold Tickets</th>
                <th scope="col">Remaining Tickets To Release</th>
                <th scope="col">Tickets Available For Purchase</th>
              </tr>
            </thead>
            <tbody>
              {tickets && (
                <tr>
                  <td>{tickets.MaxTicketCapacity}</td>
                  <td>{tickets.TotalSoldTickets}</td>
                  <td>{tickets.RemainingTickets}</td>
                  <td>{tickets.CurrentTicket}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
