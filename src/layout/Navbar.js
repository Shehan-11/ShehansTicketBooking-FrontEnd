import React from 'react'

export default function navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-black bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Shehan's Ticket Booking System</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <button className="btn btn-primary">Ticket Details</button>
        </div>
        </nav>
    </div>
  )
}
