import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import LogoutIcon from "@mui/icons-material/Logout";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import Dropzone from "react-dropzone";
import Image from "next/image";

const fullDrawerWidth = 240;
const shrinkedDrawerWidth = 80;

export default function UserPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(fullDrawerWidth); // Controls the sidebar width
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isMachineReadable, setIsMachineReadable] = useState(null);
  const [uploadEnabled, setUploadEnabled] = useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleDrawerWidth = () => {
    setDrawerWidth(
      drawerWidth === fullDrawerWidth ? shrinkedDrawerWidth : fullDrawerWidth
    );
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    checkFileMachineReadable(file);
  };

  const checkFileMachineReadable = async (file) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/checkFile", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        setIsMachineReadable(result.isMachineReadable);

        if (result.isMachineReadable) {
          toast.success("File is machine-readable!");
          setUploadEnabled(true);
        } else {
          toast.error("File is not machine-readable.");
          setUploadEnabled(false);
        }
      } catch (error) {
        console.error("Error checking file readability:", error);
      }
    }
  };

  const convertToMachineReadable = async () => {
    if (selectedFile) {
      const fileName = selectedFile.name;

      try {
        const response = await fetch("/api/convertFile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileName }),
        });

        const result = await response.json();

        if (response.ok) {
          toast.success("File converted to machine-readable format!");
          setIsMachineReadable(true);
          setUploadEnabled(true);
        } else {
          toast.error("Error converting file:", result.message);
        }
      } catch (error) {
        console.error("Error converting file:", error);
      }
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.url) {
          toast.success("File uploaded successfully!");
        } else {
          toast.error("Error uploading file:", result.message);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/auth/me");
      if (!response.ok) {
        router.push("/");
      } else {
        const data = await response.json();
        if (data.role == "User") {
          router.push("/user/dashboard");
        }
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        toast.success("Logged out successfully.");
        router.push("/login");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const navItems = [
    { text: "Upload", icon: <CloudUploadIcon />, path: "/user/dashboard" },
    { text: "Files", icon: <FilePresentIcon />, path: "/user/files" },
    { text: "Chatbot", icon: <ChatBubbleIcon />, path: "/user/chatbot" },
    { text: "Analysis", icon: <BarChartIcon />, path: "/user/analysis" },
  ];

  const drawer = (
    <div>
      <Toolbar>
          {drawerWidth === fullDrawerWidth ? (
        <Typography variant="h6" noWrap>
            User Dashboard
        </Typography>
          ) : (
                <Image src="/assets/logo.png" alt="Logo" width={50} height={50}/>
            
          )}
      </Toolbar>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            selected={router.pathname === item.path} // Highlight the active page
            sx={{
              backgroundColor:
                router.pathname === item.path ? "#f0f0f0" : "inherit",
              "&:hover": { backgroundColor: "#e0e0e0" },
              borderLeft:
                router.pathname === item.path ? "4px solid #3f51b5" : "none",
            }}
          >
            <ListItemButton
              sx={{
                justifyContent:
                  drawerWidth === shrinkedDrawerWidth ? "center" : "initial",
                px: 2.5,
              }}
              onClick={() => router.push(item.path)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: drawerWidth === shrinkedDrawerWidth ? "auto" : 3,
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {drawerWidth !== shrinkedDrawerWidth && (
                <ListItemText primary={item.text} />
              )}
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              justifyContent:
                drawerWidth === shrinkedDrawerWidth ? "center" : "initial",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: drawerWidth === shrinkedDrawerWidth ? "auto" : 3,
                justifyContent: "center",
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            {drawerWidth !== shrinkedDrawerWidth && (
              <ListItemText primary="Logout" />
            )}
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar className="bg-purple-700 ">
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawerWidth}
            sx={{
              mr: 2,
              display: { xs: "none", sm: "block" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Welcome, User!
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          [`& .MuiDrawer-paper`]: {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography variant="h5" gutterBottom>
          Upload and Process File
        </Typography>
        <Card
          sx={{
            maxWidth: "100%",
            margin: "0 auto",
            padding: 4,
            backgroundColor: "#f5f5f5",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <CardContent>
            <Box sx={{ textAlign: "center", marginBottom: 3 }}>
              <Dropzone
                onDrop={(acceptedFiles) => {
                  if (acceptedFiles.length > 0)
                    handleFileSelect(acceptedFiles[0]);
                }}
                multiple
              >
                {({ getRootProps, getInputProps }) => (
                  <>
                    <Box
                      {...getRootProps()}
                      sx={{
                        border: "2px dashed #3f51b5",
                        borderRadius: "8px",
                        padding: "20px",
                        backgroundColor: "#e3f2fd",
                        cursor: "pointer",
                      }}
                    >
                      <CloudUploadIcon
                        sx={{ fontSize: 80, color: "#3f51b5", marginBottom: 2 }}
                      />
                      <input {...getInputProps()} />
                      <Typography variant="h6" gutterBottom>
                        Drag & drop your files here, or click to select files
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        You can upload any type of files 
                      </Typography>
                    </Box>
                  </>
                )}
              </Dropzone>
            </Box>
            {selectedFile && (
              <Typography sx={{ marginTop: 2 }}>
                Selected File: {selectedFile.name}
              </Typography>
            )}
            {!isMachineReadable && selectedFile && (
              <Box sx={{ marginTop: 2 }}>
                <Typography color="error">
                  File is not machine-readable
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={convertToMachineReadable}
                  sx={{ marginTop: 2 }}
                >
                  Convert to Machine-Readable
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
        <Box sx={{ textAlign: "center", marginTop: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!uploadEnabled}
            sx={{ marginTop: 2 }}
          >
            Upload File
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
