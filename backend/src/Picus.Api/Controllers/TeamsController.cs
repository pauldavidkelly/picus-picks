using Microsoft.AspNetCore.Mvc;
using Picus.Api.Models.Enums;
using Picus.Api.Services;

namespace Picus.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TeamsController : ControllerBase
    {
        private readonly ITeamService _teamService;

        public TeamsController(ITeamService teamService)
        {
            _teamService = teamService;
        }

        [HttpGet]
        public async Task<IActionResult> GetTeams()
        {
            var teams = await _teamService.GetAllTeamsAsync();
            return Ok(teams);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTeam(int id)
        {
            var team = await _teamService.GetTeamByIdAsync(id);
            if (team == null)
            {
                return NotFound();
            }
            return Ok(team);
        }

        [HttpGet("{conference}/{division}")]
        public async Task<IActionResult> GetTeamsByConferenceAndDivision(ConferenceType conference, DivisionType division)
        {
            var teams = await _teamService.GetTeamsByConferenceAndDivisionAsync(conference, division);
            return Ok(teams);
        }
    }
}
