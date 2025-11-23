import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "src");

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "#components": resolve(root, "components"),
      "#constants": resolve(root, "constants"),
      "#store": resolve(root, "store"),
      "#hoc": resolve(root, "hoc"),
      "#windows": resolve(root, "windows")
    }
  }
});
