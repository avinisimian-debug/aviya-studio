/**
 * Premium Unsplash assets — product UI, growth, editorial lifestyle
 * Prefer “website / workspace / commerce” scenes over pure abstract art
 */
export const eliteMedia = {
  heroDashboard:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=90",
  analytics:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=90",
  workspace:
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=90",
  laptopUi:
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=90",
  growth:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=90",
  mobileDesk:
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=90",
  designCraft:
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=90",
  proof:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=90",
} as const;

/** High-end website template looks — multi-mock showcase */
export const eliteTemplates = [
  {
    id: "brand",
    label: "אתר תדמית",
    domain: "studio-brand.co.il",
    tag: "מותג",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=92",
    alt: "תבנית אתר תדמית פרימיום — סביבה מקצועית נקייה",
  },
  {
    id: "store",
    label: "חנות דיגיטלית",
    domain: "shop.yourbrand.co.il",
    tag: "מכירות",
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=92",
    alt: "תבנית חנות אונליין — חוויית קנייה ברמת מותג",
  },
  {
    id: "service",
    label: "אתר שירותים",
    domain: "clinic.pro",
    tag: "לידים",
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=92",
    alt: "תבנית אתר לשירותים מקצועיים — אמון והמרה",
  },
  {
    id: "landing",
    label: "דף נחיתה",
    domain: "launch.now",
    tag: "המרה",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=92",
    alt: "תבנית דף נחיתה ממיר — דשבורד וביצועים",
  },
  {
    id: "lifestyle",
    label: "מותג לייף־סטייל",
    domain: "atelier.co.il",
    tag: "יוקרה",
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=92",
    alt: "תבנית אתר מותג לייף־סטייל — צילום אווירה",
  },
  {
    id: "clinic",
    label: "קליניקה / בריאות",
    domain: "health.care",
    tag: "אמון",
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=92",
    alt: "תבנית אתר לקליניקה — נקי ומקצועי",
  },
] as const;

export type EliteTemplate = (typeof eliteTemplates)[number];
