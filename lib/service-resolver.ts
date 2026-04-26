// src/lib/service-resolver.ts
// Utility to resolve serviceId from formData for submit-request

import type { OrderPayload } from "./order";

/**
 * Resolves the correct serviceId based on formData values.
 * All mappings and logic are preserved from the submit-request form.
 */
export function resolveServiceId(formData: OrderPayload): string {
  // UA Clearance
  if (formData.serviceGroup === "ua_clearance") {
    const { urgency, apostille, translation } = formData;
    if (urgency === "normal" && apostille === "no" && translation === "none") return "ua_std_na";
    if (urgency === "normal" && apostille === "yes" && translation === "none") return "ua_std_ap";
    if (urgency === "urgent" && apostille === "yes" && translation === "none") return "ua_urg_ap";
    if (urgency === "urgent" && apostille === "no" && translation === "none") return "ua_urg_na";
    if (urgency === "urgent" && apostille === "no" && translation === "cz") return "ua_urg_tr_cz";
    if (urgency === "normal" && apostille === "no" && translation === "cz") return "ua_std_tr_cz";
    if (urgency === "normal" && apostille === "yes" && translation === "sk") return "ua_std_ap_tr_sk";
    if (urgency === "urgent" && apostille === "yes" && translation === "sk") return "ua_urg_ap_tr_sk";
    if (urgency === "normal" && apostille === "yes" && translation === "cz") return "ua_std_ap_tr_cz";
    if (urgency === "urgent" && apostille === "yes" && translation === "cz") return "ua_urg_ap_tr_cz";
    return "";
  }

  // Foreign Clearance (PL, HU, CZ)
  if (["pl_clearance", "hu_clearance", "cz_clearance"].includes(formData.serviceGroup)) {
    const { serviceGroup, apostille } = formData;
    if (serviceGroup === "pl_clearance") return apostille === "yes" ? "pl_ap" : "pl_na";
    if (serviceGroup === "hu_clearance") return apostille === "yes" ? "hu_ap" : "hu_na";
    if (serviceGroup === "cz_clearance") return apostille === "yes" ? "cz_ap" : "cz_na";
    return "";
  }

  // Driver Registry
  if (formData.serviceGroup === "driver_registry") {
    const { apostille, translation } = formData;
    if (apostille === "no" && translation === "none") return "drv_ext_na";
    if (apostille === "yes" && translation === "none") return "drv_ext_ap";
    if (apostille === "no" && translation === "sk") return "drv_ext_na_tr_sk";
    if (apostille === "yes" && translation === "sk") return "drv_ext_ap_tr_sk";
    return "";
  }

  // Civil Registry
  if (formData.serviceGroup === "civil_registry") {
    const { civilRegistryType, apostille, translation } = formData;
    if (civilRegistryType === "duplicate") {
      if (apostille === "yes" && translation === "sk") return "civ_dup_ap_tr_sk";
      if (apostille === "yes") return "civ_dup_ap";
      return "civ_dup_na";
    }
    if (civilRegistryType === "extract") {
      if (apostille === "yes" && translation === "sk") return "civ_ext_ap_tr_sk";
      if (apostille === "yes") return "civ_ext_ap";
      return "civ_ext_na";
    }
    if (civilRegistryType === "apostille_only") {
      if (translation === "sk") return "civ_ap_tr_sk";
      return "civ_ap";
    }
    return "";
  }

  // Education Apostille
  if (formData.serviceGroup === "education_apostille") {
    const { educationType } = formData;
    if (educationType === "urgent") return "edu_ap_urg";
    if (educationType === "institution_certificate") return "edu_ext_ap";
    return "edu_ap_std";
  }

  // Translation
  if (formData.serviceGroup === "translation") {
    const { translationType } = formData;
    if (translationType === "certificate_sk") return "tr_cert_sk";
    if (translationType === "clearance_cz") return "tr_cl_cz";
    return "tr_cl_sk";
  }

  // Default fallback
  return formData.serviceGroup;
}
