import { RouterProvider } from "react-router";
import { routes } from "./app.routes.jsx";
import "./features/shared/global.scss";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { PostContextProvider } from "./features/post/post.context.jsx";

function App() {
  return (
    <AuthProvider>
      <PostContextProvider>
        <RouterProvider router={routes} />
      </PostContextProvider>
    </AuthProvider>
  );
}

export default App;
