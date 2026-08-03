using EmployeeManagement.Application.Employees.DTOs;
using MediatR;

namespace EmployeeManagement.Application.Employees.Queries.GetActiveEmployees;

public record GetActiveEmployeesQuery : IRequest<List<EmployeeDto>>;