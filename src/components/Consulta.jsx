// src/components/Consulta.jsx
import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  padding: 14px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  outline: none;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    padding: 12px;
    font-size: 14px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  background-color: #0071e3;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:hover {
    background-color: #005bbf;
  }

  @media (max-width: 480px) {
    padding: 12px;
    font-size: 15px;
  }
`;

const Consulta = ({ cpf, setCpf, consultar }) => {
  return (
    <>
      <Input
        type="text"
        placeholder="Digite o CPF (somente números)"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
      />
      <Button onClick={consultar}>Entrar</Button>
    </>
  );
};

export default Consulta;
