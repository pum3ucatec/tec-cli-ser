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
            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Classrooms",
                newName: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Classrooms",
                newName: "ID");
        }
    }
}
