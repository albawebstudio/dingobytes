import { serverQueryContent } from '#content/server'
import { SitemapStream, streamToPromise } from 'sitemap'

/** Static routes (non-content pages) to include in the sitemap */
const STATIC_ROUTES = ['/', '/blog', '/code']

export default defineEventHandler(async (event) => {
    const { siteUrl } = useRuntimeConfig(event).public
    const sitemap = new SitemapStream({ hostname: siteUrl })

    const docs = await serverQueryContent(event).find()
    for (const doc of docs) {
        sitemap.write({ url: doc._path, changefreq: 'monthly' })
    }

    for (const path of STATIC_ROUTES) {
        sitemap.write({ url: path, changefreq: 'monthly' })
    }

    sitemap.end()
    return streamToPromise(sitemap)
})
