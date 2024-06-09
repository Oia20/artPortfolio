using Microsoft.EntityFrameworkCore;
using Artworks.models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure the DbContext with PostgreSQL
builder.Services.AddDbContext<ArtworksContext>(options => 
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Configure CORS to allow requests from the specified origin
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("https://rosaliasart.com")
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Apply the CORS policy

app.UseHttpsRedirection();
app.UseCors("AllowSpecificOrigin");

app.UseAuthorization();

// Map endpoints
app.MapControllers();

app.MapGet("/Projects/{id}", async (int id, ArtworksContext context) =>
{
    var project = await context.Projects.FindAsync(id);
    return project;
});

// Update project
app.MapPut("/Projects/Update/{id}", async (int id, ArtworksContext context, Project project) =>
{
    var projectToUpdate = await context.Projects.FindAsync(id);
    if (projectToUpdate == null)
    {
        return Results.NotFound();
    }

    projectToUpdate.title = project.title;
    projectToUpdate.desc = project.desc;
    projectToUpdate.medium = project.medium;
    projectToUpdate.size = project.size;
    projectToUpdate.imageurl = project.imageurl;
    await context.SaveChangesAsync();
    return Results.Ok(projectToUpdate);
});

// Delete project
app.MapDelete("/Projects/Delete/{id}", async (int id, ArtworksContext context) =>
{
    var projectToDelete = await context.Projects.FindAsync(id);
    if (projectToDelete == null)
    {
        return Results.NotFound();
    }
    context.Projects.Remove(projectToDelete);
    await context.SaveChangesAsync();
    return Results.Ok();
});

app.Run();
