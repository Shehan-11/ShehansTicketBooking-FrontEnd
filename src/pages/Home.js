import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Home() {

    // State to hold the current configuration
    const [configuration, setConfiguration] = useState(null);

    // State to hold the new configuration input values
    const [newConfiguration, setNewConfiguration] = useState({
        maxTicketCapacity: "",
        totalTickets: "",
        ticketReleaseRate: "",
        customerRetrievalRate: ""
    });

    // Load the configuration when the component mounts
    useEffect(() => {
        loadConfiguration();
    }, []);

    // Function to load the current configuration from the server
    const loadConfiguration = async () => {
        const result = await axios.get("http://localhost:8080/api/configuration/getLastConfig");
        setConfiguration(result.data);
    }

    // Destructure the new configuration state
    const {maxTicketCapacity, totalTickets, ticketReleaseRate, customerRetrievalRate} = newConfiguration;

    const [errors, setErrors] = useState({});

    // Handle input changes and update the new configuration state
    const onInputChange = (e) => {
        const { name, value } = e.target;
        setNewConfiguration({ ...newConfiguration, [name]: value });
    }

    // Handle form submission to save the new configuration
    const onSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};
        // Validate maxTicketCapacity
        if (!maxTicketCapacity || parseFloat(maxTicketCapacity) <= 0) {
            validationErrors.maxTicketCapacity = "Capacity should be greater than 0";
        }

        // Validate totalTickets
        if (!totalTickets || parseFloat(totalTickets) <= 0) {
            validationErrors.totalTickets = "Total tickets should be greater than 0";
        }
        if (parseFloat(totalTickets) > parseFloat(maxTicketCapacity)) {
            validationErrors.totalTickets = "Total tickets should be less than or equal to max ticket capacity";
        }

        // Validate ticketReleaseRate
        if (!ticketReleaseRate || parseFloat(ticketReleaseRate) <= 0) {
            validationErrors.ticketReleaseRate = "Release rate should be greater than 0";
        }
        if (parseFloat(ticketReleaseRate) > parseFloat(totalTickets)) {
            validationErrors.ticketReleaseRate = "Release rate should be less than or equal to total tickets";
        }

        // Validate customerRetrievalRate
        if (!customerRetrievalRate || parseFloat(customerRetrievalRate) <= 0) {
            validationErrors.customerRetrievalRate = "Retrieval rate should be greater than 0";
        }
        if (parseFloat(customerRetrievalRate) > parseFloat(totalTickets)) {
            validationErrors.customerRetrievalRate = "Retrieval rate should be less than or equal to total tickets";
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            await axios.post("http://localhost:8080/api/configuration/createConfig", newConfiguration);
            loadConfiguration(); // Reload the configuration after saving
            alert("Configuration saved successfully");
        } 
    }

    return (
        <div className='container'>
            <div className='py-4'>
                <h1 className='mb-5'>Configuration Page</h1>

                {/* Display the current configuration */}
                <div className="col-md-8 offset-md-2 border rounded p-4 mt-5 shadow">
                    <h3 className='mb-4'>Current Configuration</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Max Ticket Capacity</th>
                                <th scope="col">Total Ticket Capacity</th>
                                <th scope="col">Vendor Ticket Release Rate</th>
                                <th scope="col">Customer Ticket Retrieval Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {configuration && (
                                <tr>
                                    <td>{configuration.maxTicketCapacity}</td>
                                    <td>{configuration.totalTickets}</td>
                                    <td>{configuration.ticketReleaseRate}</td>
                                    <td>{configuration.customerRetrievalRate}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Form to save a new configuration */}
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-5 shadow">
                    <h3 className='mb-4'>Save a New Configuration</h3>

                    <form onSubmit={onSubmit}>
                        <div className="form-floating col-md-8 offset-md-2 mb-3">
                            <input 
                                type="number" 
                                className="form-control" 
                                name="maxTicketCapacity" 
                                onChange={onInputChange} 
                                value={maxTicketCapacity} 
                                placeholder="500" 
                                required
                            />
                            <label htmlFor="maxTicketCapacity">Max Ticket Capacity</label>
                            {errors.maxTicketCapacity && <p className="text-danger">{errors.maxTicketCapacity}</p>}
                        </div>

                        <div className="form-floating col-md-8 offset-md-2 mb-3">
                            <input 
                                type="number" 
                                className="form-control" 
                                name="totalTickets" 
                                onChange={onInputChange} 
                                value={totalTickets} 
                                placeholder="500" 
                                required 
                            />
                            <label htmlFor="totalTickets">Total Ticket Capacity</label>
                            {errors.totalTickets && <p className="text-danger">{errors.totalTickets}</p>}
                        </div>

                        <div className="form-floating col-md-8 offset-md-2 mb-3">
                            <input 
                                type="number" 
                                className="form-control" 
                                name="ticketReleaseRate" 
                                onChange={onInputChange} 
                                value={ticketReleaseRate} 
                                placeholder="500" 
                                required 
                            />
                            <label htmlFor="ticketReleaseRate">Ticket Release Rate</label>
                            {errors.ticketReleaseRate && <p className="text-danger">{errors.ticketReleaseRate}</p>}
                        </div>

                        <div className="form-floating col-md-8 offset-md-2 mb-3">
                            <input 
                                type="number" 
                                className="form-control" 
                                name="customerRetrievalRate" 
                                onChange={onInputChange} 
                                value={customerRetrievalRate} 
                                placeholder="500" 
                                required 
                            />
                            <label htmlFor="customerRetrievalRate">Ticket Retrieval Rate</label>
                            {errors.customerRetrievalRate && <p className="text-danger">{errors.customerRetrievalRate}</p>}
                        </div>

                        <div className="col-12">
                            <button className="btn btn-primary" type="submit">Save Configurations</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
