using MediatR;

namespace EmployeeManagement.Application.Employees.Commands.DeleteEmployee;

public record DeleteEmployeeCommand(Guid Id) : IRequest<bool>;