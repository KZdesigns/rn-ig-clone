import NewApp from "./NewApp";
import store from "./store/store";
import { Provider } from "react-redux";
import { storage } from "./util/firebaseConfig";

export default function App() {
  return (
    <Provider store={store}>
      <NewApp />
    </Provider>
  );
}
