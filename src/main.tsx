import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Login from "./screens/Login.tsx";
import NotFound from "./screens/404.tsx";
import Register from "./screens/Register.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthProvider.tsx";
import Home from "./screens/Home.tsx";
import Unauthorized from "./screens/Unauthorized.tsx";
import Editor from "./screens/Editor.tsx";
import Lounge from "./screens/Lounge.tsx";
import Admin from "./screens/Admin.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import Links from "./screens/Links.tsx";
import PersistLogin from "./components/PersistLogin.tsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/*start- Public routes */}
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="unauthorized" element={<Unauthorized />} />
      <Route path="links" element={<Links />} />
      {/*end- Public routes */}

      {/*start- protected routes */}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={["8901"]} />}>
          <Route index={true} element={<Home />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["1234"]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["5678"]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>
        <Route
          element={<RequireAuth allowedRoles={["1235", "5678", "8901"]} />}
        >
          <Route path="lounge" element={<Lounge />} />
        </Route>
      </Route>
      {/*end- protected routes */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <AuthProvider>
      <ToastContainer
        theme="dark"
        position="top-center"
        stacked
        draggable
        draggablePercent={60}
      />
      <RouterProvider router={router} />
    </AuthProvider>
  </>
);
