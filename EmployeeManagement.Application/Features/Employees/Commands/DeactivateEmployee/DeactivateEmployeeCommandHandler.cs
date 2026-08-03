using EmployeeManagement.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Application.Employees.Commands.DeactivateEmployee;

public class DeactivateEmployeeCommandHandler
    : IRequestHandler<DeactivateEmployeeCommand, bool>
{
    private readonly IApplicationDbContext _context;

    public DeactivateEmployeeCommandHandler(
        IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(
        DeactivateEmployeeCommand request,
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

        employee.IsActive = false;

        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}