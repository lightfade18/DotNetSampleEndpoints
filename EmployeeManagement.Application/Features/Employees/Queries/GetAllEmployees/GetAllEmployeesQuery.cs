using EmployeeManagement.Application.Employees.DTOs;
using MediatR;

namespace EmployeeManagement.Application.Employees.Queries.GetAllEmployees;

public record GetAllEmployeesQuery : IRequest<List<EmployeeDto>>;