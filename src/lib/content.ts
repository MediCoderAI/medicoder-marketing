import type { ReaderScene } from "../components/motion/ScrollReader.astro";

// ── Read-along demos (synthetic encounters, illustrative values) ──

export const workflowScenes: ReaderScene[] = [
  {
    step: "The note",
    status: "Opening note",
    size: "xl",
    text: "Your clinicians already wrote it down. MediCoder reads every word.",
  },
  {
    step: "Reading",
    status: "Reading · finding evidence",
    size: "lg",
    text:
      "84-year-old woman, compliant with insulin. Numbness and tingling in both feet, [[worsening over six months.|m1]] A1C 8.8. GFR 28. Assessment: [[type 2 diabetes with polyneuropathy|c1]], [[chronic kidney disease, stage 4|c2]], [[peripheral vascular disease.|c3]] [[Start gabapentin, refer to podiatry.|m2]]",
    chips: {
      m1: { kind: "evidence", code: "MEAT · Evaluated", desc: "Progression documented" },
      c1: { code: "E11.42", tag: "HCC 37", strong: true, desc: "Type 2 diabetes w/ diabetic polyneuropathy" },
      c2: { code: "N18.4", tag: "HCC 327", strong: true, desc: "Chronic kidney disease, stage 4" },
      c3: { code: "I73.9", tag: "ICD-10", desc: "Peripheral vascular disease" },
      m2: { kind: "evidence", code: "MEAT · Treated", desc: "Plan supports E11.42" },
    },
  },
  {
    step: "The value",
    status: "Scoring · CMS-HCC V28",
    size: "xl",
    text: "Two HCCs captured. [[+0.29 RAF.|v1]] Revenue you already earned.",
    foot: "Synthetic encounter · CMS-HCC V28 · illustrative values",
  },
];

export const encryptionScenes: ReaderScene[] = [
  {
    step: "The note",
    status: "Opening note",
    size: "xl",
    text: "Clinical notes are sensitive. Every one is encrypted, [[in transit and at rest.|v0]]",
  },
  {
    step: "Encrypting",
    status: "Uploading · encrypted in transit",
    statusAfter: "Stored · encrypted at rest",
    size: "lg",
    encrypt: true,
    chipsTitle: "Protection",
    text:
      "Margaret Ellis, DOB 03/14/1942. 81-year-old woman with type 2 diabetes and stage 4 chronic kidney disease. GFR 27. A1C 8.1. Nephrology referral placed; metformin stopped.",
    chips: {
      transit: { kind: "lock", when: "start", code: "In transit", tag: "Encrypted", strong: true, desc: "Protected from your browser to MediCoder" },
      rest: { kind: "lock", when: "end", code: "At rest", tag: "Encrypted", strong: true, desc: "Protected wherever it's stored" },
    },
  },
  {
    step: "Protected",
    status: "Encrypted end to end",
    size: "xl",
    text: "Encrypted in transit. [[Encrypted at rest.|v1]] HIPAA compliant.",
    foot: "Synthetic note · illustrative example",
  },
];

// ── Product ──

export const features = [
  {
    title: "HCC capture & RAF scoring",
    desc: "Surface missed HCCs and calculate RAF scores under the V28 model. See the dollar impact per member, per encounter.",
    motif: "raf",
  },
  {
    title: "Documentation specificity",
    desc: "Identify where documentation lacks the specificity needed to support higher-value HCCs.",
    motif: "spec",
  },
  {
    title: "Recapture tracking",
    desc: "Track which HCCs from prior years need recapture and flag gaps before they cost you revenue.",
    motif: "recap",
  },
  {
    title: "Batch processing",
    desc: "Upload hundreds of notes at once. Process an entire panel in minutes, not days.",
    motif: "batch",
  },
  {
    title: "FFS code generation",
    desc: "Also generates ICD-10-CM, CPT and HCPCS codes for fee-for-service billing workflows.",
    motif: "ffs",
  },
  {
    title: "Encryption & HIPAA",
    desc: "Every note is encrypted in transit and at rest. HIPAA compliant, with a BAA available.",
    motif: "secure",
  },
] as const;

