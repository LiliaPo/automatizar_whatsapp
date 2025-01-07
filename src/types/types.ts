export interface MensajeRequest {
  destinatario: string;
  mensaje: string;
}

export interface TemplateRequest {
  destinatario: string;
  template: string;
  variables: string[];
}

export interface ApiResponse {
  exito: boolean;
  mensajeId?: string;
  error?: string;
} 