import { Request, Response } from 'express';
import { whatsappService } from '../services/whatsappService';

export class WhatsAppController {
  async enviarMensaje(req: Request, res: Response) {
    const { destinatario, mensaje } = req.body;

    const resultado = await whatsappService.enviarMensaje({
      destinatario,
      mensaje
    });
    
    if (resultado.exito) {
      res.json(resultado);
    } else {
      res.status(500).json(resultado);
    }
  }

  async enviarMensajeTemplate(req: Request, res: Response) {
    const { destinatario, template, variables } = req.body;

    if (!destinatario || !template || !variables) {
      return res.status(400).json({
        error: 'Se requieren destinatario, template y variables'
      });
    }

    const resultado = await whatsappService.enviarTemplate({
      destinatario,
      template,
      variables
    });

    if (resultado.exito) {
      res.json(resultado);
    } else {
      res.status(500).json(resultado);
    }
  }
} 