import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pagination, Table } from "flowbite-react";
import { deleteProduct, getProducts } from "../../services/products";
import { ProductType } from "../../types/product";
import { textTrimmer } from "../../helpers/stringFuntions";
import { Link, useSearchParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { categories } from "../../constants";
import { queryBuilder } from "../../helpers/queryBuilder";
import { AnimatePresence } from "framer-motion";
import ModalWrapper from "../../components/ui/modals/ModalWrapper";
import DeleteModalContent from "../../components/ui/modals/DeleteModalContent";
import toast from "react-hot-toast";

const Products = () => {
  const queryClient = useQueryClient();
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [categoryInputValue, setCategoryInputValue] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();

  const [chosenItem, setChosenItem] = useState<ProductType | null>(null);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const queryString = queryBuilder(searchParams, 9, ["name", "category"]);

  const { data, isLoading } = useQuery({
    queryKey: ["products", queryString],
    queryFn: () => getProducts(queryString)?.then((res) => res.data),
  });

  const products = data?.data?.products;
  const totalPages = data?.totalPages;

  const { mutate: deleteMutate, isPending: deleteIsLoading } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product deleted successfully");
      setDeleteModalIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["products", queryString] });
    },
    onError: () => {
      toast.error("Something went wrong");
      setDeleteModalIsOpen(false);
    },
  });
  return (
    <>
      <AnimatePresence>
        {deleteModalIsOpen && chosenItem && (
          <ModalWrapper setModalOpen={() => setDeleteModalIsOpen(false)}>
            <DeleteModalContent
              chosenItemName={chosenItem?.name}
              setDeleteModalIsOpen={setDeleteModalIsOpen}
              deleteMutation={() => deleteMutate(chosenItem?._id)}
              isLoading={deleteIsLoading}
            />
          </ModalWrapper>
        )}
      </AnimatePresence>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium">Products</h1>
          <Link
            to="/admin/products/create"
            className="bg-primary text-white px-5 py-2 rounded font-medium"
          >
            Create
          </Link>
        </div>

        <div className="mt-6 flex  flex-col gap-3 md:flex-row bg-red-5">
          <div className="flex flex-col sm:flex-row gap-3 max-w-[600px] w-full">
            <input
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
              type="text"
              className="focus:ring-0 focus:border-primary px-2 py-1 rounded text-sm border border-gray-300 w-full sm:w-1/2 "
              placeholder="Search for products..."
            />

            <select
              className="focus:ring-0 w-full sm:w-1/2   focus:border-primary px-2 py-1 rounded text-sm border border-gray-300 "
              name=""
              id=""
              onChange={(e) => setCategoryInputValue(e.target.value)}
              value={categoryInputValue}
            >
              <option value="">Select Category</option>
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() =>
                setSearchParams({
                  search: searchInputValue,
                  category: categoryInputValue,
                  page: "1",
                })
              }
              className="bg-primary-tint text-white px-5 py-1 text-sm rounded font-medium"
            >
              Filter
            </button>
            <button
              onClick={() => {
                setSearchParams({
                  search: "",
                  category: "",
                  page: "1",
                });
                setSearchInputValue("");
                setCategoryInputValue("");
              }}
              className="bg-gray-400 text-white px-5 py-1 text-sm rounded font-medium"
            >
              Reset
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="mt-10 flex justify-center">
            <LoadingSpinner />
          </div>
        )}

        {products?.length ? (
          <div className="overflow-x-auto mt-10">
            <Table striped>
              <Table.Head>
                <Table.HeadCell>ID</Table.HeadCell>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y">
                {data?.data?.products?.map(
                  (product: ProductType, index: number) => (
                    <Table.Row key={index}>
                      <Table.Cell className="whitespace-nowrap">
                        {product._id}
                      </Table.Cell>
                      <Table.Cell>
                        <img
                          className="h-12 w-12 object-cover rounded"
                          src={product.image}
                        />
                      </Table.Cell>
                      <Table.Cell>{textTrimmer(product.name, 30)}</Table.Cell>

                      <Table.Cell>{product.category}</Table.Cell>
                      <Table.Cell className="flex gap-3">
                        <Link
                          to={`/admin/products/edit/${product?._id}`}
                          className="font-medium text-cyan-600 hover:underline border border-cyan-600 p-2 rounded-full"
                        >
                          <MdEdit />
                        </Link>
                        <button
                          onClick={() => {
                            setChosenItem(product);
                            setDeleteModalIsOpen(true);
                          }}
                          className="text-red-700 font-medium border border-red-700 p-2 rounded-full"
                        >
                          <FaTrashAlt />
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  )
                )}
              </Table.Body>
            </Table>
          </div>
        ) : (
          !isLoading && (
            <div className="mt-10 flex justify-center">
              <p>No products found</p>
            </div>
          )
        )}

        {totalPages > 1 ? (
          <Pagination
            layout="pagination"
            currentPage={parseInt(searchParams.get("page") || "1", 10)}
            totalPages={totalPages}
            onPageChange={(e) =>
              setSearchParams((prev) => {
                prev.set("page", e.toString());
                return prev;
              })
            }
            previousLabel=""
            nextLabel=""
            showIcons
            className="my-8"
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Products;
