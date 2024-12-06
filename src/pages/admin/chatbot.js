// This page is currenlt being used
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaEye, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import LogoutIcon from "@mui/icons-material/Logout";

const fullDrawerWidth = 240;
const shrinkedDrawerWidth = 80;

export default function AdminPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(fullDrawerWidth); // Controls the sidebar width
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/auth/me");
      if (!response.ok) {
        router.push("/");
      } else {
        const data = await response.json();
        if (data.role !== "Admin") {
          router.push("/");
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
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
    { text: "Chatbot", icon: <ChatBubbleIcon />, path: "/admin/chatbot" },
    { text: "Analysis", icon: <BarChartIcon />, path: "/admin/analysis" },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap>
          {drawerWidth === fullDrawerWidth && "Admin Dashboard"}
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map((item) => (
         <ListItem
         key={item.text}
         disablePadding
         selected={router.pathname === item.path} // Highlight the active page
         sx={{
           backgroundColor: router.pathname === item.path ? "#f0f0f0" : "inherit",
           "&:hover": { backgroundColor: "#e0e0e0" },
           borderLeft: router.pathname === item.path ? "4px solid #3f51b5" : "none",
         }}
       >
            <ListItemButton
              sx={{
                justifyContent: drawerWidth === shrinkedDrawerWidth ? "center" : "initial",
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
              justifyContent: drawerWidth === shrinkedDrawerWidth ? "center" : "initial",
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
            onClick={handleDrawerToggle} // Toggles the sidebar width on mobile
            sx={{
              mr: 2,
              display: { xs: "block", sm: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawerWidth} // Toggles the sidebar width on large screens
            sx={{
              mr: 2,
              display: { xs: "none", sm: "block" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Welcome, Admin!
          </Typography>
          
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
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
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          [`& .MuiDrawer-paper`]: { boxSizing: "border-box", width: fullDrawerWidth },
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
        <Typography variant="h4" gutterBottom>
          Select a file & Ask anything!
        </Typography>
        <Box className="p-5 w-full flex">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg text-black">
            <thead>
              <tr className="text-left bg-gray-200 text-black text-xl">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Upload Date</th>
                <th className="p-4 font-medium">File Size</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200 bg-gray-100 text-black text-sm">
                <td className="p-4">xyz</td>
                <td className="p-4">01 Dec 2024</td>
                <td className="p-4">2 MB</td>
                <td className="p-4 cursor-pointer" onClick={handleOpenModal}>
                  <FaEye className="font-bold ml-4" />
                </td>

              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </Box>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 h-screen w-full p-6">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
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
            </div>
          </div>
        )}
      </Box>
    </Box>
  );
}