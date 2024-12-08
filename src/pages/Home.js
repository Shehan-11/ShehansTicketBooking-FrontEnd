import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Home() {

    const [configuration, setConfiguration] = useState(null);

    useEffect(() => {
        loadConfiguration();
    }, []);

    const loadConfiguration = async () => {
        const result = await axios.get("http://localhost:8080/api/configuration/getLastConfig");
        setConfiguration(result.data);
        console.log(result.data);
    }

    return (
        <div className='container' style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className='py-4'>
                <h1 className='mb-5'>Configuration Page</h1>

                <h3 className='mb-2'>Current Configuration</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Max Ticket Capacity</th>
                            <th scope="col">Total Ticket Capacity</th>
                            <th scope="col">Vendor Ticket Release Rate</th>
                            <th scope="col">Customer Retrieval Rate</th>
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

                <h3 className='mt-5 mb-2'>Save a New Configuration</h3>

                <div className="form-floating mb-3" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <input type="number" className="form-control" id="maxTicketCapacity" placeholder='500' required/>
                    <label htmlFor="maxTicketCapacity">Max Ticket Capacity</label>
                </div>

                <div className="form-floating mb-3" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <input type="number" className="form-control" id="totalTickets" placeholder='500' required/>
                    <label htmlFor="totalTickets">Total Ticket Capacity</label>
                </div>
                <div className="form-floating mb-3" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <input type="number" className="form-control" id="ticketReleaseRate" placeholder='500' required/>
                    <label htmlFor="ticketReleaseRate">Vendor Ticket Release Rate</label>
                </div>
                <div className="form-floating mb-3" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <input type="number" className="form-control" id="customerRetrievalRate" placeholder='500' required/>
                    <label htmlFor="customerRetrievalRate">Customer Retrieval Rate</label>
                </div>
                <div className="col-12">
                    <button className="btn btn-primary" type="submit">Save Configurations</button>
                </div>
            </div>
        </div>
    );
}
