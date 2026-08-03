using EmployeeManagement.Application.Common.Exceptions;
using EmployeeManagement.Application.Common.Interfaces;
using EmployeeManagement.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Application.Employees.Commands.CreateEmployee;

public class CreateEmployeeCommandHandler
    : IRequestHandler<CreateEmployeeCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public CreateEmployeeCommandHandler(
        IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(
        CreateEmployeeCommand request,
        CancellationToken cancellationToken)
    {
        var employeeNumberExists =
            await _context.Employees
                .AnyAsync(
                    employee => employee.EmployeeNumber == request.EmployeeNumber,
                    cancellationToken);

        if (employeeNumberExists)
        {
            throw new ConflictException(
                "Employee number already exists.");
        }

        var employee = new Employee
        {
            Id = Guid.NewGuid(),
            EmployeeNumber = request.EmployeeNumber,
            FullName = request.FullName,
            Designation = request.Designation,
            DateHired = request.DateHired,
            IsActive = true
        };

        _context.Employees.Add(employee);

        await _context.SaveChangesAsync(cancellationToken);

        return employee.Id;
    }
}