using BillApp.Application.Services;
using BillApp.Infrastructure;
using BillApp.Infrastructure.Extensions;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// CORS Politikas� Tan�mlama
var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
          policy =>
          {
              policy.WithOrigins(allowedOrigins)
                    .AllowAnyHeader()
                    .AllowAnyMethod();
          });
});

// Swagger Deste�i
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
});

// Kontrolleri Ekle
builder.Services.AddControllers();

builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();

// Altyap� Ba��ml�l�klar�n� Kaydet
builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

// CORS Kullan�m�
app.UseCors("AllowSpecificOrigins");

bool applyMigrations = builder.Configuration.GetValue<bool>("APP_APPLY_MIGRATIONS");

if (app.Environment.IsDevelopment() || applyMigrations)
{
    app.ApplyMigrations();
}

// Middleware Konfig�rasyonu
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseExceptionHandler("/error");
    app.UseHsts();
}

// HTTPS y�nlendirmeyi kald�rd�k ��nk� Render zaten HTTPS kullan�yor
// app.UseHttpsRedirection();

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

// Port Bilgisini Al ve Ayarla
var portString = Environment.GetEnvironmentVariable("PORT");
if (!int.TryParse(portString, out int port) || port < 1024 || port > 65535)
{
    port = 5025;
}

// Kestrel'i HTTP �zerinden �al��t�r
var url = $"http://0.0.0.0:{port}";

app.MapControllers();
app.Run(url);
