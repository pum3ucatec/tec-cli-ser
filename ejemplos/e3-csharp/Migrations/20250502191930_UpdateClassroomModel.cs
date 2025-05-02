using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace e3_csharp.Migrations
{
    /// <inheritdoc />
    public partial class UpdateClassroomModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "Classrooms");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Classrooms",
                newName: "Location");

            migrationBuilder.AddColumn<int>(
                name: "Capacity",
                table: "Classrooms",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Classrooms",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Capacity",
                table: "Classrooms");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Classrooms");

            migrationBuilder.RenameColumn(
                name: "Location",
                table: "Classrooms",
                newName: "Status");

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "Classrooms",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
