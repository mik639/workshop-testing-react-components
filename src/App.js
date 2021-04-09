import { SplitItConnected } from "./components/splitIt/splitIt";
import { Provider } from "react-redux";
import store from "./store";
import "./styles.css";

export default function App() {
  const total = 160;
  const currancy = "$";
  return (
    <Provider store={store}>
      <button>
        Buy now for {currancy}
        {total}
      </button>
      <SplitItConnected total={total} />
    </Provider>
  );
}
