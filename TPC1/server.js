const http = require('http');
const axios = require('axios');

const PORT = 5000;
const CLIENTS_URL = 'http://localhost:3000/clients';
const VEHICLES_URL = 'http://localhost:3000/vehicles';
const OPERATIONS_URL = 'http://localhost:3000/operations';

const server = http.createServer(async (req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        try {
            const [clientsRes, vehiclesRes, operationsRes] = await Promise.all([
                axios.get(CLIENTS_URL),
                axios.get(VEHICLES_URL),
                axios.get(OPERATIONS_URL)
            ]);

            const clients = clientsRes.data;
            const vehicles = vehiclesRes.data;
            const operations = operationsRes.data;
            
            let html = `
            <html>
                <meta charset="UTF-8">
                <head>
                    <title>Oficina</title>
                    <style>
                        body { font-family: Space Grotesk, sans-serif; margin: 25px; }
                        h1 { color: #333; }
                        .container { max-width: 1000px; margin: auto; }
                        .section { margin-bottom: 50px; padding: 15px; border: 5px solid #ccc; border-radius: 10px; }
                        .title { font-weight: bold; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Oficina</h1>
                        <div class="section">
                            <h2>Clientes</h2>
                            ${clients.map(client => `
                                <div style="display: flex; flex-direction: column; gap: 5px;">
                                    <a class="title" style="margin-bottom: 5px;" href="client/${client.nif}">${client.name} (NIF: ${client.nif})</a>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </body>
            </html>
            `;

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h1>Erro a comunicar com o json-server</h1>');
        }
    } else if (req.url.startsWith('/client/') && req.method === 'GET') {
        const nif = req.url.split('/')[2];
        try {
            const [clientRes, vehiclesRes, operationsRes] = await Promise.all([
                axios.get(`${CLIENTS_URL}?nif=${nif}`),
                axios.get(VEHICLES_URL),
                axios.get(OPERATIONS_URL)
            ]);

            const client = clientRes.data[0];
            const vehicles = vehiclesRes.data.filter(vehicle => vehicle.owners.includes(Number(nif)));
            const operations = operationsRes.data;
            
            if (!client) {
                res.writeHead(404);
                res.end('<h1>Cliente não encontrado!</h1>');
                return;
            }
            
            let html = `
                <html>
                <head>
                    <title>${client.name}</title>
                    <meta charset="UTF-8">
                    <style>
                        body { font-family: Space Grotesk, sans-serif; margin: 25px; }
                        h1 { color: #333; }
                        .container { max-width: 750px; margin: auto; }
                        .section { padding: 15px; border: 3px solid #ccc;}
                        .title { font-weight: bold; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>${client.name}</h1>
                        <div class="section">
                            <p class="title">NIF: ${client.nif}</p>
                        </div>
                        <div class="section">
                            <h2>Veículos</h2>
                            ${vehicles.map(vehicle => `
                                <div>
                                    <p class="title">${vehicle.brand} ${vehicle.model} (${vehicle.license_plate})</p>
                                </div>
                            `).join('')}
                        </div>
                        <div class="section">
                            <h2>Histórico</h2>
                            <ul>
                                ${client.repair_history.map(repair => `
                                    <li>
                                        <p>Data: ${repair.date}, Matrícula: ${repair.vehicle}</p>
                                        <ul style="display: flex; flex-direction: column; gap: 5px;">
                                            ${repair.interventions.map(interventionCode => {
                                                const intervention = operations.find(op => op.code === interventionCode);
                                                return `<li>${intervention ? intervention.name + ': ' + intervention.description : interventionCode}</li>`;
                                            }).join('')}
                                        </ul>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </body>
                </html>
            `;

            res.writeHead(200);
            res.end(html);
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h1>Erro a gerar página</h1>');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Rota não encontrada</h1>');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});