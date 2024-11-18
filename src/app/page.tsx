import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { Receita } from '../components/Receita';
import api from '../components/api';

interface HomeProps {
  receitas: Receita[];
}

const Home: React.FC<HomeProps> = ({ receitas }) => {
  return (
    <div>
      <h1>Receitas</h1>
      <ul>
        {receitas.map((receita) => (
          <li key={receita.id}>
            <Link href={`/receita/${receita.id}`}>
              <a>{receita.nome}</a>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/nova-receita">
        <button>Nova Receita</button>
      </Link>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await api.get('/Receita');
    return {
      props: {
        receitas: response.data,
      },
    };
  } catch (error) {
    console.error('Erro ao buscar receitas:', error);
    return {
      props: {
        receitas: [],
      },
    };
  }
};

export default Home;

