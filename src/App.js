import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { ContextProvider } from "./store/auth-Context";
import { Context } from "./store/auth-Context";

function App() {
  const ctx = useContext(Context);
  const isLoggedin = ctx.isLoggedin;

  console.log(ctx.isLoggedin);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!ctx.isLoggedin && (
          <Route path="/auth" exact>
            <AuthPage />
          </Route>
        )}
        {ctx.isLoggedin && (
          <Route path="/profile" exact>
            <UserProfile />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
