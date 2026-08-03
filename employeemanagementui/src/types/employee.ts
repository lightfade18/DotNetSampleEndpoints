export interface Employee {
  id: string;
  employeeNumber: string;
  fullName: string;
  designation: string;
  dateHired: string;
  isActive: boolean;
}

export interface CreateEmployeeRequest {
  employeeNumber: string;
  fullName: string;
  designation: string;
  dateHired: string;
}

export interface UpdateEmployeeRequest {
  id: string;
  employeeNumber: string;
  fullName: string;
  designation: string;
  dateHired: string;
}