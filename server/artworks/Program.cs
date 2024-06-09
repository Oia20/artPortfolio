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
builder.Services.AddDbContext<ArtworksContext>(options => 
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
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
app.MapGet("/Projects/{id}", async (int id, ArtworksContext context) =>
{
    var project = await context.Projects.FindAsync(id);
    return project;
});

// update project
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

//delete project
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

app.UseHttpsRedirection();
app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
