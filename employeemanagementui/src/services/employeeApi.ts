import { API_BASE_URL } from "@/lib/api";
import {
  Employee,
  CreateEmployeeRequest,
  UpdateEmployeeRequest,
} from "@/types/employee";

export async function getEmployees(): Promise<Employee[]> {
  const response = await fetch(
    `${API_BASE_URL}/employees`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch employees.");
  }

  return response.json();
}

export async function getEmployeeById(
  id: string
): Promise<Employee> {
  const response = await fetch(
    `${API_BASE_URL}/employees/${id}`
  );

  if (!response.ok) {
    throw new Error("Employee not found.");
  }

  return response.json();
}

export async function getActiveEmployees(): Promise<Employee[]> {
  const response = await fetch(
    `${API_BASE_URL}/employees/active`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch active employees."
    );
  }

  return response.json();
}

export async function getInactiveEmployees(): Promise<Employee[]> {
  const response = await fetch(
    `${API_BASE_URL}/employees/inactive`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch inactive employees."
    );
  }

  return response.json();
}

export async function createEmployee(
  employee: CreateEmployeeRequest
): Promise<Employee> {
  const response = await fetch(
    `${API_BASE_URL}/employees`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create employee.");
  }

  return response.json();
}

export async function updateEmployee(
  id: string,
  employee: UpdateEmployeeRequest
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/employees/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    }
  );

  if (!response.ok) {
    const responseText = await response.text();

    throw new Error(
      `Update failed (${response.status}): ${responseText}`
    );
  }
}

export async function deactivateEmployee(
  id: string
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/employees/${id}/deactivate`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    const responseText = await response.text();

    throw new Error(
      `Deactivate failed (${response.status}): ${responseText}`
    );
  }
}