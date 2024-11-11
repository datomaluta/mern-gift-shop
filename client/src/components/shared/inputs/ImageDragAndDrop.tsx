import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { AiOutlineUpload } from "react-icons/ai";

const ImageDragAndDrop = ({
  control,
  imgUrl,
  imageFileUploading,
  imageFileUploadError,
  validationError,
  uploadImage,
}: {
  control: ControllerRenderProps<FieldValues, string>;
  imgUrl: string | null | undefined;
  imageFileUploading: boolean;
  imageFileUploadError: string | null;
  validationError: string;
  uploadImage: (imageFile: File) => Promise<void>;
}) => {
  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      onChange: ControllerRenderProps<FieldValues, string>["onChange"]
    ) => {
      onChange(acceptedFiles);
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, control.onChange),
    onDropAccepted: async (files) => {
      await uploadImage(files[0]);
    },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="flex min-h-[170px] cursor-pointer flex-col items-center gap-3 rounded-md border !border-dashed border-gray-300 bg-white p-5 hover:!border-primary"
      >
        <input {...getInputProps()} multiple={false} />
        {isDragActive ? (
          <p>Drop files here...</p>
        ) : (
          <>
            {imgUrl && !imageFileUploading ? (
              <img
                className=" h-22 w-28 rounded object-cover "
                src={imgUrl}
                alt="preview"
              />
            ) : (
              <>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                  <AiOutlineUpload className="text-3xl" />
                </div>
                <label className="cursor-pointer font-medium">
                  Drop file here to upload
                </label>
              </>
            )}
            {imageFileUploading && <LoadingSpinner />}
            <p className="text-red-500">{imageFileUploadError}</p>
          </>
        )}
      </div>
      <p className="mt-1 text-left text-sm text-red-500">{validationError}</p>
    </div>
  );
};

export default ImageDragAndDrop;
