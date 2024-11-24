import { useState } from "react";
import { Card, Badge } from "flowbite-react";
import { useRouter } from "next/navigation";
import api from "./api";

export default function CardItem({ item }) {
  const [expanded, setExpanded] = useState(false); 
  const router = useRouter();

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja excluir esta receita?")) {
      await api.delete(`/${item.id}`);
      router.refresh(); 
    }
  };

  const navigateToEdit = () => {
    router.push(`/items/${item.id}`); 
  };

  return (
    <div className="mb-4">
        <Badge className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{item.dificuldade}</Badge>
      <Card onClick={toggleExpand} className="cursor-pointer">
        <h3 className="text-2xl font-bold">{item.nome}</h3>
        <p className="text-md text-gray-600">{item.tipo}</p>
        <p className="text-md text-gray-600">Serve {item.qtd_pessoas} pessoas</p>
      </Card>
      {expanded && (
        <div className="p-4 bg-gray-100 dark:bg-gray-700">
          <h4 className="font-bold text-lg">Ingredientes:</h4>
          {item.ingredientes.length > 0 ? (
            <ul className="list-disc pl-5">
              {item.ingredientes.map((ingrediente, index) => (
                <li key={index}>{ingrediente}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Nenhum ingrediente informado.</p>
          )}
          <h5 className="font-bold text-lg">Etapas:</h5>
          <div className="whitespace-pre-line">{item.etapas}</div>
          {/* Botões visíveis apenas quando a receita é expandida */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={navigateToEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Editar
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Excluir
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
}
