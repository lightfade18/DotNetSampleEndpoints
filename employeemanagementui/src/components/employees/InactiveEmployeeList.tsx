"use client";

import { useEffect, useMemo, useState } from "react";
import { getInactiveEmployees } from "@/services/employeeApi";
import { Employee } from "@/types/employee";
import EmployeeFilters from "./EmployeeFilters";
import EmployeeTable from "./EmployeeTable";

export default function InactiveEmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [designation, setDesignation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEmployees() {
      try {
        const data = await getInactiveEmployees();
        setEmployees(data);
      } catch (error) {
        console.error(error);
        setError(
          "Unable to load inactive employees."
        );
      } finally {
        setLoading(false);
      }
    }

    loadEmployees();
  }, []);

  const designations = useMemo(() => {
    return Array.from(
      new Set(
        employees.map((employee) => employee.designation)
      )
    ).sort();
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesName = employee.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesDesignation =
        designation === "" ||
        employee.designation === designation;

      return matchesName && matchesDesignation;
    });
  }, [employees, searchTerm, designation]);

  if (loading) {
    return (
      <main className="p-8">
        <p>Loading inactive employees...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-8">
        <p className="text-red-500">{error}</p>
      </main>
    );
  }

  return (
    <main className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Inactive Employees
        </h1>

        <p className="mt-2 text-gray-500">
          Employees who are currently inactive.
        </p>
      </div>

      <EmployeeFilters
        searchTerm={searchTerm}
        designation={designation}
        designations={designations}
        onSearchChange={setSearchTerm}
        onDesignationChange={setDesignation}
      />

      <EmployeeTable
        employees={filteredEmployees}
      />
    </main>
  );
}