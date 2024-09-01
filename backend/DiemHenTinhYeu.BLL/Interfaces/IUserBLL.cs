using DiemHenTinhYeu.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DiemHenTinhYeu.BLL.Interfaces
{
    public interface IUserBLL
    {
        UserDTO Authenticate(LoginDTO loginDTO);
        void Register(RegisterDTO registerDTO);
    }
}
