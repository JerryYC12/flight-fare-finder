import { Outlet, redirect, type RouteObject } from "react-router";
import type { User } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";
import { LegacyAuthRedirect, RootLayout } from "@/app/layouts";
import { Index } from "@/pages/Index";
import { AuthPage } from "@/pages/Auth";
import { AppPage } from "@/pages/App";
import { NotFound } from "@/pages/NotFound";
import { RouteError } from "@/pages/RouteError";

export type AuthenticatedData = { user: User };

/** Loader for protected routes: send signed-out visitors to /sign-in before rendering. */
export async function requireUser(): Promise<AuthenticatedData> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw redirect("/sign-in");
  return { user: data.user };
}

export const routes: RouteObject[] = [
  {
    id: "root",
    element: <RootLayout />,
    errorElement: <RouteError />,
    HydrateFallback: () => null,
    children: [
      { index: true, element: <Index /> },
      { path: "sign-in", element: <AuthPage mode="signin" /> },
      { path: "sign-up", element: <AuthPage mode="signup" /> },
      { path: "auth", element: <LegacyAuthRedirect /> },
      {
        id: "authenticated",
        loader: requireUser,
        element: <Outlet />,
        children: [{ path: "app", element: <AppPage /> }],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
];
