// src/components/Mensagem.jsx
import React from 'react';
import styled from 'styled-components';
import { FaWhatsapp } from 'react-icons/fa';

const Box = styled.div`
  text-align: center;
  padding: 20px 16px;
`;

const Titulo = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: ${({ tipo }) =>
    tipo === 'ok' ? '#007a1e' :
    tipo === 'erro' ? '#c0392b' :
    '#b48800'};
  margin-bottom: 12px;
`;

const Texto = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  white-space: pre-line;
`;

const BotaoWhatsapp = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #25D366;
  color: white;
  font-weight: bold;
  padding: 12px 20px;
  border-radius: 12px;
  text-decoration: none;
  margin-top: 18px;
  font-size: 16px;
  transition: background 0.3s;

  &:hover {
    background-color: #1ebe5d;
  }
`;

function Mensagem({ texto, tipo = 'info', whatsapp }) {
  const linhas = texto.split('\n');

  return (
    <Box>
      <Titulo tipo={tipo}>{linhas[0]}</Titulo>
      <Texto>{linhas.slice(1).join('\n')}</Texto>

      {whatsapp && (
        <BotaoWhatsapp href={whatsapp} target="_blank" rel="noopener noreferrer">
          <FaWhatsapp size={20} />
          WhatsApp
        </BotaoWhatsapp>
      )}
    </Box>
  );
}

export default Mensagem;
