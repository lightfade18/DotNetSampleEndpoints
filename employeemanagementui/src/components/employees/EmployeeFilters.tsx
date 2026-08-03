"use client";

interface EmployeeFiltersProps {
  searchTerm: string;
  designation: string;
  designations: string[];
  onSearchChange: (value: string) => void;
  onDesignationChange: (value: string) => void;
}

export default function EmployeeFilters({
  searchTerm,
  designation,
  designations,
  onSearchChange,
  onDesignationChange,
}: EmployeeFiltersProps) {
  return (
    <div className="mb-6 flex gap-4">
      <input
        type="text"
        placeholder="Search by full name..."
        value={searchTerm}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
        className="rounded-md border px-4 py-2"
      />

      <select
        value={designation}
        onChange={(event) =>
          onDesignationChange(event.target.value)
        }
        className="rounded-md border px-4 py-2"
      >
        <option value="">
          All Designations
        </option>

        {designations.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}