import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Receita } from '../../components/Receita';
import api from '../../components/api';

const DetalhesReceita: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [receita, setReceita] = useState<Receita | null>(null);

  useEffect(() => {
    if (id) {
      const fetchReceita = async () => {
        try {
          const response = await api.get<Receita>(`/Receita/${id}`);
          setReceita(response.data);
        } catch (error) {
          console.error('Erro ao buscar a receita:', error);
        }
      };

      fetchReceita();
    }
  }, [id]);

  if (!receita) return <p>Carregando...</p>;

  return (
    <div>
      <h1>{receita.nome}</h1>
      <p>Tipo: {receita.tipo}</p>
      <p>Serve: {receita.qtd_pessoas} pessoas</p>
      <p>Dificuldade: {receita.dificuldade}</p>
      <h2>Ingredientes:</h2>
      <ul>
        {receita.ingredientes.map((ingrediente, index) => (
          <li key={index}>{ingrediente}</li>
        ))}
      </ul>
      <h2>Etapas de Preparação:</h2>
      <p>{receita.etapas}</p>

      <button onClick={() => router.push('/')}>Voltar</button>
      <button
        onClick={async () => {
          if (confirm('Deseja excluir esta receita?')) {
            try {
              await api.delete(`/Receita/${id}`);
              router.push('/');
            } catch (error) {
              console.error('Erro ao deletar receita:', error);
            }
          }
        }}
      >
        Excluir Receita
      </button>
    </div>
  );
};

export default DetalhesReceita;
