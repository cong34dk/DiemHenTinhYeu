using System;
using System.Collections.Generic;

namespace DiemHenTinhYeu.DAL.Models;

public partial class User
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public string Role { get; set; } = null!;

    public virtual ICollection<Event> Events { get; set; } = new List<Event>();

    public virtual ICollection<Match> MatchUserId1Navigations { get; set; } = new List<Match>();

    public virtual ICollection<Match> MatchUserId2Navigations { get; set; } = new List<Match>();

    public virtual ICollection<Message> MessageReceivers { get; set; } = new List<Message>();

    public virtual ICollection<Message> MessageSenders { get; set; } = new List<Message>();

    public virtual ICollection<Profile> Profiles { get; set; } = new List<Profile>();
}
