import axios from 'axios';
import { MensajeRequest, TemplateRequest, ApiResponse } from '../types/types';

const API_URL = 'http://localhost:3000/api/whatsapp';

export const whatsappService = {
  async enviarMensaje(data: MensajeRequest): Promise<ApiResponse> {
    try {
      const response = await axios.post(`${API_URL}/enviar`, data);
      return response.data;
    } catch (error) {
      return {
        exito: false,
        error: 'Error al enviar mensaje'
      };
    }
  },

  async enviarTemplate(data: TemplateRequest): Promise<ApiResponse> {
    try {
      const response = await axios.post(`${API_URL}/enviar-template`, data);
      return response.data;
    } catch (error) {
      return {
        exito: false,
        error: 'Error al enviar template'
      };
    }
  }
}; 