import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// The lovable tagger is optional in this workspace; skip it gracefully when the package isn't installed.
const getComponentTaggerPlugin = async () => {
  try {
    const mod = await import("lovable-tagger");
    return mod.componentTagger ?? (() => null);
  } catch {
    return () => null;
  }
};

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const componentTagger = await getComponentTaggerPlugin();

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
