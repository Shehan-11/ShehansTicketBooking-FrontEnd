import React from 'react'
import { Link } from 'react-router-dom'

export default function navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-black bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand">Shehan's Ticket Booking System</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="ms-auto ">
              <Link className="btn btn-primary me-2" to="/">Configuration</Link>
              <Link className="btn btn-primary" to="/tickets">Ticket Details</Link>
            </div>
        </div>
        </nav>
    </div>
  )
}
