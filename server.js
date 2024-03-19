const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'b22p2pk53hqmbzpgv6yl-mysql.services.clever-cloud.com',
    user: 'uxuebldrkaolppxi',
    password: 'lLnH7UIXxJviwjW9OgcW',
    database: 'b22p2pk53hqmbzpgv6yl'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.post('/savetodb', (req, res) => {
    const { username, preferredLanguage, stdin, sourceCode } = req.body;
    const query = `INSERT INTO submissions (username, prelang, stdin, source, uploadtime) VALUES (?, ?, ?, ?, DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s'))`; // Use DATE_FORMAT() to format current timestamp according to MySQL datetime format
    db.query(query, [username, preferredLanguage, stdin, sourceCode], (error, results) => {
        if (error) {
            console.error('Error inserting submission into database:', error);
            return res.status(500).json({ error: 'An error occurred while processing your request.' });
        }
        res.status(200).json({ message: 'Submission saved successfully!' });
    });
});

app.get('/viewsubmissions', (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 5; // Default to 5 submissions per page

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Modify the query to include the ID range for each page
    const query = `SELECT * FROM submissions WHERE id >= ${startIndex + 1} AND id <= ${endIndex} ORDER BY uploadtime DESC`;

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching submissions from database:', error);
            return res.status(500).json({ error: 'An error occurred while processing your request.' });
        }

        res.status(200).json(results);
    });
});


app.get('/submissions/count', (req, res) => {
    const query = 'SELECT COUNT(*) AS count FROM submissions';

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching submission count from database:', error);
            return res.status(500).json({ error: 'An error occurred while processing your request.' });
        }

        const count = results[0].count;
        res.status(200).json({ count });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
