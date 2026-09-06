const TEMPLATE_BY_SLUG = {
  "nomadher-app": "ux-ui",
  "jal-nomadher": "marketing-social",
  "global-youth-summit": "campaign-brand",
  "misiones-internacionales": "campaign-brand",
  "sejong-hackathon": "campaign-brand",
};

export function getProjectTemplate(slug) {
  return TEMPLATE_BY_SLUG[slug] ?? "campaign-brand";
}
