import { instance } from "./axios";

// export const getProducts = async ({
//   page,
//   queryString,
// }: {
//   page?: string | number;
//   queryString?: string;
// }) => {
//   return instance.get(
//     `/products?page=${page ? page : ""}&limit=${page ? 9 : ""}${
//       queryString ? `&${queryString}` : ""
//     }`
//   );
// };

export const getProducts = async (queryString: string) => {
  return instance.get(`/products?${queryString}`);
};

export const createProduct = async (data: {
  name: string;
  price: number;
  category: string;
  image: string;
  images: string[];
}) => {
  return instance.post("/products", data);
};

export const getProduct = async (id: string) => {
  return instance.get(`/products/${id}`);
};

export const updateProduct = async ({
  data,
  id,
}: {
  data: {
    name: string;
    price: number;
    category: string;
    image: string;
    images: string[];
  };
  id: string;
}) => {
  return instance.put(`/products/${id}`, data);
};

export const deleteProduct = async (id: string) => {
  return instance.delete(`/products/${id}`);
};
