'use client';
import { useState } from 'react';
import api from '../../../components/api';
import { useRouter } from 'next/navigation';

const NovaReceita = () => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [qtdPessoas, setQtdPessoas] = useState(1);
  const [dificuldade, setDificuldade] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [etapas, setEtapas] = useState(0);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/Receita', {
        nome,
        tipo,
        qtd_pessoas: qtdPessoas,
        dificuldade,
        ingredientes: ingredientes.split(','),
        etapas,
      });
      router.push('/'); // Redireciona para a página inicial
    } catch (error) {
      console.error('Erro ao adicionar receita:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input value={nome} onChange={(e) => setNome(e.target.value)} required />
      </div>
      <div>
        <label>Tipo:</label>
        <input value={tipo} onChange={(e) => setTipo(e.target.value)} required />
      </div>
      <div>
        <label>Quantidade de Pessoas:</label>
        <input
          type="number"
          value={qtdPessoas}
          onChange={(e) => setQtdPessoas(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Dificuldade:</label>
        <input
          value={dificuldade}
          onChange={(e) => setDificuldade(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Ingredientes (separados por vírgula):</label>
        <input
          value={ingredientes}
          onChange={(e) => setIngredientes(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Etapas:</label>
        <input
          type="number"
          value={etapas}
          onChange={(e) => setEtapas(Number(e.target.value))}
          required
        />
      </div>
      <button type="submit">Adicionar Receita</button>
    </form>
  );
};

export default NovaReceita;
