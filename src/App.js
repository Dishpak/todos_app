import './App.css';
import {useSelector, useDispatch} from "react-redux";
import {increment, decrement, incrementByAmount} from "./store/counterSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRouter from "./AppRouter/AppRouter";

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();



  return (
    <div className="flex-container app">
      <Header />
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
