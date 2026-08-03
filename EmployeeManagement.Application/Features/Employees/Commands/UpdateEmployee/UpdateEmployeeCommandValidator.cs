using FluentValidation;

namespace EmployeeManagement.Application.Employees.Commands.UpdateEmployee;

public class UpdateEmployeeCommandValidator
    : AbstractValidator<UpdateEmployeeCommand>
{
    public UpdateEmployeeCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage("Employee ID is required.");

        RuleFor(x => x.EmployeeNumber)
            .NotEmpty()
            .WithMessage("Employee number is required.")
            .Matches(@"^EOBP-\d{4}$")
            .WithMessage("Employee number must follow the format EOBP-####.");

        RuleFor(x => x.FullName)
            .NotEmpty()
            .WithMessage("Full name is required.")
            .MaximumLength(200)
            .WithMessage("Full name cannot exceed 200 characters.");

        RuleFor(x => x.Designation)
            .NotEmpty()
            .WithMessage("Designation is required.")
            .MaximumLength(100)
            .WithMessage("Designation cannot exceed 100 characters.");

        RuleFor(x => x.DateHired)
            .NotEmpty()
            .WithMessage("Date hired is required.")
            .Must(date => date <= DateTime.Now)
            .WithMessage("Date hired cannot be in the future.");
    }
}