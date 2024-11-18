// app/page.tsx
import api from '../components/api';

interface Receita {
  id: string;
  nome: string;
  tipo: string;
  qtd_pessoas: number;
  dificuldade: string;
  ingredientes: string[];
  etapas: number;
}

const Home = async () => {
  // Declara o tipo esperado na resposta da API
  const response = await api.get<Receita[]>('/Receita');
  const receitas: Receita[] = response.data;

  return (
    <div>
      <h1>Lista de Receitas</h1>
      <ul>
        {receitas.map((receita) => (
          <li key={receita.id}>
            <a href={`/Receita/${receita.id}`}>{receita.nome}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
