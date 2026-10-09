export type InquiryState = {
  status: "idle" | "sent" | "not_configured" | "invalid" | "rate_limited" | "error";
  message: string;
  fieldErrors: Record<string, string>;
};

export const initialInquiryState: InquiryState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};
