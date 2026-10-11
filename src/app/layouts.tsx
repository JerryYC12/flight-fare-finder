import { Navigate, Outlet, ScrollRestoration, useSearchParams } from "react-router";

export function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      {/* Required: nested routes render here. */}
      <Outlet />
    </>
  );
}

/** Keeps old /auth?mode=signin|signup links working. */
export function LegacyAuthRedirect() {
  const [params] = useSearchParams();
  return <Navigate to={params.get("mode") === "signup" ? "/sign-up" : "/sign-in"} replace />;
}
