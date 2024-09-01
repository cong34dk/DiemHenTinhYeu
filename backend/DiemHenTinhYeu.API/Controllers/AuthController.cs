using DiemHenTinhYeu.BLL;
using DiemHenTinhYeu.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DiemHenTinhYeu.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserBLL _userBLL;
        private readonly IConfiguration _configuration;

        public AuthController(UserBLL userBLL, IConfiguration configuration)
        {
            _userBLL = userBLL;
            _configuration = configuration;
        }

        // Api login
        [HttpPost("login")]
        public IActionResult Login(LoginDTO loginDTO)
        {
            var user = _userBLL.Authenticate(loginDTO);

            if (user == null)
            {
                return Unauthorized(new { Message = "Invalid email or password." });
            }

            var token = GenerateJwtToken(user);
            return Ok(new { Token = token });
        }

        // Api Register
        [HttpPost("register")]
        public IActionResult Register(RegisterDTO registerDTO)
        {
            try
            {
                _userBLL.Register(registerDTO);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        private string GenerateJwtToken(UserDTO user)
        {
            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim("id", user.Id.ToString()),
            new Claim(ClaimTypes.Role, user.Role)
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
