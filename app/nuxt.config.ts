// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'node:path'

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    css: ['~/assets/css/main.css'],

    modules: [
        '@nuxt/content',
        '@nuxt/image',
        '@nuxt/ui',
        'nuxt-security',
        'nuxt-svgo',
    ],

    nitro: {
        prerender: {
            routes: ['/sitemap.xml']
        },
        preset: "cloudflare_pages",
        cloudflare: {
            deployConfig: true,
            nodeCompat: true
        }
    },
    svgo: {
        defaultImport: 'component',
    },
    runtimeConfig: {
        contactName: process.env.CONTACT_NAME,
        contactEmail: process.env.CONTACT_EMAIL,
        toEmail: process.env.TO_EMAIL,
        resendApiKey: process.env.RESEND_API_KEY,
        resendTemplateId: process.env.RESEND_TEMPLATE_ID,
        public: {
            siteUrl: process.env.SITE_URL ?? 'https://dingobytes.com',
        }
    },
    security: {
        headers: {
            contentSecurityPolicy: {
                'img-src': [
                    "'self'",
                    "data:",
                    "https://maps.gstatic.com/",
                    "https://d3iwoqnah6ycun.cloudfront.net/",
                    "https://img.youtube.com",
                ],
                'script-src': [
                    "'self'",
                    "'unsafe-eval'",  // Required for the QR code library
                    'https:',
                    "'unsafe-inline'"
                ],
            }
        },
    },
})
