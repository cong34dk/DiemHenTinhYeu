using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DiemHenTinhYeu.DTO;

namespace DiemHenTinhYeu.DAL.Interfaces
{
    public interface IUserDAL
    {
        UserDTO GetUserByEmail(string email);
        void AddUser(UserDTO userDTO);
    }
}