export const stats = [
  { value: "15–30%", label: "of legitimate RAF value left on the table at most practices" },
  { value: "<3 min", label: "from clinical note to revenue impact" },
  { value: "0", label: "EHR integrations required" },
  { value: "V28", label: "CMS-HCC model-native from day one" },
];

export const steps = [
  {
    title: "Upload notes",
    body: "Upload clinical notes from any EHR, in any format — PDFs, text, dictation exports. Send a single note or a whole batch. No integration, no IT ticket.",
    tags: ["PDF", "Text", "Dictation", "Batch"],
  },
  {
    title: "AI analysis",
    body: "MediCoder.AI reads every note, surfaces missed HCCs, calculates RAF scores under CMS-HCC V28 and identifies documentation gaps — with the evidence for each code.",
    tags: ["HCC gaps", "RAF · V28", "MEAT evidence"],
  },
  {
    title: "Revenue report",
    body: "Get captured vs. missed HCCs, RAF score impact and estimated revenue per member — in seconds, not weeks.",
    tags: ["Captured vs. missed", "$ per member"],
  },
];

export const audiences = ["Solo practitioners", "Small practices", "Billing companies", "MSOs & IPAs"];

export const tiers = [
  {
    name: "Free Audit",
    tagline: "See what you're missing — no commitment.",
    figure: "Free",
    unit: "25 charts",
    perks: ["25-chart audit", "Full HCC gap analysis", "RAF score report", "No credit card required"],
    cta: "Start free audit",
  },
  {
    name: "Starter",
    tagline: "For solo practitioners and small practices.",
    figure: "200",
    unit: "charts / month",
    perks: ["Up to 200 charts/month", "HCC capture + RAF scoring", "FFS code generation", "Email support"],
    cta: "Get started",
  },
  {
    name: "Professional",
    tagline: "For growing practices and billing companies.",
    figure: "Unlimited",
    unit: "charts",
    perks: ["All Starter features", "Unlimited charts", "Batch processing", "Priority support", "Multi-user access (up to 5)"],
    cta: "Get started",
    popular: true,
  },
  {
    name: "Enterprise",
    tagline: "For MSOs, IPAs and large organizations.",
    figure: "Custom",
    unit: "volume pricing",
    perks: ["All Professional features", "Dedicated account manager", "Custom integrations", "Unlimited users", "Volume pricing"],
    cta: "Talk to us",
  },
];

export const faqs = {
  noIntegration: {
    q: "Do I need an EHR integration?",
    a: "No. Upload notes from any EHR, in any format — PDFs, text or dictation exports, as a single note or a batch.",
  },
  model: {
    q: "Which risk adjustment model do you use?",
    a: "CMS-HCC V28, model-native from day one. V28 shifted weights and dropped conditions, and MediCoder.AI scores every note against it.",
  },
  hipaa: {
    q: "Is it HIPAA compliant?",
    a: "Yes. MediCoder.AI is HIPAA compliant, every note is encrypted in transit and at rest, and a BAA is available.",
  },
  encryption: {
    q: "How is my data protected?",
    a: "Every note is encrypted in transit — from your browser to MediCoder — and at rest wherever it's stored. You also choose exactly which notes to upload; nothing connects to your EHR.",
  },
  speed: {
    q: "How fast are results?",
    a: "Seconds, not weeks. A note goes from upload to HCC gaps, RAF score and dollar impact in under three minutes.",
  },
  audit: {
    q: "What's included in the free audit?",
    a: "A 25-chart audit with a full HCC gap analysis and a RAF score report. No credit card required.",
  },
  ffs: {
    q: "Do you support fee-for-service coding?",
    a: "Yes. MediCoder.AI also generates ICD-10-CM, CPT and HCPCS codes for fee-for-service billing workflows.",
  },
  baa: {
    q: "Will you sign a BAA?",
    a: "Yes. A Business Associate Agreement is available — email contact@medicoder.ai or book a call to set one up.",
  },
};

export const quote = {
  text: "MediCoder.AI surfaced [[HCC gaps we didn't even know we were missing.|q1]] The RAF impact reporting paid for itself in the first month.",
  cite: "Arnold Almirez",
  role: "Outpatient Coding Manager",
};
