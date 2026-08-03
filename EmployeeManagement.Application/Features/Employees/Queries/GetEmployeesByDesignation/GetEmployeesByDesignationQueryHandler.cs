using EmployeeManagement.Application.Common.Interfaces;
using EmployeeManagement.Application.Employees.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Application.Employees.Queries.GetEmployeesByDesignation;

public class GetEmployeesByDesignationQueryHandler
    : IRequestHandler<
        GetEmployeesByDesignationQuery,
        List<EmployeeDto>>
{
    private readonly IApplicationDbContext _context;

    public GetEmployeesByDesignationQueryHandler(
        IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<EmployeeDto>> Handle(
        GetEmployeesByDesignationQuery request,
        CancellationToken cancellationToken)
    {
        return await _context.Employees
            .AsNoTracking()
            .Where(employee =>
                EF.Functions.Like(
                    employee.Designation,
                    request.Designation))
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