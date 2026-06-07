export interface Job {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  jobType: string;
  jobSource: string;
  jobDescription?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  area: string;
  startDate: string;
  startTime: string;
  endTime: string;
  techSelect: string;
  status: string;
  createdAt: string;
  cancellationReason?: string;
}