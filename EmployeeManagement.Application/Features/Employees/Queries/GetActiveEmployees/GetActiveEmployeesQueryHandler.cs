using EmployeeManagement.Application.Common.Interfaces;
using EmployeeManagement.Application.Employees.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Application.Employees.Queries.GetActiveEmployees;

public class GetActiveEmployeesQueryHandler
    : IRequestHandler<GetActiveEmployeesQuery, List<EmployeeDto>>
{
    private readonly IApplicationDbContext _context;

    public GetActiveEmployeesQueryHandler(
        IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<EmployeeDto>> Handle(
        GetActiveEmployeesQuery request,
        CancellationToken cancellationToken)
    {
        return await _context.Employees
            .AsNoTracking()
            .Where(employee => employee.IsActive)
            .Select(employee => new EmployeeDto
            {
                Id = employee.Id,
                EmployeeNumber = employee.EmployeeNumber,
                FullName = employee.FullName,
                Designation = employee.Designation,
                DateHired = employee.DateHired,
                IsActive = employee.IsActive
            })
            .ToListAsync(cancellationToken);
    }
}