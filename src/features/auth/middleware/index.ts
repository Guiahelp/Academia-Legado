import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        return supabaseResponse
    }

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            getAll() {
                return request.cookies.getAll()
            },
            setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
                cookiesToSet.forEach(({ name, value }: { name: string; value: string; options?: any }) => request.cookies.set(name, value))
                supabaseResponse = NextResponse.next({
                    request,
                })
                cookiesToSet.forEach(({ name, value, options }: { name: string; value: string; options?: any }) =>
                    supabaseResponse.cookies.set(name, value, options)
                )
            },
        },
    })

    // Do not run code between createServerClient and
    // supabase.auth.getUser().
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const pathname = request.nextUrl.pathname

    const isAuthRoute = pathname.startsWith('/login') ||
        pathname.startsWith('/signup') ||
        pathname.startsWith('/forgot-password') ||
        pathname.startsWith('/update-password') ||
        pathname.startsWith('/check-email')

    const protectedPaths = ['/admin', '/cuenta', '/equipo', '/espera-aprobacion']
    const isProtectedRoute = protectedPaths.some(path => pathname.startsWith(path))

    if (!user && isProtectedRoute) {
        // missing session -> redirect to login
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    if (user && isAuthRoute) {
        // session exists but trying to access auth -> redirect to home
        const url = request.nextUrl.clone()
        url.pathname = '/'
        return NextResponse.redirect(url)
    }

    return supabaseResponse
}
