using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Artworks.models;
using Microsoft.EntityFrameworkCore;
namespace Artworks.models
{
    [Route("[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        
        private readonly ArtworksContext _context;
        public ProjectsController(ArtworksContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetArtworks()
        {
            var Art = await _context.Projects.ToListAsync();
            return Ok(Art);
            
        }
        
    }
}