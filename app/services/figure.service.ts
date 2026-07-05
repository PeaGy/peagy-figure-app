import axiosInstance from "../utils/axios";

export interface Figure {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
}

const figureService = {
  getAll: async () => (await axiosInstance.get<Figure[]>("/figure")).data,
  getById: async (id: string) => (await axiosInstance.get<Figure>(`/figure/${id}`)).data,
  create: async (data: any) => (await axiosInstance.post("/figure", data)).data,
  update: async (id: string, data: any) => (await axiosInstance.put(`/figure/${id}`, data)).data,
  delete: async (id: string) => (await axiosInstance.delete(`/figure/${id}`)).data,
};

export default figureService;