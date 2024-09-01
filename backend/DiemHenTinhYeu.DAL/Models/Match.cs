using System;
using System.Collections.Generic;

namespace DiemHenTinhYeu.DAL.Models;

public partial class Match
{
    public int Id { get; set; }

    public int UserId1 { get; set; }

    public int UserId2 { get; set; }

    public DateTime? MatchedAt { get; set; }

    public virtual User UserId1Navigation { get; set; } = null!;

    public virtual User UserId2Navigation { get; set; } = null!;
}
