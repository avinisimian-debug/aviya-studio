export type InquiryHandoffLinks = {
  whatsappHref: string;
  mailtoHref: string;
};

export type InquiryState = {
  status: "idle" | "sent" | "handoff" | "invalid" | "rate_limited" | "error";
  message: string;
  fieldErrors: Record<string, string>;
  handoff: InquiryHandoffLinks | null;
};

export const initialInquiryState: InquiryState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  handoff: null,
};
