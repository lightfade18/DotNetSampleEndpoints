"use client";

import Link from "next/link";
import { Employee } from "@/types/employee";

interface EmployeeTableProps {
  employees: Employee[];
  showDeactivate?: boolean;
  deactivatingId?: string | null;
  onDeactivate?: (id: string) => void;
}

export default function EmployeeTable({
  employees,
  showDeactivate = false,
  deactivatingId = null,
  onDeactivate,
}: EmployeeTableProps) {
  if (employees.length === 0) {
    return <p>No employees found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-3 text-left">
              Employee Number
            </th>

            <th className="border p-3 text-left">
              Full Name
            </th>

            <th className="border p-3 text-left">
              Designation
            </th>

            <th className="border p-3 text-left">
              Date Hired
            </th>

            <th className="border p-3 text-left">
              Status
            </th>

            <th className="border p-3 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="border p-3">
                {employee.employeeNumber}
              </td>

              <td className="border p-3">
                {employee.fullName}
              </td>

              <td className="border p-3">
                {employee.designation}
              </td>

              <td className="border p-3">
                {new Date(
                  employee.dateHired
                ).toLocaleDateString()}
              </td>

              <td className="border p-3">
                {employee.isActive ? "Active" : "Inactive"}
              </td>

              <td className="border p-3">
                <div className="flex gap-3">
                  <Link
                    href={`/employees/${employee.id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>

                  {showDeactivate && (
                    <button
                      type="button"
                      onClick={() =>
                        onDeactivate?.(employee.id)
                      }
                      disabled={
                        deactivatingId === employee.id
                      }
                      className="text-red-600 hover:underline disabled:opacity-50"
                    >
                      {deactivatingId === employee.id
                        ? "Deactivating..."
                        : "Deactivate"}
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}