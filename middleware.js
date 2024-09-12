import { withAuth } from 'next-auth/middleware'

export default withAuth({
    callbacks: {
        authorized: ({req, token}) => {
            if(req.nextUrl.pathname === '/admin') {
                return token?.role === 'Admin'
            }

            if (token === 'admin') {
                return true
            } else {
                return false
            }
        }
    }
})

export { default } from 'next-auth/middleware'

export const config = { matcher: ["/admin/:path*", "/user/:path*"]}