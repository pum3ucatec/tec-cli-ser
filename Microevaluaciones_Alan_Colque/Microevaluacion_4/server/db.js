// server/db.js
const sql = require('mssql/msnodesqlv8');

const config = {
    // CORRECCIÓN 1: 'Trusted_Connection=Yes' (ODBC no acepta 'True')
    // CORRECCIÓN 2: Si tu base de datos está en tu usuario local, usa este Server:
    connectionString: "Server=DESKTOP-9E2G9DG;Database=MiProyectoMVC2;Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server}"
};

async function getConnection() {
    try {
        const pool = await sql.connect(config);
        console.log("✅ ¡Conexión Exitosa a la Base de Datos!");
        return pool;
    } catch (error) {
        console.error('❌ ERROR DE CONEXIÓN:', error.message);
        throw error; 
    }
}

module.exports = { getConnection, sql };