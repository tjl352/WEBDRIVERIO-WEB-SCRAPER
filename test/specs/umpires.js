const { Pool } = require('pg');

describe('Umpire Stats', () => {

    it('should grab umpire stats', async () => {

        // Create a new Pool instance
        const pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'mac',
            password: '',
            port: 5432, // Default PostgreSQL port
        });

        await browser.url(`https://swishanalytics.com/mlb/mlb-umpire-factors`);

        // Define your variables
        let id;
        let name;
        let games;
        let kPercent;
        let walkPercent;
        let runsPerGame;
        let battingAverage;
        let onBasePercent;
        let sluggingPercent;

       for(i = 1; i < 158; i++){
            id = i;
            name = await $(`#ump-table > tbody > tr:nth-child(${i}) > td:nth-child(1)`).getText();
            games = parseFloat(String(await $(`#ump-table > tbody > tr:nth-child(${i}) > td:nth-child(3)`).getText()));
            kPercent = parseFloat(String(await $(`#ump-table > tbody > tr:nth-child(${i}) > td:nth-child(4)`).getText()).slice(0,-1));
            walkPercent = parseFloat(String(await $(`#ump-table > tbody > tr:nth-child(${i}) > td:nth-child(5)`).getText()).slice(0,-1));
            runsPerGame = parseFloat(String(await $(`#ump-table > tbody > tr:nth-child(${i}) > td:nth-child(6)`).getText()));
            battingAverage = parseFloat(String(await $(`#ump-table > tbody > tr:nth-child(${i}) > td:nth-child(7)`).getText()));
            onBasePercent = parseFloat(String(await $(`#ump-table > tbody > tr:nth-child(${i}) > td:nth-child(8)`).getText()));
            sluggingPercent = parseFloat(String(await $(`#ump-table > tbody > tr:nth-child(${i}) > td:nth-child(9)`).getText()));

             // Define your SQL INSERT statement with placeholders for variables
            const sqlQuery = 'INSERT INTO umpires (id, name, games, k_percent, walk_percent, runs_per_game, batting_average, on_base_percentage, slugging_percentage) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
  
            // Querying the database
            pool.query(sqlQuery, [id, name, games, kPercent, walkPercent, runsPerGame, battingAverage, onBasePercent, sluggingPercent], (err, res) => {
                if (err) {
                    console.error('Error executing query', err.stack);
                } else {
                    console.log('Query result:', res.rows);
                }
            });
       }
        // Close the pool to end the connection
        pool.end();
    })
})

