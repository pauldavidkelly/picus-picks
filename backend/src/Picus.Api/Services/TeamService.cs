using Microsoft.EntityFrameworkCore;
using Picus.Api.Data;
using Picus.Api.Models;
using Picus.Api.Models.DTOs;

namespace Picus.Api.Services;

public interface ITeamService
{
    Task<TeamDTO?> GetTeamByIdAsync(int id);
    Task<IEnumerable<TeamDTO>> GetAllTeamsAsync();
}

public class TeamService : ITeamService
{
    private readonly IRepository<Team> _teamRepository;
    private readonly PicusDbContext _dbContext;

    public TeamService(IRepository<Team> teamRepository, PicusDbContext dbContext)
    {
        _teamRepository = teamRepository;
        _dbContext = dbContext;
    }

    public async Task<TeamDTO?> GetTeamByIdAsync(int id)
    {
        var team = await _dbContext.Teams
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == id);

        return team == null ? null : MapToDTO(team);
    }

    public async Task<IEnumerable<TeamDTO>> GetAllTeamsAsync()
    {
        var teams = await _dbContext.Teams
            .AsNoTracking()
            .OrderBy(t => t.Conference)
            .ThenBy(t => t.Division)
            .ThenBy(t => t.City)
            .ToListAsync();

        return teams.Select(MapToDTO);
    }

    private static TeamDTO MapToDTO(Team team)
    {
        return new TeamDTO
        {
            Id = team.Id,
            Name = team.Name,
            Abbreviation = team.Abbreviation,
            City = team.City,
            IconUrl = team.IconUrl,
            BannerUrl = team.BannerUrl,
            PrimaryColor = team.PrimaryColor,
            SecondaryColor = team.SecondaryColor,
            TertiaryColor = team.TertiaryColor,
            Conference = team.Conference,
            Division = team.Division
        };
    }
}
