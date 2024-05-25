using Microsoft.EntityFrameworkCore;

namespace Artworks.models;

public class ArtworksContext : DbContext
{
    public ArtworksContext(DbContextOptions<ArtworksContext> options)
        : base(options)
        
    {
    }
 
    public DbSet<Projects> Projects { get; set; } = null!;
}