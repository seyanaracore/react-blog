import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Components/AppRouter/AppRouter";
import Navbar from "./Components/Navbar/Navbar";

export default function App() {
   return (
      <BrowserRouter>
         <Navbar />
         <AppRouter />
      </BrowserRouter>
   );
}
