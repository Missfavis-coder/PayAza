import axios from "axios";
import { tokenStorage } from "@/lib/api/client";
import { getBaseUrl } from "@/lib/api/config";
import type { StatementExportParams } from "@/lib/types/api";

// Returns the file Blob plus a sensible filename derived from
// Content-Disposition or fallbacks.
export async function downloadInvoice(
  params: StatementExportParams,
): Promise<{ blob: Blob; filename: string }> {
  const token = tokenStorage.getAccessToken();

  const response = await axios.get(`${getBaseUrl()}/invoices/export`, {
    params,
    responseType: "blob",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  const disposition = response.headers["content-disposition"] as
    | string
    | undefined;
  let filename = `statement.${params.format}`;
  if (disposition) {
    const match = /filename\*?=(?:UTF-8'')?"?([^";]+)"?/i.exec(disposition);
    if (match?.[1]) {
      filename = decodeURIComponent(match[1].replace(/^"|"$/g, ""));
    }
  }

  const blob = response.data as Blob;
  return { blob, filename };
}

export function triggerBlobDownload(blob: Blob, filename: string) {
  if (typeof window === "undefined") return;
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Defer revoke so the browser has a chance to start the download.
  setTimeout(() => window.URL.revokeObjectURL(url), 1000);
}
