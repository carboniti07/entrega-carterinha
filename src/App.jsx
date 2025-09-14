import React, { useState } from 'react';
import styled from 'styled-components';
import { FaWhatsapp } from 'react-icons/fa';
import Consulta from './components/Consulta';
import Mensagem from './components/Mensagem';
import FormularioEntrega from './components/FormularioEntrega';

const secretariosPorCongregacao = {
  "001 RUDGE RAMOS / SEDE": { nome: "Dca Regiane Muniz", whatsapp: "5511940039017" },
  "002 V LIVIERO": { nome: "Silvana Brayner", whatsapp: "5511981235714" },
  "004 JD DO LAGO": { nome: "Suenia Rosendo", whatsapp: "5511985319616" },
  "006 V IDEALOPOLIS": { nome: "Lorielly Silva", whatsapp: "5511949102051" },
  "007 JD ABC": { nome: "Adriana Vitorino", whatsapp: "5511973281992" },
  "008 V NOVA CONQUISTA": { nome: "Poliana Rodrigues", whatsapp: "5511986823775" },
  "010 V VERA": { nome: "Dca Joselia Kiche", whatsapp: "5511987071017" },
  "012 V ORIENTAL": { nome: "Ev Marcone Jardim", whatsapp: "5511949949021" },
  "014 JD ORION": { nome: "Izabelle Silva", whatsapp: "5511951342501" },
  "016 JD GONZAGA": { nome: "Thiago Silva", whatsapp: "5515996192467" },
  "017 JD EUROPA": { nome: "Jaqueline Barboza", whatsapp: "5515996023626" },
  "032 JD LAS PALMAS": { nome: "Raphaela", whatsapp: "5511977781282" },
  "034 FAZENDA VELHA": { nome: "Dca Geisiane Aires", whatsapp: "5515996152502" },
  "043 V BRASIL": { nome: "Ev Cleber Cavalheiro", whatsapp: "5515996393009" },
  "044 TORNINOS": { nome: "Dca Lais Lacerda", whatsapp: "5515997316558" },
  "050 PRQ BRISTOL": { nome: "Ev Rudney Santos", whatsapp: "5511932555017" },
  "055 JD INAMAR": { nome: "Aux Caroline Alcebiades", whatsapp: "5511952540010" },
  "057 V ARAPUA": { nome: "Sheila Souza", whatsapp: "5511982469640" },
  "061 V FLORIDA": { nome: "Noel De Souza", whatsapp: "5511916239231" },
  "062 JD IPE": { nome: "Dc Eduardo Araujo", whatsapp: "5511955819189" },
};

const Container = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 48px 40px;
  width: 500px;
  max-width: 980px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  @media (max-width: 480px) {
    width: 380px;
    padding: 32px 20px;
    gap: 20px;
  }
`;

const Logo = styled.img`
  width: 140px;
  margin-bottom: 12px;

  @media (max-width: 480px) {
    width: 110px;
  }
`;

const Titulo = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #005bbf;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const BotaoNovaConsulta = styled.button`
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

const BotaoWhatsapp = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #25d366;
  color: white;
  padding: 10px 20px;
  font-weight: 600;
  border-radius: 10px;
  text-decoration: none;
  margin-top: -8px;
  transition: background 0.3s;

  &:hover {
    background-color: #1ebe5b;
  }
`;

const NomeSecretario = styled.p`
  font-weight: bold;
  font-size: 16px;
  margin-top: -12px;
  color: #333;
