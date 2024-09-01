using System;
using System.Collections.Generic;

namespace DiemHenTinhYeu.DAL.Models;

public partial class Profile
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Gender { get; set; }

    public DateOnly? DateOfBirth { get; set; }

    public string? Bio { get; set; }

    public string? ProfilePictureUrl { get; set; }

    public virtual User User { get; set; } = null!;
}
