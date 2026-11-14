import { readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = dirname(fileURLToPath(import.meta.url))

/** Discover `/journal/foo` and `/legal/foo` routes from markdown files under `content/`. */
export function markdownPrerenderRoutes(...sections: string[]): string[] {
    return sections.flatMap((section) => {
        try {
            return readdirSync(join(projectRoot, 'content', section))
                .filter((file) => file.endsWith('.md'))
                .map((file) => `/${section}/${file.replace(/\.md$/, '')}`)
        } catch {
            return []
        }
    })
}

/**
 * Routes baked to static HTML + `/api/_content/query/*.json` at build time.
 * Required for @nuxt/content on Cloudflare Pages (no filesystem at the edge).
 */
export const contentPrerenderRoutes = [
    '/',
    '/journal',
    ...markdownPrerenderRoutes('journal', 'legal'),
]