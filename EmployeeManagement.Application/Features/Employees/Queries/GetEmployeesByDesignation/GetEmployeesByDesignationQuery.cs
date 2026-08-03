using EmployeeManagement.Application.Employees.DTOs;
using MediatR;

namespace EmployeeManagement.Application.Employees.Queries.GetEmployeesByDesignation;

public record GetEmployeesByDesignationQuery(
    string Designation) : IRequest<List<EmployeeDto>>;