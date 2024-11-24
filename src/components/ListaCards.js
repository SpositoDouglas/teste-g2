"use client";
import { useEffect, useState } from "react";
import CardItem from "./CardItem";
import { Card } from "flowbite-react";
import { getReceitas } from "./api"; 
import Link from "next/link";

export default function ListaCards() {
  const [items, setItems] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReceitas = async () => {
      try {
        const data = await getReceitas(); 
        setItems(data);
      } catch (error) {
        console.error("Erro ao buscar receitas:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReceitas();
  }, []);

  return (
    <div className="bg-[#1E1E1E]">
      <div className="container flex-col mx-auto flex justify-center align-middle items-center gap-10 p-10">
        <Card className="h-[4rem] mx-5 border-none bg-[#83272c] text-2xl font-bold text-[#EFE1CE] drop-shadow-2xl">
          <div className="p-[80px] flex justify-center align-middle items-center">
            GALERIA
          </div>
        </Card>

        {isLoading ? (
          <p className="text-xl font-bold text-[#EFE1CE]">Carregando receitas...</p>
        ) : items.length === 0 ? (
          <p className="text-2xl font-extrabold tracking-tight text-[#292929]">
            Nenhum item foi encontrado
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {items.map((item) => (
              <CardItem key={item.id} item={item}></CardItem>
            ))}
          </div>
        )}
        
        <div className="mt-4">
        <Link href="/items/novo">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Adicionar Nova Receita
          </button>
        </Link>
  
        </div>
      </div>
    </div>
  );
}
