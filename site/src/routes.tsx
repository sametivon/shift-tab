import type { RouteRecord } from "vite-react-ssg";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import ProductExtension from "@/pages/ProductExtension";
import ProductVirtual from "@/pages/ProductVirtual";
import Studio from "@/pages/Studio";
import NotFound from "@/pages/NotFound";

/* Pretty extensionless URLs: GitHub Pages serves /products/extension from
   the SSG's flat products/extension.html, and the client router matches the
   same path. index.html route covers the direct-file URL. */
export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "index.html", element: <Home /> },
      { path: "products/extension", element: <ProductExtension /> },
      { path: "products/mondayvirtual", element: <ProductVirtual /> },
      { path: "studio", element: <Studio /> },
      { path: "404.html", element: <NotFound /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export default routes;
