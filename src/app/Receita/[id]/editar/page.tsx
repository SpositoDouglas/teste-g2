'use client';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../../components/api';

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

const EditarReceita = ({ params }: Props) => {
  const { id } = params;
  const [receita, setReceita] = useState<Receita | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchReceita = async () => {
      try {
        const response = await api.get<Receita>(`/Receita/${id}`);
        setReceita(response.data);
      } catch (error) {
        console.error('Erro ao buscar receita:', error);
      }
    };
    fetchReceita();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!receita) return;

    try {
      await api.put(`/Receita/${id}`, receita);
      router.push(`/Receita/${id}`); 
    } catch (error) {
      console.error('Erro ao editar receita:', error);
    }
  };

  if (!receita) return <p>Carregando...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Editar Receita</h1>
      <div>
        <label>Nome:</label>
        <input
          value={receita.nome}
          onChange={(e) => setReceita({ ...receita, nome: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Tipo:</label>
        <input
          value={receita.tipo}
          onChange={(e) => setReceita({ ...receita, tipo: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Quantidade de Pessoas:</label>
        <input
          type="number"
          value={receita.qtd_pessoas}
          onChange={(e) =>
            setReceita({ ...receita, qtd_pessoas: Number(e.target.value) })
          }
          required
        />
      </div>
      <div>
        <label>Dificuldade:</label>
        <input
          value={receita.dificuldade}
          onChange={(e) => setReceita({ ...receita, dificuldade: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Ingredientes (separados por vírgula):</label>
        <input
          value={receita.ingredientes.join(',')}
          onChange={(e) =>
            setReceita({ ...receita, ingredientes: e.target.value.split(',') })
          }
          required
        />
      </div>
      <div>
        <label>Etapas:</label>
        <input
          type="number"
          value={receita.etapas}
          onChange={(e) =>
            setReceita({ ...receita, etapas: Number(e.target.value) })
          }
          required
        />
      </div>
      <button type="submit">Salvar Alterações</button>
    </form>
  );
};

export default EditarReceita;
