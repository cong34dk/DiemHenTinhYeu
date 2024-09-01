using DiemHenTinhYeu.DAL.Interfaces;
using DiemHenTinhYeu.DAL.Models;
using DiemHenTinhYeu.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DiemHenTinhYeu.DAL
{
    public class UserDAL : IUserDAL
    {
        private readonly DiemhentinhyeudbContext _context;

        public UserDAL(DiemhentinhyeudbContext context)
        {
            _context = context;
        }

        // Phương thức lấy về user
        public UserDTO GetUserByEmail(string email)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == email);

            if (user == null)
            {
                return null;
            }

            return new UserDTO
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Password = user.Password,
                Role = user.Role
            };
        }

        // Phương thức thêm người dùng
        public void AddUser(UserDTO userDTO)
        {
            var user = new User
            {
                Username = userDTO.Username,
                Email = userDTO.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(userDTO.Password),
                Role = userDTO.Role
            };

            _context.Users.Add(user);
            _context.SaveChanges();
        }

    }
}
