"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getEmployeeById,
  updateEmployee,
} from "@/services/employeeApi";
import { Employee } from "@/types/employee";

interface EditEmployeeFormProps {
  employeeId: string;
}

export default function EditEmployeeForm({
  employeeId,
}: EditEmployeeFormProps) {
  const router = useRouter();

  const [employee, setEmployee] = useState<Employee | null>(
    null
  );

  const [employeeNumber, setEmployeeNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [designation, setDesignation] = useState("");
  const [dateHired, setDateHired] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEmployee() {
      try {
        const data = await getEmployeeById(employeeId);

        setEmployee(data);
        setEmployeeNumber(data.employeeNumber);
        setFullName(data.fullName);
        setDesignation(data.designation);

        setDateHired(
          data.dateHired.substring(0, 10)
        );
      } catch (error) {
        console.error(error);
        setError("Unable to load employee.");
      } finally {
        setLoading(false);
      }
    }

    loadEmployee();
  }, [employeeId]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError(null);
    setSaving(true);

    try {
      await updateEmployee(employeeId, {
        id: employeeId,
        employeeNumber,
        fullName,
        designation,
        dateHired,
      });

      router.push("/employees");
      router.refresh();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update employee."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-2xl p-8">
        <p>Loading employee...</p>
      </main>
    );
  }

  if (!employee) {
    return (
      <main className="mx-auto max-w-2xl p-8">
        <p className="text-red-500">
          Employee not found.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Employee
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div>
          <label
            htmlFor="employeeNumber"
            className="mb-2 block font-medium"
          >
            Employee Number
          </label>

          <input
            id="employeeNumber"
            type="text"
            value={employeeNumber}
            onChange={(event) =>
              setEmployeeNumber(event.target.value)
            }
            className="w-full rounded-md border px-4 py-2"
            required
          />
        </div>

        <div>
          <label
            htmlFor="fullName"
            className="mb-2 block font-medium"
          >
            Full Name
          </label>

          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(event) =>
              setFullName(event.target.value)
            }
            className="w-full rounded-md border px-4 py-2"
            required
          />
        </div>

        <div>
          <label
            htmlFor="designation"
            className="mb-2 block font-medium"
          >
            Designation
          </label>

          <input
            id="designation"
            type="text"
            value={designation}
            onChange={(event) =>
              setDesignation(event.target.value)
            }
            className="w-full rounded-md border px-4 py-2"
            required
          />
        </div>

        <div>
          <label
            htmlFor="dateHired"
            className="mb-2 block font-medium"
          >
            Date Hired
          </label>

          <input
            id="dateHired"
            type="date"
            value={dateHired}
            onChange={(event) =>
              setDateHired(event.target.value)
            }
            className="w-full rounded-md border px-4 py-2"
            required
          />
        </div>

        {error && (
          <div className="rounded-md bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-black px-6 py-3 text-white disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </main>
  );
}