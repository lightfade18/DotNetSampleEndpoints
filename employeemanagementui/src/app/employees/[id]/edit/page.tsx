import EditEmployeeForm from "@/components/employees/EditEmployeeForm";

export default async function EditEmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditEmployeeForm employeeId={id} />;
}