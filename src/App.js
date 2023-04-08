import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRouter from "./AppRouter/AppRouter";

function App() {

  return (
    <div className="flex-container app">
      <Header />
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
