import { AFFILIATE_POPUP_PRODUCTS } from './affiliate-popup'

export function getAffiliatePopup() {
    if (AFFILIATE_POPUP_PRODUCTS.length === 0) return null

    const index = Math.floor(
        Math.random() * AFFILIATE_POPUP_PRODUCTS.length
    )

    return AFFILIATE_POPUP_PRODUCTS[index]
}