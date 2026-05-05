import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

interface RedirectToIntegrationOptions {
  router: AppRouterInstance;
  message?: string;
  description?: string;
  delay?: number;
}

export const redirectToIntegration = ({
  router,
  message = "Please connect WhatsApp to access your dashboard",
  description = "You'll be redirected to the integration settings",
  delay = 2000,
}: RedirectToIntegrationOptions) => {
  toast.info(message, { description });

  setTimeout(() => {
    router.push("/dashboard/settings#integration");
  }, delay);
};
