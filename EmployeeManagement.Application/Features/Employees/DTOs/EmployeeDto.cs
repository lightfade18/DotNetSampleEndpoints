namespace EmployeeManagement.Application.Employees.DTOs;

public class EmployeeDto
{
    public Guid Id { get; set; }

    public string EmployeeNumber { get; set; } = string.Empty;

    public string FullName { get; set; } = string.Empty;

    public string Designation { get; set; } = string.Empty;

    public DateTime DateHired { get; set; }

    public bool IsActive { get; set; }
}