import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar/Navbar";
import "./App.css"; 
import Contact from "./pages/Contact";

const theme = createTheme({
  typography: {
    fontFamily: '"Dosis", "sans-serif"',
    h4: {
      fontWeight: 700, // Bold for h4
    },
    h6: {
      fontWeight: 700, // Bold for h6
    },
    body2: {
      fontWeight: 700, // Bold for body2
    },
    button: {
      fontWeight: 700, // Bold for buttons
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
