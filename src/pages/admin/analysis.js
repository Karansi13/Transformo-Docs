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
import { LineChart } from "@mui/x-charts";
import { BarChart } from '@mui/x-charts/BarChart'

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
          Check Analysis of Documents
        </Typography>
        <Box className="p-5 w-full flex">
        
     <BarChart
      xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
      series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
      width={500}
      height={300}
    />
        </Box>
      </Box>
    </Box>
  );
}
