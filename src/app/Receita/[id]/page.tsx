'use client';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../components/api';

interface Receita {
  id: string;
  nome: string;
  tipo: string;
  qtd_pessoas: number;
  dificuldade: string;
  ingredientes: string[];
  etapas: number;
}

interface Props {
  params: { id: string };
}

const ReceitaDetalhes = async ({ params }: Props) => {
  const Resolved = use(params);
  const { id } = Resolved;

  const router = useRouter();

  // Buscar a receita pelo ID
  const response = await api.get<Receita>(`/Receita/${id}`);
  const receita = response.data;

  const handleExcluir = async () => {
    try {
      await api.delete(`/Receita/${id}`);
      router.push('/');
    } catch (error) {
      console.error('Erro ao excluir receita:', error);
    }
  };

  return (
    <div>
      <h1>{receita.nome}</h1>
      <p><strong>Tipo:</strong> {receita.tipo}</p>
      <p><strong>Serve:</strong> {receita.qtd_pessoas} pessoas</p>
      <p><strong>Dificuldade:</strong> {receita.dificuldade}</p>
      <p><strong>Ingredientes:</strong> {receita.ingredientes.join(', ')}</p>
      <p><strong>Etapas:</strong> {receita.etapas}</p>

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => router.push(`/Receita/${id}/editar`)}
          style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#0070f3', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Editar Receita
        </button>
        <button
          onClick={handleExcluir}
          style={{ padding: '10px 20px', backgroundColor: '#ff4d4d', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Excluir Receita
        </button>
      </div>
    </div>
  );
};

export default ReceitaDetalhes;
