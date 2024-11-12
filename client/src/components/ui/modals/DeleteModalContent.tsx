import { PiWarning } from "react-icons/pi";
import LoadingSpinner from "../LoadingSpinner";

const DeleteModalContent = ({
  chosenItemName,
  setDeleteModalIsOpen,
  deleteMutation,
  isLoading,
}: {
  chosenItemName: string;
  setDeleteModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteMutation: () => void;
  isLoading: boolean;
}) => {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500 bg-opacity-10 p-2">
        <PiWarning className="text-3xl text-red-600" />
      </div>

      <h3 className="mt-5 pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
        {chosenItemName}
      </h3>
      <p className="mb-10">Are you sure you want to delete?</p>
      <div className="-mx-3 flex flex-wrap gap-y-4">
        <div className="w-full px-3 xl:w-1/2">
          <button
            onClick={() => setDeleteModalIsOpen(false)}
            className="block w-full rounded border border-stroke bg-gray-100 p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-gray-400 hover:text-white"
          >
            Cancel
          </button>
        </div>
        <div className="w-full px-3 xl:w-1/2">
          <button
            onClick={deleteMutation}
            className="flex min-h-[52px] w-full items-center bg-red-500 justify-center rounded border p-3 text-center font-medium text-white transition hover:bg-opacity-60"
          >
            {isLoading ? <LoadingSpinner /> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModalContent;
