import { onRequest as __health_ts_onRequest } from "C:\\Users\\lukee\\WebstormProjects\\wedding\\functions\\health.ts"

export const routes = [
    {
      routePath: "/health",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__health_ts_onRequest],
    },
  ]