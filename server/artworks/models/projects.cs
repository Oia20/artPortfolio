using System.ComponentModel.DataAnnotations.Schema;



namespace Artworks.models;

[Table("projects")]
public class Projects
{
    public int id {get; set;}
    public string? title { get; set; }
    public string? desc { get; set; }
    public string? medium { get; set; }
    public string? size { get; set; }
    public string? imageurl { get; set; }

}