using EmployeeManagement.Application.Common.Interfaces;
using EmployeeManagement.Application.Employees.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Application.Employees.Queries.GetInActiveEmployees;

public class GetInActiveEmployeesQueryHandler
    : IRequestHandler<GetInActiveEmployeesQuery, List<EmployeeDto>>
{
    private readonly IApplicationDbContext _context;

    public GetInActiveEmployeesQueryHandler(
        IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<EmployeeDto>> Handle(
        GetInActiveEmployeesQuery request,
        CancellationToken cancellationToken)
    {
        return await _context.Employees
            .AsNoTracking()
            .Where(employee => !employee.IsActive)
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