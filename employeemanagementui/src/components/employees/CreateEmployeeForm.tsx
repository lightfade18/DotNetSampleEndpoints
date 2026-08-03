"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createEmployee } from "@/services/employeeApi";

export default function CreateEmployeeForm() {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [designation, setDesignation] = useState("");
  const [dateHired, setDateHired] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(
  event: FormEvent<HTMLFormElement>
) {
  event.preventDefault();

  setError(null);
  setLoading(true);

  try {
    await createEmployee({
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
        : "Failed to create employee."
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Create Employee
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Employee Number */}
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
            placeholder="EOBP-0001"
            value={employeeNumber}
            onChange={(event) =>
              setEmployeeNumber(event.target.value)
            }
            className="w-full rounded-md border px-4 py-2"
            required
          />
        </div>

        {/* Full Name */}
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
            placeholder="Juan Dela Cruz"
            value={fullName}
            onChange={(event) =>
              setFullName(event.target.value)
            }
            className="w-full rounded-md border px-4 py-2"
            required
          />
        </div>

        {/* Designation */}
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
            placeholder="Software Developer"
            value={designation}
            onChange={(event) =>
              setDesignation(event.target.value)
            }
            className="w-full rounded-md border px-4 py-2"
            required
          />
        </div>

        {/* Date Hired */}
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
          disabled={loading}
          className="rounded-md bg-black px-6 py-3 text-white disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Employee"}
        </button>
      </form>
    </main>
  );
}