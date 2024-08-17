export interface Prescription {
  id?: string;
  patientId: string;
  diseasesId: string;
  medicineId: string;
  medicineName: string;
  xday: string;
  xdose: string;
  period: string;
  xperiod: string;
  box: string;
  tablets: string;
  startDate: string;
  startHour: string;
  endDate: string;
  description: string;
  status: string;
}
