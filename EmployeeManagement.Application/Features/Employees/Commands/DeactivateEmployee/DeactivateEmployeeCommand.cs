using MediatR;

namespace EmployeeManagement.Application.Employees.Commands.DeactivateEmployee;

public record DeactivateEmployeeCommand(Guid Id) : IRequest<bool>;