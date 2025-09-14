import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const Titulo = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 12px;

  &:focus {
    outline: none;
    border-color: #0071e3;
  }
`;

const Botao = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 15px;
  font-weight: 600;
  background-color: #0071e3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:hover {
    background-color: #005bbf;
  }
`;

const MensagemErro = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 8px;
  text-align: center;
`;

function FormularioEntrega({ cpf, onFinalizar }) {
  const [responsavelEntrega, setResponsavelEntrega] = useState('');
  const [responsavelRetirada, setResponsavelRetirada] = useState('');
  const [erro, setErro] = useState('');

 const formatarNome = (valor) => {
  return valor
    .replace(/[^a-zA-ZÀ-ÿ\s]/g, '') // só letras e espaço
    .toLowerCase()                  // tudo minúsculo
    .replace(/\b\w/g, (l) => l.toUpperCase()); // capitaliza cada palavra
};



 const handleInputChange = (setter) => (e) => {
  const valor = e.target.value;
  const formatado = formatarNome(valor);
  setter(formatado);
};



  const handleSubmit = async () => {
    if (!responsavelEntrega || !responsavelRetirada) {
      setErro('Por favor, preencha todos os campos antes de confirmar.');
      return;
    }

    try {
      const res = await fetch('https://backend-carteirinhas.onrender.com/entregas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cpf,
          responsavelEntrega,
          responsavelRetirada
        })
      });

      if (!res.ok) throw new Error('Erro ao registrar entrega');
      onFinalizar();
      setErro('');
    } catch (err) {
      console.error(err);
      setErro('Erro ao registrar entrega. Tente novamente.');
    }
  };

  return (
    <FormContainer>
      <Titulo>Registrar Entrega</Titulo>

      <Input
        type="text"
        placeholder="Responsável pela entrega"
        value={responsavelEntrega}
        onChange={handleInputChange(setResponsavelEntrega)}
      />

      <Input
        type="text"
        placeholder="Responsável pela retirada"
        value={responsavelRetirada}
        onChange={handleInputChange(setResponsavelRetirada)}
      />

      <Botao onClick={handleSubmit}>Confirmar Entrega</Botao>

      {erro && <MensagemErro>{erro}</MensagemErro>}
    </FormContainer>
  );
}

export default FormularioEntrega;
