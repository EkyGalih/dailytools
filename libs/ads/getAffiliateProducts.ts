import { AFFILIATE_BY_TAG } from './affiliate-map'

export function getAffiliateProducts(tags: string[] = []) {
  for (const tag of tags) {
    if (AFFILIATE_BY_TAG[tag]) {
      return AFFILIATE_BY_TAG[tag]
    }
  }
  return AFFILIATE_BY_TAG.DEFAULT
}