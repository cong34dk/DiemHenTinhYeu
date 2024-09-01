using DiemHenTinhYeu.BLL.Interfaces;
using DiemHenTinhYeu.DAL;
using DiemHenTinhYeu.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DiemHenTinhYeu.BLL
{
    public class UserBLL : IUserBLL
    {
        private readonly UserDAL _userDAL;

        public UserBLL(UserDAL userDAL)
        {
            _userDAL = userDAL;
        }

        // Xác thực người dùng
        public UserDTO Authenticate(LoginDTO loginDTO)
        {
            var user = _userDAL.GetUserByEmail(loginDTO.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDTO.Password, user.Password))
            {
                return null;
            }

            // If successful login
            return user;
        }

        // Đăng ký tài khoản
        public void Register(RegisterDTO registerDTO)
        {
            var user = _userDAL.GetUserByEmail(registerDTO.Email);

            if (user != null)
            {
                throw new Exception("Email already exists");
            }

            var newUser = new UserDTO()
            {
                Username = registerDTO.Username,
                Email = registerDTO.Email,
                Password = registerDTO.Password,
                Role = registerDTO.Role
            };

            _userDAL.AddUser(newUser);
        }
    }
}
