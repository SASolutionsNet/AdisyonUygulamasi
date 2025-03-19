using BillApp.Application.Services;
using BillApp.Infrastructure;
using BillApp.Infrastructure.Extensions;

var builder = WebApplication.CreateBuilder(args);

// CORS Politikası Tanımlama
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

// Swagger Desteği
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

// Altyapı Bağımlılıklarını Kaydet
builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

// CORS Kullanımı
app.UseCors("AllowSpecificOrigins");

// Middleware Konfigürasyonu
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.ApplyMigrations();
}
else
{
    app.UseExceptionHandler("/error");
    app.UseHsts();
}

// HTTPS yönlendirmeyi kaldırdık çünkü Render zaten HTTPS kullanıyor
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

// Kestrel'i HTTP Üzerinden Çalıştır
var url = $"http://0.0.0.0:{port}";

app.MapControllers();
app.Run(url);
