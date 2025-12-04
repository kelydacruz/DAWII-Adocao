import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from './routes/route.js'; 
import AbrigoRoutes from './routes/AbrigoRoutes.js'; 
import AnimalRoutes from './routes/AnimalRoutes.js';
import AdotanteRoutes from './routes/AdotanteRoutes.js';
import AdocaoRoutes from './routes/AdocaoRoutes.js';
// Importa a nova rota
import ClienteRoutes from './routes/ClienteRoutes.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Configura caminhos
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, '/public')));
app.set('views', join(__dirname, '/views'));

// Rotas Administrativas
app.use(AbrigoRoutes);
app.use(AnimalRoutes);
app.use(AdotanteRoutes);
app.use(AdocaoRoutes);

// Rota Pública (O Site Bonito)
app.use('/cliente', ClienteRoutes);

// Rotas Gerais
app.use(routes);

app.listen(3001, () => {
    console.log('Servidor rodando em http://localhost:3001');
    console.log('Área Cliente: http://localhost:3001/cliente');
});

export default app;