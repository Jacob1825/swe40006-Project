const { getPool } = require('./db');

async function setupDatabase() {
    try {
        const pool = await getPool();

        await pool.request().query(`
            IF OBJECT_ID('dbo.Tickets', 'U') IS NULL
            BEGIN
                CREATE TABLE dbo.Tickets (
                    id INT IDENTITY(1,1) PRIMARY KEY,
                    customerName NVARCHAR(100) NOT NULL,
                    issue NVARCHAR(200) NOT NULL,
                    description NVARCHAR(MAX) NOT NULL,
                    status NVARCHAR(50) NOT NULL DEFAULT 'Open'
                );
            END
        `);

        console.log('Tickets table created successfully');

        process.exit(0);
    } catch (error) {
        console.error('Database setup failed');
        console.error(error.message);

        process.exit(1);
    }
}

setupDatabase();