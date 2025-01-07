import { Router, Request, Response } from 'express';
import { WhatsAppController } from '../controllers/whatsappController';

const router = Router();
const controller = new WhatsAppController();

// Ruta de prueba para verificar que el servidor funciona
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'WhatsApp API funcionando correctamente' });
});

router.post('/enviar', async (req: Request, res: Response) => {
  await controller.enviarMensaje(req, res);
});

router.post('/enviar-template', async (req: Request, res: Response) => {
  await controller.enviarMensajeTemplate(req, res);
});

export default router; 