`;

function App() {
  const [cpf, setCpf] = useState('');
  const [dados, setDados] = useState(null);
  const [mensagem, setMensagem] = useState(null);
  const [entregaFeita, setEntregaFeita] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState(null);
  const [secretarioNome, setSecretarioNome] = useState(null);

  const consultar = async () => {
    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
      alert('Digite um CPF válido com 11 dígitos.');
      return;
    }

    try {
      const res = await fetch(`https://backend-censo-p8hr.onrender.com/membro/${cpfLimpo}/verificar`);
      if (!res.ok) throw new Error('Erro ao consultar o backend');

      const pessoa = await res.json();
      setDados(pessoa);

      const nome = (pessoa.nome || '').split(' ')[0];
      const nomeCompleto = pessoa.nome || '';
      const matricula = pessoa.matricula || '---';
      const censo = pessoa.censo?.toUpperCase();
      const credencial = pessoa.credencial?.toUpperCase();
      const congregacao = pessoa.congregacao;

      const entregaRes = await fetch(`https://backend-carteirinhas.onrender.com/entregas/${cpfLimpo}`);
      if (entregaRes.ok) {
        const entrega = await entregaRes.json();
        if (entrega.entregue) {
          const [dia, mes, ano] = entrega.data.split(' ')[0].split('/');
          const dataFormatada = `${dia}/${mes}/${ano}`;
          setMensagem({
            texto: `⚠️ Este membro já retirou a carteirinha em ${dataFormatada}, entregue por ${entrega.responsavelEntrega} e retirada por ${entrega.responsavelRetirada}.`,
            tipo: 'entregue'
          });
          return;
        }
      }

      const secretario = secretariosPorCongregacao[congregacao];

      if (credencial === 'SIM' && censo === 'SIM') {
        setMensagem({
          texto: `✅ Matrícula: ${matricula} - ${nome}\nParabéns! Sua credencial foi emitida e a carteirinha está pronta para retirada.`,
          tipo: 'ok'
        });
      } else if (credencial !== 'SIM' && censo === 'SIM') {
        setMensagem({
          texto: `ℹ️ Matrícula: ${matricula} - ${nome}\nParabéns! Sua credencial foi emitida. Aguarde informações para retirada.`,
          tipo: 'info'
        });
      } else if (censo === 'ERRO') {
        const nomeSec = secretario?.nome || 'secretário responsável';
        setMensagem({
          texto: `⚠️ Matrícula: ${matricula} - ${nome}\nCenso efetuado. Falta dados, procure o seu secretário para regularização.`,
          tipo: 'erro'
        });
        setSecretarioNome(nomeSec);

        if (secretario?.whatsapp) {
          const texto = `A Paz do Senhor. Matrícula: ${matricula} - ${nomeCompleto}. Preciso atualizar meus dados.`;
          const url = `https://wa.me/${secretario.whatsapp}?text=${encodeURIComponent(texto)}`;
          setWhatsappLink(url);
        }
      } else {
        setMensagem({
          texto: `❌ Matrícula: ${matricula} - ${nome}\nAtualização não identificada! Por favor, preencha o censo.`,
          tipo: 'erro'
        });
      }

    } catch (err) {
      console.error(err);
      alert('Erro ao consultar o backend do censo.');
    }
  };

  const novaConsulta = () => {
    setCpf('');
    setMensagem(null);
    setDados(null);
    setEntregaFeita(false);
    setWhatsappLink(null);
    setSecretarioNome(null);
  };

  return (
    <Container>
      <Logo src="/Logo AD Bras Final.png" alt="Logo AD Brás" />
      {!dados && <Titulo>Digite seu CPF</Titulo>}

      {!dados && <Consulta cpf={cpf} setCpf={setCpf} consultar={consultar} />}
      {mensagem && <Mensagem texto={mensagem.texto} tipo={mensagem.tipo} />}
      {secretarioNome && <NomeSecretario>Secretário: {secretarioNome}</NomeSecretario>}
      {whatsappLink && (
        <BotaoWhatsapp href={whatsappLink} target="_blank">
          <FaWhatsapp size={20} />
          Falar com Secretário
        </BotaoWhatsapp>
      )}

      {dados && dados.censo === 'SIM' && dados.credencial === 'SIM' && !entregaFeita && !(mensagem?.tipo === 'entregue') && (
        <FormularioEntrega cpf={dados.cpf} onFinalizar={() => setEntregaFeita(true)} />
      )}

      {entregaFeita && <p style={{ color: 'green', marginTop: '16px' }}>Entrega registrada com sucesso.</p>}

      {(dados || mensagem) && (
        <BotaoNovaConsulta onClick={novaConsulta}>Nova Consulta</BotaoNovaConsulta>
      )}
    </Container>
  );
}

export default App;
