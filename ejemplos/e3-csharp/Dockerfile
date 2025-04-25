# See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.
FROM mcr.microsoft.com/dotnet/aspnet:9.0-preview AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:9.0-preview AS build
WORKDIR /src
COPY ["e3-csharp.csproj", "."]
RUN dotnet restore "./e3-csharp.csproj"
COPY . .
RUN dotnet build "e3-csharp.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "e3-csharp.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
# Variables de entorno para la cadena de conexión
ENV ASPNETCORE_ENVIRONMENT=Development
ENV DEFAULT_CONNECTION="Server=db;Database=E3Db;User=sa;Password=Your_password123;TrustServerCertificate=True;"
ENTRYPOINT ["dotnet", "e3-csharp.dll"]
