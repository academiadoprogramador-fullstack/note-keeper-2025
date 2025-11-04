using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.Extensions.Options;

namespace NoteKeeper.WebApi.Config;

public class CorsConfig(
    IConfiguration configuration,
    IWebHostEnvironment environment,
    ILogger<CorsConfig> logger
) : IConfigureOptions<CorsOptions>
{
    public void Configure(CorsOptions options)
    {
        var origensPermitidasString = configuration["CORS_ALLOWED_ORIGINS"];

        if (string.IsNullOrWhiteSpace(origensPermitidasString))
        {
            var msg = "A variável de ambiente \"CORS_ALLOWED_ORIGINS\" não foi fornecida.";

            logger.LogError(msg);

            throw new Exception(msg);
        }

        var origensPermitidas = origensPermitidasString
            .Split(';', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .Select(x => x.TrimEnd('/'))
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToArray();

        if (environment.IsDevelopment())
        {
            options.AddDefaultPolicy(policy =>
            {
                policy
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        }
        else
        {
            options.AddDefaultPolicy(policy =>
            {
                policy
                    .WithOrigins(origensPermitidas)
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
        }
    }
}
