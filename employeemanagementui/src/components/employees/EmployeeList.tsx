"use client";

import { useEffect, useMemo, useState } from "react";
import { getActiveEmployees, deactivateEmployee } from "@/services/employeeApi";
import { Employee } from "@/types/employee";
import EmployeeFilters from "./EmployeeFilters";
import EmployeeTable from "./EmployeeTable";

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [designation, setDesignation] = useState("");
  const [loading, setLoading] = useState(true);
  const [deactivatingId, setDeactivatingId] =
    useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEmployees() {
      try {
        const data = await getActiveEmployees();
        setEmployees(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load employees.");
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

  async function handleDeactivate(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to deactivate this employee?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeactivatingId(id);

      await deactivateEmployee(id);

      setEmployees((currentEmployees) =>
        currentEmployees.filter(
          (employee) => employee.id !== id
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to deactivate employee."
      );
    } finally {
      setDeactivatingId(null);
    }
  }

  if (loading) {
    return (
      <main className="p-8">
        <p>Loading employees...</p>
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
          Employees
        </h1>
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
        showDeactivate
        deactivatingId={deactivatingId}
        onDeactivate={handleDeactivate}
      />
    </main>
  );
}