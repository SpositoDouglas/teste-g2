// app/Receita/[id]/page.tsx
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
  params: { id: string }; // Parâmetro dinâmico da rota
}

const ReceitaPage = async ({ params }: Props) => {
  const { id } = params;

  // Declara o tipo esperado na resposta da API
  const response = await api.get<Receita>(`/Receita/${id}`);
  const receita: Receita = response.data;

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
      <h2>Etapas:</h2>
      <p>{receita.etapas}</p>
    </div>
  );
};

export default ReceitaPage;
