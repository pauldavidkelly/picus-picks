using Microsoft.AspNetCore.Mvc;
using Moq;
using Picus.Api.Controllers;
using Picus.Api.Models.DTOs;
using Picus.Api.Models.Enums;
using Picus.Api.Services;
using Xunit;

namespace Picus.Api.Tests.Controllers;

public class TeamsControllerTests
{
    private readonly Mock<ITeamService> _mockTeamService;
    private readonly TeamsController _controller;

    public TeamsControllerTests()
    {
        _mockTeamService = new Mock<ITeamService>();
        _controller = new TeamsController(_mockTeamService.Object);
    }

    [Fact]
    public async Task GetTeamById_WithExistingTeam_ReturnsOkResult()
    {
        // Arrange
        var teamDto = new TeamDTO
        {
            Id = 1,
            Name = "Test Team",
            Abbreviation = "TT",
            City = "Test City",
            IconUrl = "test-icon.png",
            BannerUrl = "test-banner.png",
            PrimaryColor = "#000000",
            SecondaryColor = "#FFFFFF",
            TertiaryColor = "#FF0000",
            Conference = ConferenceType.AFC,
            Division = DivisionType.North
        };

        _mockTeamService.Setup(s => s.GetTeamByIdAsync(1))
            .ReturnsAsync(teamDto);

        // Act
        var result = await _controller.GetTeam(1);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var returnedTeam = Assert.IsType<TeamDTO>(okResult.Value);
        Assert.Equal(teamDto.Id, returnedTeam.Id);
        Assert.Equal(teamDto.Name, returnedTeam.Name);
        Assert.Equal(teamDto.Abbreviation, returnedTeam.Abbreviation);
        Assert.Equal(teamDto.City, returnedTeam.City);
    }

    [Fact]
    public async Task GetTeamById_WithNonExistingTeam_ReturnsNotFound()
    {
        // Arrange
        _mockTeamService.Setup(s => s.GetTeamByIdAsync(999))
            .ReturnsAsync((TeamDTO?)null);

        // Act
        var result = await _controller.GetTeam(999);

        // Assert
        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task GetTeams_ReturnsOkResultWithTeams()
    {
        // Arrange
        var teams = new List<TeamDTO>
        {
            new()
            {
                Id = 1,
                Name = "Team 1",
                Abbreviation = "T1",
                City = "City 1",
                Conference = ConferenceType.AFC,
                Division = DivisionType.North
            },
            new()
            {
                Id = 2,
                Name = "Team 2",
                Abbreviation = "T2",
                City = "City 2",
                Conference = ConferenceType.NFC,
                Division = DivisionType.South
            }
        };

        _mockTeamService.Setup(s => s.GetAllTeamsAsync())
            .ReturnsAsync(teams);

        // Act
        var result = await _controller.GetTeams();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var returnedTeams = Assert.IsType<List<TeamDTO>>(okResult.Value);
        Assert.Equal(2, returnedTeams.Count);
        Assert.Equal(teams[0].Id, returnedTeams[0].Id);
        Assert.Equal(teams[1].Id, returnedTeams[1].Id);
    }
}
