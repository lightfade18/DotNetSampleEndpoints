using EmployeeManagement.Application.Employees.DTOs;
using MediatR;

namespace EmployeeManagement.Application.Employees.Queries.GetInActiveEmployees;

public record GetInActiveEmployeesQuery : IRequest<List<EmployeeDto>>;