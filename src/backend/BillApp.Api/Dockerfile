# .NET Core 8 SDK ile build aşaması
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Projeyi kopyala ve restore et
COPY BillApp.Api/BillApp.Api.csproj BillApp.Api/
COPY BillApp.Application/BillApp.Application.csproj BillApp.Application/
COPY BillApp.Domain/BillApp.Domain.csproj BillApp.Domain/
COPY BillApp.Infrastructure/BillApp.Infrastructure.csproj BillApp.Infrastructure/


RUN dotnet restore "BillApp.Api/BillApp.Api.csproj"

# Tüm projeyi kopyala ve build et
COPY . .
WORKDIR "/app/BillApp.Api"
RUN dotnet publish -c Release -o out

# Runtime için daha hafif bir image kullan
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

COPY --from=build /app/BillApp.Api/out ./
ENTRYPOINT ["dotnet", "BillApp.Api.dll"]

# API'nin dışarıya açılacağı port
EXPOSE 5025
