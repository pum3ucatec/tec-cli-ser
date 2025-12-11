// server/index.js
const express = require('express');
const cors = require('cors');
const { getConnection, sql } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Función genérica para ejecutar SQL
async function query(q, params = []) {
    const pool = await getConnection();
    const request = pool.request();
    params.forEach(p => request.input(p.name, p.type, p.val));
    const result = await request.query(q);
    return result;
}

// --- PERSONS ---
app.get('/api/persons', async (req, res) => res.json((await query('SELECT * FROM Persons')).recordset));
app.get('/api/persons/:id', async (req, res) => res.json((await query('SELECT * FROM Persons WHERE ID=@id', [{name:'id',type:sql.Int,val:req.params.id}])).recordset[0]));
app.post('/api/persons', async (req, res) => {
    await query('INSERT INTO Persons (FirstName, LastName, Status) VALUES (@f, @l, @s)', [
        {name:'f',type:sql.NVarChar,val:req.body.FirstName}, {name:'l',type:sql.NVarChar,val:req.body.LastName}, {name:'s',type:sql.NVarChar,val:req.body.Status}
    ]);
    res.json({msg:'Ok'});
});
app.put('/api/persons/:id', async (req, res) => {
    await query('UPDATE Persons SET FirstName=@f, LastName=@l, Status=@s WHERE ID=@id', [
        {name:'id',type:sql.Int,val:req.params.id}, {name:'f',type:sql.NVarChar,val:req.body.FirstName}, {name:'l',type:sql.NVarChar,val:req.body.LastName}, {name:'s',type:sql.NVarChar,val:req.body.Status}
    ]);
    res.json({msg:'Ok'});
});
app.delete('/api/persons/:id', async (req, res) => {
    await query('DELETE FROM Persons WHERE ID=@id', [{name:'id',type:sql.Int,val:req.params.id}]);
    res.json({msg:'Ok'});
});

// --- CLASSROOMS ---
app.get('/api/classrooms', async (req, res) => res.json((await query('SELECT * FROM Classrooms')).recordset));
app.get('/api/classrooms/:id', async (req, res) => res.json((await query('SELECT * FROM Classrooms WHERE ID=@id', [{name:'id',type:sql.Int,val:req.params.id}])).recordset[0]));
app.post('/api/classrooms', async (req, res) => {
    await query('INSERT INTO Classrooms (Code, Name, Status) VALUES (@c, @n, @s)', [
        {name:'c',type:sql.NVarChar,val:req.body.Code}, {name:'n',type:sql.NVarChar,val:req.body.Name}, {name:'s',type:sql.NVarChar,val:req.body.Status}
    ]);
    res.json({msg:'Ok'});
});
app.put('/api/classrooms/:id', async (req, res) => {
    await query('UPDATE Classrooms SET Code=@c, Name=@n, Status=@s WHERE ID=@id', [
        {name:'id',type:sql.Int,val:req.params.id}, {name:'c',type:sql.NVarChar,val:req.body.Code}, {name:'n',type:sql.NVarChar,val:req.body.Name}, {name:'s',type:sql.NVarChar,val:req.body.Status}
    ]);
    res.json({msg:'Ok'});
});
app.delete('/api/classrooms/:id', async (req, res) => {
    await query('DELETE FROM Classrooms WHERE ID=@id', [{name:'id',type:sql.Int,val:req.params.id}]);
    res.json({msg:'Ok'});
});

// --- SUBJECTS ---
app.get('/api/subjects', async (req, res) => res.json((await query('SELECT * FROM Subjects')).recordset));
app.get('/api/subjects/:id', async (req, res) => res.json((await query('SELECT * FROM Subjects WHERE ID=@id', [{name:'id',type:sql.Int,val:req.params.id}])).recordset[0]));
app.post('/api/subjects', async (req, res) => {
    await query('INSERT INTO Subjects (Name, Description, Status) VALUES (@n, @d, @s)', [
        {name:'n',type:sql.NVarChar,val:req.body.Name}, {name:'d',type:sql.NVarChar,val:req.body.Description}, {name:'s',type:sql.NVarChar,val:req.body.Status}
    ]);
    res.json({msg:'Ok'});
});
app.put('/api/subjects/:id', async (req, res) => {
    await query('UPDATE Subjects SET Name=@n, Description=@d, Status=@s WHERE ID=@id', [
        {name:'id',type:sql.Int,val:req.params.id}, {name:'n',type:sql.NVarChar,val:req.body.Name}, {name:'d',type:sql.NVarChar,val:req.body.Description}, {name:'s',type:sql.NVarChar,val:req.body.Status}
    ]);
    res.json({msg:'Ok'});
});
app.delete('/api/subjects/:id', async (req, res) => {
    await query('DELETE FROM Subjects WHERE ID=@id', [{name:'id',type:sql.Int,val:req.params.id}]);
    res.json({msg:'Ok'});
});

// --- CAREERS ---
app.get('/api/careers', async (req, res) => res.json((await query('SELECT * FROM Careers')).recordset));
app.get('/api/careers/:id', async (req, res) => res.json((await query('SELECT * FROM Careers WHERE ID=@id', [{name:'id',type:sql.Int,val:req.params.id}])).recordset[0]));
app.post('/api/careers', async (req, res) => {
    await query('INSERT INTO Careers (Name, Description, Status) VALUES (@n, @d, @s)', [
        {name:'n',type:sql.NVarChar,val:req.body.Name}, {name:'d',type:sql.NVarChar,val:req.body.Description}, {name:'s',type:sql.NVarChar,val:req.body.Status}
    ]);
    res.json({msg:'Ok'});
});
app.put('/api/careers/:id', async (req, res) => {
    await query('UPDATE Careers SET Name=@n, Description=@d, Status=@s WHERE ID=@id', [
        {name:'id',type:sql.Int,val:req.params.id}, {name:'n',type:sql.NVarChar,val:req.body.Name}, {name:'d',type:sql.NVarChar,val:req.body.Description}, {name:'s',type:sql.NVarChar,val:req.body.Status}
    ]);
    res.json({msg:'Ok'});
});
app.delete('/api/careers/:id', async (req, res) => {
    await query('DELETE FROM Careers WHERE ID=@id', [{name:'id',type:sql.Int,val:req.params.id}]);
    res.json({msg:'Ok'});
});

app.listen(3000, () => console.log('✅ Servidor BACKEND corriendo en puerto 3000'));