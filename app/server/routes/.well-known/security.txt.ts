import { buildSecurityTxt } from '../../utils/security-txt'

export default defineEventHandler((event) => {
    const { public: { siteUrl }, securityTxtContact, securityTxtPolicyUrl } = useRuntimeConfig(event)

    setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')

    return buildSecurityTxt({
        contact: securityTxtContact,
        siteUrl,
        policyUrl: securityTxtPolicyUrl || `${siteUrl.replace(/\/$/, '')}/legal/privacy`,
    })
})