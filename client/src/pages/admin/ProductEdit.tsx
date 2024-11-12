import { Controller, useForm } from "react-hook-form";
import { categories } from "../../constants";
import ImageDragAndDrop from "../../components/shared/inputs/ImageDragAndDrop";
import useUploadImage from "../../hooks/useUploadImage";
import { app } from "../../firebase";
import { useEffect, useState } from "react";
import MultipleFilePickerReactDropzone from "../../components/shared/inputs/MultipleImageDragAndDrop";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProduct, updateProduct } from "../../services/products";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { useNavigate, useParams } from "react-router-dom";
import { ProductType } from "../../types/product";

type FormData = {
  name: string;
  price: number;
  category: string;
  image: FileList;
  images: FileList;
};

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
  } = useForm<FormData>();

  const { data: product } = useQuery<ProductType>({
    queryKey: ["product", id],
    queryFn: () =>
      getProduct(id as string)?.then((res) => res?.data?.data?.product),
    enabled: !!id,
  });

  useEffect(() => {
    if (product) {
      setValue("name", product?.name);
      setValue("price", product?.price);
      setValue("category", product?.category);
      setUploadedImageUrls(product?.images);
    }
  }, [product, setValue]);

  const { uploadImage, imageFileUploadError, imgUrl, imageFileUploading } =
    useUploadImage(app);

  const {
    uploadImage: uploadMultipleImage,
    imgUrl: multipleImgUrls,
    imageFileUploadError: multipleImageFileUploadError,
    imageFileUploading: multipleImageFileUploading,
  } = useUploadImage(app);

  const { mutate: editProductMutate, isPending: editProductPending } =
    useMutation({
      mutationFn: updateProduct,
      onSuccess: () => {
        toast.success("Product created successfully");
        setTimeout(() => {
          navigate("/admin/products");
        }, 1000);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
      },
    });

  useEffect(() => {
    if (multipleImgUrls) {
      setUploadedImageUrls((prev) => [...prev, multipleImgUrls]);
    }
  }, [multipleImgUrls]);

  const submitHandler = (data: any) => {
    const requestData = {
      ...data,
      image: imgUrl || product?.image,
      images: uploadedImageUrls,
    };
    editProductMutate({ data: requestData, id: id as string });
  };

  return (
    <div>
      <h1 className="text-xl font-medium">Edit Product</h1>
      <form onSubmit={handleSubmit(submitHandler)} className="mt-8 max-w-2xl ">
        <div className="mb-4">
          <label className="mb-1 block">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="block w-full rounded border border-gray-300 focus:ring-0 focus:border-primary outline-none"
            type="text"
          />
          <p className="text-sm text-red-500 mt-1">{errors?.name?.message}</p>
        </div>

        <div className="mb-4">
          <label className="mb-1 block">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full rounded border border-gray-300 focus:ring-0 focus:border-primary outline-none"
          >
            <option value="">Select Category</option>
            {categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <p className="text-sm text-red-500 mt-1">
            {errors?.category?.message}
          </p>
        </div>

        <div className="mb-4">
          <label className="mb-1 block">Price</label>
          <input
            {...register("price", { required: "Price is required" })}
            className="block w-full rounded border border-gray-300 focus:ring-0 focus:border-primary outline-none"
            type="number"
          />
          <p className="text-sm text-red-500 mt-1">{errors?.price?.message}</p>
        </div>

        <Controller
          name="image"
          control={control}
          rules={
            {
              // required: "Image is required",
            }
          }
          render={({ field }) => (
            <div className="mb-4">
              <label className="mb-1 block">Main Image</label>
              <ImageDragAndDrop
                control={field as any}
                imgUrl={imgUrl || product?.image}
                imageFileUploading={imageFileUploading}
                imageFileUploadError={imageFileUploadError}
                validationError={(errors?.image?.message as string) || ""}
                uploadImage={uploadImage}
              />
            </div>
          )}
        />

        <Controller
          name="images"
          control={control}
          rules={
            {
              // required: "Image is required",
            }
          }
          render={({ field }) => (
            <div className="mb-4">
              <label className="mb-1 block">Other images</label>
              <MultipleFilePickerReactDropzone
                control={field as any}
                uploadImage={uploadMultipleImage}
                imageFileUploadError={multipleImageFileUploadError}
                imageFileUploading={multipleImageFileUploading}
                imgUrls={uploadedImageUrls}
                validationError={(errors?.images?.message as string) || ""}
                setError={setError}
                setImgUrls={setUploadedImageUrls}
              />
            </div>
          )}
        />
        <button className="bg-primary py-2 px-4 rounded text-white w-full mt-10 font-bold flex justify-center min-h-10">
          {editProductPending ? <LoadingSpinner /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
