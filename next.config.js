module.exports = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        secret: '65c60aeb-aa00-40d4-a6e2-9a90d375bff5'
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api' // development api
            : 'https://book-utfpr-s25.vercel.app/api' // production api
    }
}
