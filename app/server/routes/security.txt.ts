export default defineEventHandler((event) => {
    return sendRedirect(event, '/.well-known/security.txt', 301)
})