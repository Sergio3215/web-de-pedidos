import { NextResponse } from 'next/server'
const jose = require('jose');

export function middleware(request) {
    const token = request.cookies.get('token');
    const partialURL = request.url.split('/')[3];

    const loginCheck = loggedStatus(token);

    switch (partialURL) {
        case 'products':
            if (loginCheck.status) {
                return NextResponse.next();
            }
            else {
                return Response.redirect(new URL('/login', request.url));
            }
            break;
        case 'login':
            if (!loginCheck.status) {
                return NextResponse.next();
            }
            else {
                return Response.redirect(new URL('/', request.url));
            }
            break;
        case 'signin':
            if (!loginCheck.status) {
                return NextResponse.next();
            }
            else {
                return Response.redirect(new URL('/', request.url));
            }
        default:
            break;
    }
}

const loggedStatus = (token) => {

    if (token == undefined) {
        return {
            data: [],
            status: false
        }
    }
    else {
        const { payload } = jose.jwtVerify(token.value, new TextEncoder().encode(process.env.word_secret));
        console.log(payload);
        return {
            data: payload,
            status: true
        }
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/products', '/login', '/signin'],
}