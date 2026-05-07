import { apiClient } from "@/lib/api";
import type {
  ReportFraudPayload,
  ReportFraudResponse,
  SupportContactPayload,
  SupportContactResponse,
} from "@/lib/types/api";

export const supportService = {
  async contact(
    payload: SupportContactPayload,
  ): Promise<SupportContactResponse> {
    return apiClient.post<SupportContactResponse>(
      "/support/contact",
      payload,
    );
  },

  async reportFraud(
    payload: ReportFraudPayload,
  ): Promise<ReportFraudResponse> {
    return apiClient.post<ReportFraudResponse>(
      "/support/report-fraud",
      payload,
    );
  },
};
