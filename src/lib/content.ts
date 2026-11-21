import baseContent from "@/content/site-content.json";
import jobOverrides from "@/content/variants/job.json";
import type { SiteContent } from "@/types/content";
import { VARIANT, type Variant } from "@/lib/variant";

/* Content = site-content.json (shared base) + the active variant's overrides.

   - Override files are deep-merged: objects merge key by key, while arrays
     and plain values replace the base value.
   - Any array item in either file may carry `"only": "job"` or
     `"only": "independent"`; it is dropped from other variants. Use this for
     single FAQ entries, projects, etc. instead of copying whole arrays. */
const OVERRIDES: Record<Variant, unknown> = {
  independent: {},
  job: jobOverrides,
};

type Json = unknown;

const isObject = (v: Json): v is Record<string, Json> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

function merge(base: Json, override: Json): Json {
  if (!isObject(base) || !isObject(override)) return override === undefined ? base : override;
  const out: Record<string, Json> = { ...base };
  for (const [key, value] of Object.entries(override)) out[key] = merge(base[key], value);
  return out;
}

function filterVariant(value: Json): Json {
  if (Array.isArray(value)) {
    return value
      .filter((item) => !isObject(item) || item.only === undefined || item.only === VARIANT)
      .map(filterVariant);
  }
  if (isObject(value)) {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, filterVariant(v)]));
  }
  return value;
}

const content = filterVariant(merge(baseContent, OVERRIDES[VARIANT])) as SiteContent;

export default content;
