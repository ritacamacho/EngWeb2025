const http = require('http');
const axios = require('axios');

const PORT = 5000;
const STUDENTS_URL = 'http://localhost:3000/alunos';
const COURSES_URL = 'http://localhost:3000/cursos';
const INSTRUMENTS_URL = 'http://localhost:3000/instrumentos';

const server = http.createServer(async (req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        const [students, courses, instruments] = await Promise.all([
            axios.get(STUDENTS_URL).then(res => res.data),
            axios.get(COURSES_URL).then(res => res.data),
            axios.get(INSTRUMENTS_URL).then(res => res.data)
        ]);

        let html = `
        <html>
            <meta charset="UTF-8">
            <head>
                <title>Escola de Música</title>
                <style>
                    body { font-family: Space Grotesk, sans-serif; margin: 20px; }
                    h1 { color: #333; }
                    .container { max-width: 1000px; margin: auto; }
                    .section { margin-bottom: 20px; }
                    .title { font-weight: bold; }
                    td, th {border: 1px solid #dddddd; text-align: left; padding: 8px;}
                    tr:nth-child(even) {background-color: #dddddd;}
                    .options { margin-bottom: 20px; font-size: 26px; font-weight: bold; }
                    .options a { text-decoration: underline; color: #333; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Escola de Música 🎶</h1>
                    <div class="options">
                        <a href="/students">Alunos 👨‍🎓</a> | <a href="/courses">Cursos 🎓</a> | <a href="/instruments">Instrumentos 🎷</a>
                    </div>
                    <div class="section">
                        <h2>Alunos</h2>
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Data de Nascimento</th>
                                <th>Curso</th>
                                <th>Instrumento</th>
                            </tr>
                        ${students.map(student => `
                            <tr>
                                <td>
                                    <a href="/students/${student.id}">${student.id}</a>
                                </td>
                                <td>${student.nome}</td>
                                <td>${student.dataNasc}</td>
                                <td>
                                    <a href="/courses/${student.curso}">${student.curso}</a>
                                </td>
                                <td>
                                    <a href="/instruments/${student.instrumento.id}">${student.instrumento['#text']}</a>
                                </td>
                            </tr>
                        `).join('')}
                        </table>
                    </div>
                    <div class="section">
                        <h2>Cursos</h2>
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>Designação</th>
                                <th>Duração</th>
                                <th>Instrumento</th>
                            </tr>
                        ${courses.map(course => `
                            <tr>
                                <td>
                                    <a href="/courses/${course.id}">${course.id}</a>
                                </td>
                                <td>${course.designacao}</td>
                                <td>${course.duracao} anos</td>
                                <td>
                                    <a href="/courses/${course.instrumento.id}">${course.instrumento['#text']}</a>
                                </td>
                            </tr>
                        `).join('')}
                        </table>
                    </div>
                    <div class="section">
                        <h2>Instrumentos</h2>
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>Designação</th>
                            </tr>
                        ${instruments.map(instrument => `
                            <tr>
                                <td>
                                    <a href="/instruments/${instrument.id}">${instrument.id}</a>
                                </td>
                                <td>${instrument['#text']}</td>
                            </tr>
                        `).join('')}
                        </table>
                    </div>
                </div>
            </body>
        </html>
        `
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    } else if(req.url.startsWith('/students/') && req.method === 'GET') {
        const id = req.url.split('/')[2];
        const student = await axios.get(`${STUDENTS_URL}/${id}`).then(res => res.data);

        let html = `
        <html>
            <meta charset="UTF-8">
            <head>
                <title>Escola de Música</title>
                <style>
                    body { font-family: Space Grotesk, sans-serif; margin: 20px; }
                    h1 { color: #333; }
                    .container { max-width: 1000px; margin: auto; }
                    .section { margin-bottom: 20px; }
                    .title { font-weight: bold; }
                    td, th {border: 1px solid #dddddd; text-align: left; padding: 8px;}
                    tr:nth-child(even) {background-color: #dddddd;}
                    .options { margin-bottom: 20px; font-size: 26px; font-weight: bold; }
                    .options a { text-decoration: underline; color: #333; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Escola de Música 🎶</h1>
                    <div class="options">
                        <a href="/">🏠</a> | <a href="/students">Alunos 👨‍🎓</a> | <a href="/courses">Cursos 🎓</a> | <a href="/instruments">Instrumentos 🎷</a>
                    </div>
                    <div class="section">
                        <h2>Aluno</h2>
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Data de Nascimento</th>
                                <th>Curso</th>
                                <th>Instrumento</th>
                            </tr>
                            <tr>
                                <td>${student.id}</td>
                                <td>${student.nome}</td>
                                <td>${student.dataNasc}</td>
                                <td>
                                    <a href="/courses/${student.curso}">${student.curso}</a>
                                </td>
                                <td>
                                    <a href="/instruments/${student.instrumento.id}">${student.instrumento['#text']}</a>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </body>
        </html>
        `

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    } else if(req.url.startsWith('/students') && req.method === 'GET') {
        const students = await axios.get(STUDENTS_URL).then(res => res.data);

        let html = `
        <html>
            <meta charset="UTF-8">
            <head>
                <title>Escola de Música</title>
                <style>
                    body { font-family: Space Grotesk, sans-serif; margin: 20px; }
                    h1 { color: #333; }
                    .container { max-width: 1000px; margin: auto; }
                    .section { margin-bottom: 20px; }
                    .title { font-weight: bold; }
                    td, th {border: 1px solid #dddddd; text-align: left; padding: 8px;}
                    tr:nth-child(even) {background-color: #dddddd;}
                    .options { margin-bottom: 20px; font-size: 26px; font-weight: bold; }
                    .options a { text-decoration: underline; color: #333; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Escola de Música 🎶</h1>
                    <div class="options">
                        <a href="/">🏠</a> | <a href="/courses">Cursos 🎓</a> | <a href="/instruments">Instrumentos 🎷</a>
                    </div>
                    <div class="section">
                        <h2>Alunos</h2>
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Data de Nascimento</th>
                                <th>Curso</th>
                                <th>Instrumento</th>
                            </tr>
                        ${students.map(student => `
                            <tr>
                                <td>
                                    <a href="/students/${student.id}">${student.id}</a>
                                </td>
                                <td>${student.nome}</td>
                                <td>${student.dataNasc}</td>
                                <td>
                                    <a href="/courses/${student.curso}">${student.curso}</a>
                                </td>
                                <td>
                                    <a href="/instruments/${student.instrumento.id}">${student.instrumento['#text']}</a>
                                </td>
                            </tr>
                        `).join('')}
                        </table>
                    </div>
                </div>
            </body>
        </html>
        `
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    } else if (req.url.startsWith('/courses/') && req.method === 'GET') {
        const id = req.url.split('/')[2];
        const course = await axios.get(`${COURSES_URL}/${id}`).then(res => res.data);
        const studentsInCourse = await axios.get(`${STUDENTS_URL}?curso=${id}`).then(res => res.data);

        let html = `
        <html>
            <meta charset="UTF-8">
            <head>
                <title>Escola de Música</title>
                <style>
                    body { font-family: Space Grotesk, sans-serif; margin: 20px; }
                    h1 { color: #333; }
                    .container { max-width: 1000px; margin: auto; }
                    .section { margin-bottom: 20px; }
                    .title { font-weight: bold; }
                    td, th {border: 1px solid #dddddd; text-align: left; padding: 8px;}
                    tr:nth-child(even) {background-color: #dddddd;}
                    .options { margin-bottom: 20px; font-size: 26px; font-weight: bold; }
                    .options a { text-decoration: underline; color: #333; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Escola de Música 🎶</h1>
                    <div class="options">
                        <a href="/">🏠</a> | <a href="/students">Alunos 👨‍🎓</a> | <a href="/courses">Cursos 🎓</a> | <a href="/instruments">Instrumentos 🎷</a>
                    </div>
                    <div class="section">
                        <h2>Curso</h2>
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>Designação</th>
                                <th>Duração</th>
                                <th>Instrumento</th>
                            </tr>
                            <tr>
                                <td>${course.id}</td>
                                <td>${course.designacao}</td>
                                <td>${course.duracao} anos</td>
                                <td>
                                    <a href="/instruments/${course.instrumento.id}">${course.instrumento['#text']}</a>
                                </td>
                            </tr>
                        </table>
                        <h2>Estudantes inscritos</h2>
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Data de Nascimento</th>
                                <th>Instrumento</th>
                            </tr>
                            ${studentsInCourse.map(student => `
                                <tr>
                                    <td>
                                        <a href="/students/${student.id}">${student.id}</a>
                                    </td>
                                    <td>${student.nome}</td>
                                    <td>${student.dataNasc}</td>
                                    <td>
                                        <a href="/instruments/${student.instrumento.id}">${student.instrumento['#text']}</a>
                                    </td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                </div>
            </body>
        </html>
        `

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    } else if(req.url.startsWith('/courses') && req.method === 'GET') {
        const courses = await axios.get(COURSES_URL).then(res => res.data);

        let html = `
        <html>
            <meta charset="UTF-8">
            <head>
                <title>Escola de Música</title>
                <style>
                    body { font-family: Space Grotesk, sans-serif; margin: 20px; }
                    h1 { color: #333; }
                    .container { max-width: 1000px; margin: auto; }
                    .section { margin-bottom: 20px; }
                    .title { font-weight: bold; }
                    td, th {border: 1px solid #dddddd; text-align: left; padding: 8px;}
                    tr:nth-child(even) {background-color: #dddddd;}
                    .options { margin-bottom: 20px; font-size: 26px; font-weight: bold; }
                    .options a { text-decoration: underline; color: #333; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Escola de Música 🎶</h1>
                    <div class="options">
                        <a href="/">🏠</a> | <a href="/students">Alunos 👨‍🎓</a> | <a href="/instruments">Instrumentos 🎷</a>
                    </div>
                    <div class="section">
                        <h2>Cursos</h2>
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>Designação</th>
                                <th>Duração</th>
                                <th>Instrumento</th>
                            </tr>
                        ${courses.map(course => `
                            <tr>
                                <td>
                                    <a href="/courses/${course.id}">${course.id}</a>
                                </td>
                                <td>${course.designacao}</td>
                                <td>${course.duracao} anos</td>
                                <td>
                                    <a href="/instruments/${course.instrumento.id}">${course.instrumento['#text']}</a>
                                </td>
                            </tr>
                        `).join('')}
                        </table>
                    </div>
                </div>
            </body>
        </html>
        `
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    } else if (req.url.startsWith('/instruments/') && req.method === 'GET') {
        const id = req.url.split('/')[2];
        const instrument = await axios.get(`${INSTRUMENTS_URL}/${id}`).then(res => res.data);
        const studentsWithInstrument = await axios.get(`${STUDENTS_URL}?instrumento=${id}`).then(res => res.data);

        let html = `
        <html>
            <meta charset="UTF-8">
            <head>
                <title>Escola de Música</title>
                <style>
                    body { font-family: Space Grotesk, sans-serif; margin: 20px; }
                    h1 { color: #333; }
                    .container { max-width: 1000px; margin: auto; }
                    .section { margin-bottom: 20px; }
                    .title { font-weight: bold; }
                    td, th {border: 1px solid #dddddd; text-align: left; padding: 8px;}
                    tr:nth-child(even) {background-color: #dddddd;}
                    .options { margin-bottom: 20px; font-size: 26px; font-weight: bold; }
                    .options a { text-decoration: underline; color: #333; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Escola de Música 🎶</h1>
                    <div class="options">
                        <a href="/">🏠</a> | <a href="/students">Alunos 👨‍🎓</a> | <a href="/courses">Cursos 🎓</a> | <a href="/instruments">Instrumentos 🎷</a>
                    </div>
                    <div class="section">
                        <h2>Instrumento</h2>
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>Designação</th>
                            </tr>
                            <tr>
                                <td>${instrument.id}</td>
                                <td>${instrument['#text']}</td>
                            </tr>
                        </table>
                        <h2>Estudantes que tocam este instrumento</h2>
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Data de Nascimento</th>
                                <th>Curso</th>
                            </tr>
                            ${studentsWithInstrument.map(student => `
                                <tr>
                                    <td>
                                        <a href="/students/${student.id}">${student.id}</a>
                                    </td>
                                    <td>${student.nome}</td>
                                    <td>${student.dataNasc}</td>
                                    <td>
                                        <a href="/courses/${student.curso}">${student.curso}</a>
                                    </td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                </div>
            </body>
        </html>
        `
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    } else if (req.url.startsWith('/instruments') && req.method === 'GET') {
        const instruments = await axios.get(INSTRUMENTS_URL).then(res => res.data);

        let html = `
        <html>
            <meta charset="UTF-8">
            <head>
                <title>Escola de Música</title>
                <style>
                    body { font-family: Space Grotesk, sans-serif; margin: 20px; }
                    h1 { color: #333; }
                    .container { max-width: 1000px; margin: auto; }
                    .section { margin-bottom: 20px; }
                    .title { font-weight: bold; }
                    td, th {border: 1px solid #dddddd; text-align: left; padding: 8px;}
                    tr:nth-child(even) {background-color: #dddddd;}
                    .options { margin-bottom: 20px; font-size: 26px; font-weight: bold; }
                    .options a { text-decoration: underline; color: #333; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Escola de Música 🎶</h1>
                    <div class="options">
                        <a href="/">🏠</a> | <a href="/students">Alunos 👨‍🎓</a> | <a href="/courses">Cursos 🎓</a>
                    </div>
                    <div class="section">
                        <h2>Instrumentos</h2>
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>Designação</th>
                            </tr>
                        ${instruments.map(instrument => `
                            <tr>
                                <td>
                                    <a href="/instruments/${instrument.id}">${instrument.id}</a>
                                </td>
                                <td>${instrument['#text']}</td>
                            </tr>
                        `).join('')}
                        </table>
                    </div>
                </div>
            </body>
        </html>
        `
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404</h1>');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});