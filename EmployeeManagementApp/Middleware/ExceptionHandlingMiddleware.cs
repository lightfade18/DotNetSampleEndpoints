using FluentValidation;
using System.Net;
using System.Text.Json;
using EmployeeManagement.Application.Common.Exceptions;

namespace EmployeeManagement.API.Middleware;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(
        RequestDelegate next,
        ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ValidationException ex)
        {
            await HandleValidationException(context, ex);
        }
        catch (ConflictException ex)
        {
            await HandleConflictException(context, ex);
        }
        catch (Exception ex)
        {
            await HandleUnexpectedException(context, ex);
        }
    }

    private static async Task HandleValidationException(
        HttpContext context,
        ValidationException exception)
    {
        context.Response.StatusCode =
            (int)HttpStatusCode.BadRequest;

        context.Response.ContentType =
            "application/json";

        var errors = exception.Errors
            .GroupBy(error => error.PropertyName)
            .ToDictionary(
                group => group.Key,
                group => group
                    .Select(error => error.ErrorMessage)
                    .ToArray());

        var response = new
        {
            statusCode = 400,
            message = "One or more validation errors occurred.",
            errors
        };

        await context.Response.WriteAsync(
            JsonSerializer.Serialize(response));
    }

    private static async Task HandleConflictException(
        HttpContext context,
        ConflictException exception)
    {
        context.Response.StatusCode =
            (int)HttpStatusCode.Conflict;

        context.Response.ContentType =
            "application/json";

        var response = new
        {
            statusCode = 409,
            message = exception.Message
        };

        await context.Response.WriteAsync(
            JsonSerializer.Serialize(response));
    }

    private async Task HandleUnexpectedException(
        HttpContext context,
        Exception exception)
    {
        _logger.LogError(
            exception,
            "An unexpected error occurred.");

        context.Response.StatusCode =
            (int)HttpStatusCode.InternalServerError;

        context.Response.ContentType =
            "application/json";

        var response = new
        {
            statusCode = 500,
            message = "An unexpected error occurred."
        };

        await context.Response.WriteAsync(
            JsonSerializer.Serialize(response));
    }
}