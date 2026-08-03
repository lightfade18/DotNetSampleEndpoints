using EmployeeManagement.Application.Employees.Commands.CreateEmployee;
using EmployeeManagement.Application.Employees.Commands.DeactivateEmployee;
using EmployeeManagement.Application.Employees.Commands.DeleteEmployee;
using EmployeeManagement.Application.Employees.Commands.UpdateEmployee;
using EmployeeManagement.Application.Employees.DTOs;
using EmployeeManagement.Application.Employees.Queries.GetActiveEmployees;
using EmployeeManagement.Application.Employees.Queries.GetAllEmployees;
using EmployeeManagement.Application.Employees.Queries.GetEmployeeById;
using EmployeeManagement.Application.Employees.Queries.GetEmployeesByDesignation;
using EmployeeManagement.Application.Employees.Queries.GetInActiveEmployees;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagement.API.Controllers;

[ApiController]
[Route("api/employees")]
public class EmployeesController : ControllerBase
{
    private readonly IMediator _mediator;

    // Endpoint to all employees query
    public EmployeesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<EmployeeDto>>> GetAll()
    {
        var employees = await _mediator.Send(
            new GetAllEmployeesQuery());

        return Ok(employees);
    }

    // Endpoint to all employee by ID query
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<EmployeeDto>> GetById(Guid id)
    {
        var employee = await _mediator.Send(
            new GetEmployeeByIdQuery(id));

        if (employee is null)
        {
            return NotFound();
        }

        return Ok(employee);
    }

    // Endpoint to all active employee query
    [HttpGet("active")]
    public async Task<ActionResult<List<EmployeeDto>>> GetActive()
    {
        var employees = await _mediator.Send(
            new GetActiveEmployeesQuery());

        return Ok(employees);
    }

    // Endpoint to all inactive employee query
    [HttpGet("inactive")]
    public async Task<ActionResult<List<EmployeeDto>>> GetInactive()
    {
        var employees = await _mediator.Send(
            new GetInActiveEmployeesQuery());

        return Ok(employees);
    }

    // Endpoint to employee by designation query
    [HttpGet("designation/{designation}")]
    public async Task<ActionResult<List<EmployeeDto>>> GetByDesignation(
    string designation)
    {
        var employees = await _mediator.Send(
            new GetEmployeesByDesignationQuery(designation));

        return Ok(employees);
    }

    // Endpoint to create employee command
    [HttpPost]
    public async Task<ActionResult> Create(
    CreateEmployeeCommand command)
    {
        var employeeId = await _mediator.Send(command);

        return CreatedAtAction(
            nameof(GetById),
            new { id = employeeId },
            new { id = employeeId });
    }

    // Endpoint to update employee command
    [HttpPut("{id:guid}")]
    public async Task<ActionResult> Update(
    Guid id,
    UpdateEmployeeCommand command)
    {
        if (id != command.Id)
        {
            return BadRequest(
                "The employee ID in the URL does not match the request body.");
        }

        var updated = await _mediator.Send(command);

        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    // Endpoit to delete employee command
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        var deleted = await _mediator.Send(
            new DeleteEmployeeCommand(id));

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }

    // Endpoint to deactivate employee command
    [HttpPost("{id:guid}/deactivate")]
    public async Task<ActionResult> Deactivate(Guid id)
    {
        var deactivated = await _mediator.Send(
            new DeactivateEmployeeCommand(id));

        if (!deactivated)
        {
            return NotFound();
        }

        return NoContent();
    }
}