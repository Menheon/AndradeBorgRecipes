import { Link } from "react-router-dom";
import { ROOT_PATH } from "@/shared/AppRoutes";
import { FilledButton } from "@/shared/FilledButton";

/**
 * Page displayed when users navigate to a non-existing route
 * Provides a button to navigate back to the home page
 */
export const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-primary-500 text-6xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold text-neutral-700">
        Page Not Found
      </h2>
      <p className="max-w-md text-neutral-500">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to={ROOT_PATH} className="no-underline" tabIndex={-1}>
        <FilledButton type="primary">Go to Home</FilledButton>
      </Link>
    </div>
  );
};
