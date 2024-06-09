using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Artworks.models;
using Microsoft.EntityFrameworkCore;
namespace Artworks.models
{
    [Route("api/[controller]")]
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
            var Art = await _context.Projects
                                      .OrderByDescending(e => e.created_at)
                                      .ToListAsync();
            return Ok(Art);
            
        }
        
    }
}