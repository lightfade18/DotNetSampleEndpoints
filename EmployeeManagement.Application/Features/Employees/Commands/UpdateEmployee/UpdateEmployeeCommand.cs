using MediatR;

namespace EmployeeManagement.Application.Employees.Commands.UpdateEmployee;

public record UpdateEmployeeCommand(
    Guid Id,
    string EmployeeNumber,
    string FullName,
    string Designation,
    DateTime DateHired
) : IRequest<bool>;