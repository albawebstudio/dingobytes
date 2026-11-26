import { addYears } from 'date-fns'

export type SecurityTxtOptions = {
    contact: string
    siteUrl: string
    preferredLanguages?: string
    policyUrl?: string
    expiresAt?: Date
}

/** Build an RFC 9116 security.txt document (https://securitytxt.org/). */
export function buildSecurityTxt(options: SecurityTxtOptions): string {
    const {
        contact,
        siteUrl,
        preferredLanguages = 'en',
        policyUrl,
        expiresAt = addYears(new Date(), 1),
    } = options

    const baseUrl = siteUrl.replace(/\/$/, '')
    const canonical = `${baseUrl}/.well-known/security.txt`
    const expires = expiresAt.toISOString()

    const lines = [
        `Contact: ${contact}`,
        `Expires: ${expires}`,
        `Canonical: ${canonical}`,
        `Preferred-Languages: ${preferredLanguages}`,
    ]

    if (policyUrl) {
        lines.push(`Policy: ${policyUrl}`)
    }

    return `${lines.join('\n')}\n`
}