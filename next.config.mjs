// @ts-check

export default (phase, { defaultConfig }) => {
    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
        // next.config.js
        experimental: {
            esmExternals: true,
        },
    }
    return nextConfig
}