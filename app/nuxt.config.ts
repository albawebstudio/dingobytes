// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'node:path'

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: [
        '@nuxt/content',
        'nuxt-security',
        'nuxt-svgo',
        ['@nuxtjs/google-fonts', {
            families: {
                Montserrat: {
                    wght: '800'
                },
                Hind: {
                    wght: '300..700',
                    ital: '300..700',
                }
            }
        }],
    ],
    nitro: {
        prerender: {
            routes: ['/sitemap.xml']
        },
        preset: "cloudflare_module",
        cloudflare: {
            deployConfig: true,
            nodeCompat: true
        }
    },
    svgo: {
        defaultImport: 'component',
    },
    runtimeConfig: {
        apiUrl: process.env.API_URL,
        public: {
            siteUrl: process.env.SITE_URL ?? 'https://dingobytes.com',
            honeypotThreshold: process.env.HONEYPOT_THRESHOLD ?? 5,
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
    content: {
        // Point at content/ from cwd (run from app dir). Needed after Nuxt 4 codemod when rootDir/baseDir resolution is wrong.
        sources: {
            content: {
                driver: 'fs',
                base: resolve(process.cwd(), 'content'),
            },
        },
        navigation: {
            fields: ['title', 'description', 'last_updated_at', 'backgroundImage', 'quotes'],
        },
        markdown: {
            toc: {
                depth: 3,
                searchDepth: 3
            },
            rehypePlugins: [
                'rehype-external-links'
            ]
        }
    },
    future: {
        compatibilityVersion: 4,
    },
})
