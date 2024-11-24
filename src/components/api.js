import axios from "axios";


const api = axios.create({
  baseURL: "https://673bc1fd96b8dcd5f3f75c80.mockapi.io/mockapi/Receita",
});

export default api;


export const getReceitas = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar receitas:", error);
    return [];
  }
};


export const getReceitaById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar a receita com ID ${id}:`, error);
    throw error;
  }
};


export const updateReceita = async (id, data) => {
  try {
    const response = await api.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar a receita com ID ${id}:`, error);
    throw error;
  }
};


export const createReceita = async (data) => {
  try {
    const response = await api.post("/", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar uma nova receita:", error);
    throw error;
  }
};


