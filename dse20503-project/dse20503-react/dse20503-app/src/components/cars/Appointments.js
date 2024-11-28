import React, { useState } from 'react';
import AppointmentService from '../../services/AppointmentService';
import '../../assets/styles/styles.css';

const Appointments = ({ carId, userId }) => {
    const [appointmentDate, setAppointmentDate] = useState('');
    const [notes, setNotes] = useState('');
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleBookAppointment = async (e) => {
        e.preventDefault();
        const appointment = {
            car: { id: carId },
            user: { id: userId },
            appointmentDate: new Date(appointmentDate).toISOString(),
            notes
        };

        try {
            await AppointmentService.createAppointment(appointment);
            setMessage('Appointment booked successfully');
        } catch (error) {
            setMessage('Error booking appointment: ' + error.message);
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="appointments-container">
            <button className="btn" onClick={toggleForm}>
                {showForm ? 'Hide Appointment Form' : 'Book Appointment'}
            </button>
            {showForm && (
                <div className="book-appointment-container">
                    <h2>Book Appointment</h2>
                    <form onSubmit={handleBookAppointment}>
                        <div className="form-group">
                            <label>Appointment Date:</label>
                            <input
                                type="datetime-local"
                                value={appointmentDate}
                                onChange={(e) => setAppointmentDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Notes:</label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            ></textarea>
                        </div>
                        <button className="btn" type="submit">Book Appointment</button>
                    </form>
                    {message && <p className="message">{message}</p>}
                </div>
            )}
        </div>
    );
};

export default Appointments;