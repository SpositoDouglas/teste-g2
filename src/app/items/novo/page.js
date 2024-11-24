"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createReceita } from "@/components/api";

export default function NovaReceita() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: "",
    tipo: "",
    ingredientes: "",
    dificuldade: "",
    qtd_pessoas: 1,
    etapas: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "qtd_pessoas" ? parseInt(value) || 1 : value, 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newData = {
        ...formData,
        ingredientes: formData.ingredientes
          .split(",")
          .map((ing) => ing.trim())
          .filter((ing) => ing !== ""), 
      };

      await createReceita(newData);
      router.push("/"); 
    } catch (error) {
      console.error("Erro ao adicionar a receita:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Adicionar Nova Receita</h1>

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

      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Ingredientes (separados por vírgula):</label>
        <textarea
          name="ingredientes"
          value={formData.ingredientes}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
        />
      </div>

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

      <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Etapas:</label>
            <input
              type="number"
              name="etapas"
              value={formData.etapas}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Salvar Receita
      </button>
    </div>
  );

}
