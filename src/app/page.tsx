// app/page.tsx
import Link from 'next/link';
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
  const response = await api.get<Receita[]>('/Receita');
  const receitas: Receita[] = response.data;

  return (
    <div>
      <h1>Lista de Receitas</h1>
      <Link href="/Receita/nova">
        <button style={{ marginBottom: '20px', padding: '10px 20px' }}>Adicionar Nova Receita</button>
      </Link>
      <ul>
        {receitas.map((receita) => (
          <li key={receita.id}>
            <Link href={`/Receita/${receita.id}`}>{receita.nome}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
