import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  TextField,
  Button,
  Paper,
  Box,
  Typography,
  Snackbar,
  Alert,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { whatsappService } from '../services/whatsappService';

export const TemplateForm: React.FC = () => {
  const [destinatario, setDestinatario] = useState('');
  const [template, setTemplate] = useState('');
  const [variables, setVariables] = useState(['']);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleAddVariable = () => {
    setVariables([...variables, '']);
  };

  const handleRemoveVariable = (index: number) => {
    setVariables(variables.filter((_, i) => i !== index));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    const { name, value } = e.target;
    if (name === 'destinatario') setDestinatario(value);
    if (name === 'template') setTemplate(value);
    if (typeof index === 'number') {
      const newVariables = [...variables];
      newVariables[index] = value;
      setVariables(newVariables);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const resultado = await whatsappService.enviarTemplate({
      destinatario,
      template,
      variables: variables.filter(v => v.trim() !== '')
    });

    setNotification({
      open: true,
      message: resultado.exito ? 'Template enviado con éxito' : resultado.error || 'Error al enviar template',
      severity: resultado.exito ? 'success' : 'error'
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Enviar Template de WhatsApp
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          name="destinatario"
          fullWidth
          label="Número de Teléfono"
          value={destinatario}
          onChange={handleChange}
          margin="normal"
          required
          placeholder="+5491122334455"
        />
        
        <TextField
          name="template"
          fullWidth
          label="Template"
          value={template}
          onChange={handleChange}
          margin="normal"
          required
          multiline
          rows={2}
          placeholder="Hola {0}, tu pedido {1} está en camino"
        />
        
        {variables.map((variable, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <TextField
              fullWidth
              label={`Variable ${index}`}
              value={variable}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, index)}
              required
            />
            {index > 0 && (
              <IconButton 
                color="error" 
                onClick={() => handleRemoveVariable(index)}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        ))}
        
        <Button
          startIcon={<AddIcon />}
          onClick={handleAddVariable}
          sx={{ mt: 2 }}
        >
          Agregar Variable
        </Button>
        
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth 
          sx={{ mt: 2 }}
        >
          Enviar Template
        </Button>
      </Box>

      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}; 