using EmployeeManagement.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Application.Employees.Commands.UpdateEmployee;

public class UpdateEmployeeCommandHandler
    : IRequestHandler<UpdateEmployeeCommand, bool>
{
    private readonly IApplicationDbContext _context;

    public UpdateEmployeeCommandHandler(
        IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(
        UpdateEmployeeCommand request,
        CancellationToken cancellationToken)
    {
        var employee = await _context.Employees
            .FirstOrDefaultAsync(
                employee => employee.Id == request.Id,
                cancellationToken);

        if (employee is null)
        {
            return false;
        }

        var employeeNumberExists = await _context.Employees
            .AnyAsync(
                employee =>
                    employee.EmployeeNumber == request.EmployeeNumber &&
                    employee.Id != request.Id,
                cancellationToken);

        if (employeeNumberExists)
        {
            throw new InvalidOperationException(
                "Employee number already exists.");
        }

        employee.EmployeeNumber = request.EmployeeNumber;
        employee.FullName = request.FullName;
        employee.Designation = request.Designation;
        employee.DateHired = request.DateHired;

        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}