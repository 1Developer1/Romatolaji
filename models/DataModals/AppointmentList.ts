export interface AppointmentList {
  id: string;
  patientId: string;
  patientName: string;
  policlinicId: string;
  policlinicName?: string;
  appointmentDate: string;
  appointmentHour: string;
  appointmentMinute: string;
  status: string;
  userResponse: string;
  doctorResponse: string;
}
