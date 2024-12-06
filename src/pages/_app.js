// import "@/styles/globals.css";
// import { Toaster } from "react-hot-toast";

// export default function App({ Component, pageProps }) {
//   return (
//     <>
//       <Toaster position="top-right" reverseOrder={false} />
//       <Component {...pageProps} />
//     </>
//   );
// }


import '../styles/globals.css'; // Your Tailwind CSS
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from "react-hot-toast";


const theme = createTheme();

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-right" reverseOrder={false} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
