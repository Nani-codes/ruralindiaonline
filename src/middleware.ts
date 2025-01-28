import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// function rewrite() {

// }

// function isEqual(path1: string, path2: string) {
//     return path1 === path2;
// }

const oldsite = 'https://test1.ruralindiaonline.org/';

function rewriteToLegacy(path: string, lang: string) {
	const url = new URL(`/${lang}${path}`, oldsite);
	return NextResponse.rewrite(url);
}

// Middleware to handle redirects
export function middleware(request: NextRequest) {
	// console.log("Middleware request URL:", request.nextUrl.pathname);
	const { pathname } = request.nextUrl;

	const supportedLanguages = ['en', 'hi', 'ur', 'mr', 'or', 'ba'];

	const langMatch = pathname.match(/^\/(en|hi|ta|mr|or|ba)(\/|$)/);
	const lang = langMatch ? langMatch[1] : 'en';

	// Check if the incoming request is for '/donate-pari'
	if (pathname === '/donate-pari' || pathname === `/${lang}/donate-pari`) {
		return rewriteToLegacy('/pages/donate/', lang);
	}

    // if (pathname.startsWith('/library') || pathname.startsWith(`/${lang}/library`)) {
    //     const libraryPath = pathname.replace(`/${lang}`, '') || '/library';
    //     return rewriteToLegacy(libraryPath, lang);
    // }

    if (pathname === '/library' || pathname === `/${lang}/library`) {
        return rewriteToLegacy("/library/", lang)

    }

	if (pathname === '/contribute' || pathname === `/${lang}/guideline`) {
        return rewriteToLegacy("/contribute/", lang)

    }

    
    if (pathname === '/guideline' || pathname === `/${lang}/guideline`) {
        return rewriteToLegacy("/pages/guidelines/", lang)

    }

	// Allow other requests to proceed as normal
	return NextResponse.next();
}

// Config to match all paths
export const config = {
	matcher: '/:path*', // Apply middleware to all routes
};
