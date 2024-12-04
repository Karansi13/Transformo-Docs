import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [file, setFile] = useState(null);
  const [isMachineReadable, setIsMachineReadable] = useState(null);
  const [convertedText, setConvertedText] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          setUserRole(data.user.role);
        } else {
          setUserRole(null);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        console.log("Logged out successfully.");
        router.push("/login");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    if (!loading && userRole === "Admin") {
      router.push("/admin");
    } else if (userRole === "User") {
      router.push("/");
    } else if (!userRole) {
      router.push("/login");
    }
  }, [loading, userRole, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log(result);
    console.log(result.message);

    if (result.url) {
      setUploadedUrl(result.url);
    }
  };

  const handleCheckMachineReadable = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/checkFile", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log(result);
      setIsMachineReadable(result.isMachineReadable);
      if (result.isMachineReadable) {
        console.log("The file is machine-readable!");
      } else {
        console.log("The file is not machine-readable.");
      }
    }
  };

  const handleConvertToMachineReadable = async () => {
    if (file) {
      const fileName = file.name;
      const response = await fetch("/api/convertFile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName }),
      });

      const result = await response.json();
      if (response.ok) {
        setConvertedText(result.text);
        console.log(result.message);
      } else {
        console.error("Error:", result.message);
      }
    }
  };

  const handleExtractData = async () => {
    if (file) {
      const fileType = file.type;
      const response = await fetch("/api/extractData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath: uploadedUrl, fileType }),
      });

      const result = await response.json();
      console.log(result);
      console.log(result.message, result.data);
    }
  };

  if (userRole === "User") {
    return (
      <>
        <div className="h-screen w-full flex flex-col">
          <div className="flex justify-center items-center w-full ">
            <h1 className="text-4xl my-5">
              Upload and Convert Document to Machine-Readable Format
            </h1>
            <button
              onClick={handleLogout}
              className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
          <div className="w-full p-6 my-2">
            <div className="flex justify-evenly items-center w-full text-xl">
              <input type="file" onChange={handleFileChange} />
              <button
                onClick={handleCheckMachineReadable}
                className="bg-white text-black p-2 cursor-pointer"
              >
                Check if Machine-Readable
              </button>
            </div>
            <div className="flex items-center my-6 justify-center">
              {isMachineReadable === false && (
                <div className="text-2xl my-2 flex flex-col gap-3">
                  <p>This is a non-machine-readable file.</p>
                  <button
                    onClick={handleConvertToMachineReadable}
                    className="bg-white text-black p-2 cursor-pointer"
                  >
                    Convert to Machine-Readable
                  </button>
                </div>
              )}
            </div>
            {isMachineReadable && <p>This file is machine-readable!</p>}
            <div className="flex items-center justify-center text-2xl">
              <button
                onClick={() => handleUpload(file)}
                className="bg-white text-black p-2 cursor-pointer mt-10"
              >
                Upload File
              </button>
            </div>
            {uploadedUrl && (
              <div>
                <p>Uploaded to Cloudinary: {uploadedUrl}</p>
                <button
                  onClick={handleExtractData}
                  className="bg-white text-black p-2 cursor-pointer"
                >
                  Extract Data
                </button>
              </div>
            )}
            //{" "}
            {/* {convertedText && <div><p>Converted Text: {convertedText}</p></div>} */}
          </div>
        </div>
      </>
    );
  }

  return null;
}
