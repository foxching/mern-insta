import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { loadUser } from "./redux/actions/authActions";
import AppRouter from "./routes/AppRouter";
import "./styles/App.scss";

const App = () => {
  const login = localStorage.getItem("login");
  useEffect(() => {
    if (login) {
      store.dispatch(loadUser());
    }
  }, [login]);
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
export default App;
