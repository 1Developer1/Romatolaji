export interface Appointment {
  id?: string;
  patientId: string;
  policlinicId: string;
  appointmentDate: string;
  appointmentHour: string;
  appointmentMinute: string;
  status: string;
  userResponse: string;
  doctorResponse: string;
}
