// https://nuxt.com/docs/api/configuration/nuxt-config
import { contentPrerenderRoutes } from './content-prerender-routes'

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

    routeRules: {
        '/': { prerender: true },
        '/journal': { prerender: true },
        '/journal/**': { prerender: true },
        '/legal/**': { prerender: true },
        '/sitemap.xml': { prerender: true },
    },
    nitro: {
        prerender: {
            routes: ['/sitemap.xml', ...contentPrerenderRoutes],
            crawlLinks: false,
        },
        preset: 'cloudflare_pages',
        cloudflare: {
            deployConfig: true,
            nodeCompat: true,
        },
    },
    svgo: {
        defaultImport: 'component',
    },
    content: {
        highlight: {
            theme: {
                default: 'github-light',
                dark: 'github-dark',
            },
            themes: ['github-light', 'github-dark'],
            langs: ['javascript', 'js', 'typescript', 'ts', 'vue', 'json', 'bash', 'markdown', 'md', 'yaml'],
        },
        markdown: {
            tags: {
                ul: 'ProseUl',
                ol: 'ProseOl',
                li: 'ProseLi',
            },
        },
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
