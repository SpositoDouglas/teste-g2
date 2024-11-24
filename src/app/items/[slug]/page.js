"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import api, { getReceitaById } from "@/components/api";

export default function EditReceita() {
  const params = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: "",
    tipo: "",
    ingredientes: "",
    dificuldade: "",
    qtd_pessoas: 1,
    etapas: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  
  useEffect(() => {
    const loadReceita = async () => {
      try {
        const data = await getReceitaById(params.slug);
        setFormData({
          nome: data.nome || "",
          tipo: data.tipo || "",
          ingredientes: data.ingredientes.join(", ") || "", 
          dificuldade: data.dificuldade || "",
          qtd_pessoas: data.qtd_pessoas || 1,
          etapas: data.etapas || "", 
        });
      } catch (error) {
        console.error("Erro ao carregar a receita:", error);
      }
    };

    loadReceita();
  }, [params.slug]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "qtd_pessoas" ? parseInt(value) || 1 : value, 
    }));
  };

  
  const handleUpdate = async () => {
    try {
      const updatedData = {
        ...formData,
        ingredientes: formData.ingredientes
          .split(",")
          .map((ing) => ing.trim())
          .filter((ing) => ing !== ""), 
      };

      await api.put(`/${params.slug}`, updatedData);
      router.push("/"); 
    } catch (error) {
      console.error("Erro ao atualizar a receita:", error);
    }
  };

  if (!formData.nome) return <p>Carregando...</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Editar Receita</h1>

      {/* Formulário de Edição */}
      <div className="mt-4">
        {/* Nome */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Nome da Receita:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
          />
        </div>

        {/* Tipo */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Tipo:</label>
          <input
            type="text"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
          />
        </div>

        {/* Ingredientes */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Ingredientes (separados por vírgulas):</label>
          <textarea
            name="ingredientes"
            value={formData.ingredientes}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
          />
        </div>

        {/* Dificuldade */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Dificuldade:</label>
          <input
            type="text"
            name="dificuldade"
            value={formData.dificuldade}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
          />
        </div>

        {/* Quantidade de Pessoas */}
        <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Quantidade de Pessoas:</label>
        <input
        type="number"
        name="qtd_pessoas"
        value={formData.qtd_pessoas}
        onChange={(e) => {
        const value = e.target.value;
        setFormData((prev) => ({
          ...prev,
          qtd_pessoas: value === "" ? "" : parseInt(value, 10),
        }));
      }}
      className="w-full p-2 border rounded text-black"
      />
      {formData.qtd_pessoas < 1 && (
      <p className="text-red-500 text-sm mt-1">
        A quantidade de pessoas deve ser pelo menos 1. Considere ajustar!
      </p>
      )}
      </div>

        {/* Etapas */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Etapas (Passo a Passo):</label>
          <textarea
            name="etapas"
            value={formData.etapas}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
          />
        </div>

        {/* Botões */}
        <div className="flex gap-4">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Salvar
          </button>
          <button
            onClick={() => router.push("/")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
