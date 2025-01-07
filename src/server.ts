import express from 'express';
import cors from 'cors';
import { config } from './config/config';
import whatsappRoutes from './routes/whatsappRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Ruta raíz para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.json({ message: 'Servidor funcionando correctamente' });
});

app.use('/api/whatsapp', whatsappRoutes);

const PORT = config.port || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en: http://localhost:${PORT}`);
  console.log(`📱 API WhatsApp disponible en: http://localhost:${PORT}/api/whatsapp`);
}); 