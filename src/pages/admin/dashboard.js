// This page is currenlt being used
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaEye, FaTimes, FaRegEdit } from "react-icons/fa";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import LogoutIcon from "@mui/icons-material/Logout";
import { MdDeleteOutline } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Chatbot from "@/components/Chatbot";

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
        if (data.role == "Admin") {
          router.push("/admin/dashboard");
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
    <>
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
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            [`& .MuiDrawer-paper`]: {
              boxSizing: "border-box",
              width: fullDrawerWidth,
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 3,
            }}
          >
            <Typography variant="h4" gutterBottom>
              All Files
            </Typography>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {/* Search Box */}
              <input
                type="text"
                placeholder="Search by organization"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ width: "250px" }}
                onChange={(e) => {
                  console.log("Search:", e.target.value);
                  // Add search logic here
                }}
              />

              {/* Filter Component with Dropdown */}
              <Box
                sx={{
                  position: "relative",
                  display: "inline-block",
                }}
                className="group"
              >
                <button
                  className="px-4 py-2 bg-purple-600 rounded-md focus:outline-none hover:bg-purple-500"
                  style={{ cursor: "pointer" }}
                >
                  <FilterAltIcon />
                </button>

                {/* Dropdown Menu */}
                <Box
                  className="hidden group-hover:block text-black"
                  sx={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    backgroundColor: "white",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    padding: "1rem",
                    zIndex: 10,
                    marginTop: "2px",
                    borderRadius: "8px",
                    width: "200px",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ marginBottom: 1 }}
                    className="text-xl"
                  >
                    Filter By:
                  </Typography>
                  <Box className="my-4 ">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          console.log("Healthcare:", e.target.checked)
                        }
                      />
                      Healthcare
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          console.log("Invoice:", e.target.checked)
                        }
                      />
                      Invoice
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          console.log("Finance:", e.target.checked)
                        }
                      />
                      Finance
                    </label>
                  </Box>
                  <button
                    className="px-4 py-2 bg-purple-600 rounded-md focus:outline-none hover:bg-purple-500 text-white mt-4"
                    style={{ cursor: "pointer" }}
                  >
                    Apply Filter
                  </button>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="p-5 w-full flex">
            <table className="w-full border-collapse bg-white shadow-lg rounded-lg text-black">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-600 text-sm font-medium">
                  <th className="p-4">Name</th>
                  <th className="p-4">Upload Date</th>
                  <th className="p-4">Document Type</th>
                  <th className="p-4">Total File Size</th>
                  <th className="p-4">Actions</th>
                  <th className="p-4">Edit</th>
                  <th className="p-4">Remove</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200 hover:bg-gray-50 text-sm">
                  <td className="p-4 text-green-600 font-medium">xyz.pdf</td>
                  <td className="p-4">21-03-2022</td>
                  <td className="p-4">Health Report</td>
                  <td className="p-4">305.99/376.37Mb</td>
                  <td className="p-4">
                    <button className="px-4 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                      View
                    </button>
                  </td>
                  <td className="p-4">
                    <button className="p-2 bg-purple-100 text-purple-500 rounded-full hover:bg-purple-200">
                      <FaRegEdit />
                    </button>
                  </td>
                  <td className="p-4">
                    <button className="p-2 bg-red-100 text-red-500 rounded-full hover:bg-red-200">
                      <MdDeleteOutline />
                    </button>
                  </td>
                </tr>
                <tr className="border-t border-gray-200 hover:bg-gray-50 text-sm">
                  <td className="p-4 text-green-600 font-medium">abc.pdf</td>
                  <td className="p-4">08-03-2022</td>
                  <td className="p-4">Invoice</td>
                  <td className="p-4">305.99/376.37Kb</td>
                  <td className="p-4">
                    <button className="px-4 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                      View
                    </button>
                  </td>
                  <td className="p-4">
                    <button className="p-2 bg-purple-100 text-purple-500 rounded-full hover:bg-purple-200">
                      <FaRegEdit />
                    </button>
                  </td>
                  <td className="p-4">
                    <button className="p-2 bg-red-100 text-red-500 rounded-full hover:bg-red-200">
                      <MdDeleteOutline />
                    </button>
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
        <Chatbot/>
      </Box>
      <Stack spacing={2}>
        <Pagination count={10} shape="rounded" />
        <Pagination count={10} color="secondary" />
      </Stack>
    </>
  );
}
