using MediatR;

namespace EmployeeManagement.Application.Employees.Commands.CreateEmployee;

public record CreateEmployeeCommand(
    string EmployeeNumber,
    string FullName,
    string Designation,
    DateTime DateHired
) : IRequest<Guid>;