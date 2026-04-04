import { RouterProvider } from "react-router";
import { routes } from "./app.routes.jsx";
import "./features/shared/global.scss";
import { AuthProvider } from "./Features/Auth/auth.context.jsx";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  );
}

export default App;
