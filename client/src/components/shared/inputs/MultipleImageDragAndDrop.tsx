import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { AiOutlineUpload } from "react-icons/ai";

const MultipleFilePickerReactDropzone = ({
  control,
  imageFileUploading,
  imageFileUploadError,
  validationError,
  uploadImage,
  imgUrls,
  setError,
}: {
  control: ControllerRenderProps<FieldValues, string>;
  imgUrls?: string[];
  uploadImage: (imageFile: File) => Promise<void>;
  validationError?: string;
  imageFileUploading: boolean;
  imageFileUploadError: string | null;
  setError: any;
}) => {
  // const [imgPreviews, setImgPreviews] = useState<string[]>([]); // Use array for multiple previews

  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      onChange: ControllerRenderProps<FieldValues, string>["onChange"]
    ) => {
      // const newImgPreviews = acceptedFiles.map((file) =>
      //   URL.createObjectURL(file)
      // );

      const currentFiles = control.value || [];

      if (
        currentFiles.length >= 3 ||
        acceptedFiles.length + currentFiles.length > 3
      ) {
        setError("images", {
          type: "custom",
          message: "Maximum 3 images allowed",
        });
        return; // Stop further processing
      }

      const allFiles = [...currentFiles, ...acceptedFiles];

      onChange(allFiles);

      acceptedFiles.forEach(async (file) => await uploadImage(file));

      // setImgPreviews((prev) => [...prev, ...newImgPreviews]); // Append new previews
    },
    [control, uploadImage, setError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, control.onChange),
    multiple: true,
    // onDropAccepted(files) {
    //   if (files.length > 3)
    //     return setError("images", {
    //       type: "custom",
    //       message: "Maximum 3 images allowed",
    //     });
    //   files.forEach(async (file) => await uploadImage(file));
    // },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="flex min-h-[232px] cursor-pointer flex-col items-center gap-3 rounded-md border !border-dashed !border-gray-300 bg-white p-5 hover:!border-primary dark:!border-strokedark dark:bg-graydark dark:hover:!border-primary "
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop files here...</p>
        ) : (
          <>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <AiOutlineUpload className="text-3xl" />
            </div>

            <label className="cursor-pointer font-medium">
              Drop files here to upload
            </label>
            <div className="flex flex-wrap gap-2">
              {imgUrls?.map((url, index) => (
                <img
                  key={index}
                  className="h-16 w-20 rounded object-cover"
                  src={url}
                  alt={`preview-${index}`}
                />
              ))}
            </div>
            {imageFileUploading && <LoadingSpinner />}
            <p className="text-red-500">{imageFileUploadError}</p>
          </>
        )}
      </div>
      <p className="text-red-500 mt-1">{validationError}</p>
    </div>
  );
};

export default MultipleFilePickerReactDropzone;
