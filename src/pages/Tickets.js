import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Tickets() {
  // State to hold ticket details fetched from the backend
  const [tickets, setTickets] = useState(null);

  // State to track whether the simulation is running or stopped
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);

  // useEffect to monitor the simulation periodically when it's running
  useEffect(() => {
    let interval;

    // Check if the simulation is running
    if (isSimulationRunning) {
      // Set up an interval to call the monitor function frequently
      interval = setInterval(() => {
        monitorSimulation();
      }, 1000); // Poll every 1 second
    }

    // Cleanup function to clear the interval when the simulation stops or component unmounts
    return () => clearInterval(interval);
  }, [isSimulationRunning]); // Runs whenever `isSimulationRunning` changes

  // Function to start the simulation
  const startSimulation = async () => {
    try {
      // API call to start the simulation on the backend
      await axios.post("http://localhost:8080/api/tickets/start");
      setIsSimulationRunning(true); // Update the state to start monitoring
      alert("System Started successfully");
    } catch (error) {
      console.error("Error starting simulation:", error); // Log any errors
    }
  };

  // Function to stop the simulation
  const stopSimulation = async () => {
    try {
      // API call to stop the simulation on the backend
      await axios.post("http://localhost:8080/api/tickets/stop");
      setIsSimulationRunning(false); // Update the state to stop monitoring
      alert("System Stopped successfully");
    } catch (error) {
      console.error("Error stopping simulation:", error); // Log any errors
    }
  };

  // Function to fetch the latest ticket data from the backend
  const monitorSimulation = async () => {
    try {
      // API call to get the current ticket status
      const result = await axios.get("http://localhost:8080/api/tickets/monitor");
      setTickets(result.data); // Update the state with fetched data
    } catch (error) {
      console.error("Error fetching ticket data:", error); // Log any errors
    }
  };

  return (
      <div className="col-md-8 offset-md-2 border rounded p-4 mt-5 shadow">
        <div className="py-4">
          {/* Page title */}
          <h1 className="mb-5">Ticket Details</h1>

          {/* Buttons to start and stop the simulation */}
          <button className="btn btn-success me-2" onClick={startSimulation}>
            Start Simulation
          </button>
          <button className="btn btn-danger me-2" onClick={stopSimulation}>
            Stop Simulation
          </button>

          {/* Display the simulation status */}
          <h4 className="mb-5 mt-5">
            {isSimulationRunning ? "Simulation Status: Running" : "Simulation Status: Stopped"}
          </h4>

          {/* Section to display ticket status in a table */}
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
