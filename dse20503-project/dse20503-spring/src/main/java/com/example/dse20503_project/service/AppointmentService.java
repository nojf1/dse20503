package com.example.dse20503_project.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dse20503_project.entity.Appointment;
import com.example.dse20503_project.repository.AppointmentRepository;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    // Get all appointments
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    // Get appointment by id
    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id).orElse(null);
    }

    // Create a new appointment
    public Appointment createAppointment(Appointment appointment) {
        appointment.setCreatedAt(LocalDateTime.now());
        appointment.setUpdatedAt(LocalDateTime.now());
        return appointmentRepository.save(appointment);
    }

    // Update an existing appointment
    public Appointment updateAppointment(Long id, Appointment appointmentDetails) {
        return appointmentRepository.findById(id)
                .map(existingAppointment -> {
                    // Update appointment date if valid
                    if (appointmentDetails.getAppointmentDate() != null &&
                            appointmentDetails.getAppointmentDate().isAfter(LocalDateTime.now())) {
                        existingAppointment.setAppointmentDate(appointmentDetails.getAppointmentDate());
                    } else if (appointmentDetails.getAppointmentDate() != null) {
                        throw new IllegalArgumentException("Appointment date cannot be in the past.");
                    }

                    // Update notes if provided
                    if (appointmentDetails.getNotes() != null) {
                        existingAppointment.setNotes(appointmentDetails.getNotes());
                    }

                    // Update only updatedAt field
                    existingAppointment.setUpdatedAt(LocalDateTime.now());
                    return appointmentRepository.save(existingAppointment);
                })
                .orElseThrow(() -> new RuntimeException("Appointment not found with id " + id));
    }

    // Delete an appointment
    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }
}