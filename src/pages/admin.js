import withAuth from "@/hoc/withAuth";
import { useState } from "react";
import { FaEye, FaTimes } from "react-icons/fa";

function AdminPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col">
        <div className="flex flex-col justify-center items-center w-full">
          <h1 className="text-4xl my-5">Welcome Admin!</h1>
          <div className="p-5 w-full flex">
            <table className="w-full border-collapse bg-white shadow-md rounded-lg  text-black">
              <thead>
                <tr className="text-left bg-customBackground text-black text-xl">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Upload Date</th>
                  <th className="p-4 font-medium">File Size</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200 bg-buttonBg text-black text-sm">
                  <td className="p-4">xyz</td>
                  <td className="p-4">01 Dec 2024</td>
                  <td className="p-4">2 MB</td>
                  <td className="p-4 cursor-pointer" onClick={handleOpenModal}>
                    <FaEye className="font-bold ml-4" />
                  </td>
                </tr>
                <tr className="border-t border-gray-200 bg-buttonBg text-black text-sm">
                  <td className="p-4">xyz</td>
                  <td className="p-4">01 Dec 2024</td>
                  <td className="p-4">2 MB</td>
                  <td className="p-4 cursor-pointer" onClick={handleOpenModal}>
                    <FaEye className="font-bold ml-4" />
                  </td>
                </tr>
                <tr className="border-t border-gray-200 bg-buttonBg text-black text-sm">
                  <td className="p-4">xyz</td>
                  <td className="p-4">01 Dec 2024</td>
                  <td className="p-4">2 MB</td>
                  <td className="p-4 cursor-pointer" onClick={handleOpenModal}>
                    <FaEye className="font-bold ml-4" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black text-black bg-opacity-50 flex justify-center items-center z-50 h-screen w-full p-6">
            <div className="bg-white rounded-lg p-6 w-full h-full">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">File Details</h2>
                <FaTimes
                  className="text-red-500 cursor-pointer"
                  onClick={handleCloseModal}
                />
              </div>
              <div className="mt-4">
                <p>
                  <strong>Name:</strong> xyz
                </p>
                <p>
                  <strong>Upload Date:</strong> 01 Dec 2024
                </p>
                <p>
                  <strong>File Size:</strong> 2 MB
                </p>
              </div>
              <div className="mt-4"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default withAuth(AdminPage, ["Admin"]);
