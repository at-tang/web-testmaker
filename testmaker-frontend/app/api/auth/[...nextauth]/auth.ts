import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

async function refreshAccessToken(token: Record<string, unknown>) {
    const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
            client_id: process.env.AUTH_GOOGLE_ID!,
            client_secret: process.env.AUTH_GOOGLE_SECRET!,
            grant_type: 'refresh_token',
            refresh_token: token.refreshToken as string,
        }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
        throw refreshedTokens;
    }

    return {
        ...token,
        accessToken: refreshedTokens.access_token,
        expiresAt: Math.floor(Date.now() / 1000) + refreshedTokens.expires_in,
        refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
        idToken: refreshedTokens.id_token ?? token.idToken,
    };
}

export const {auth, handlers, signIn, signOut} = NextAuth({
    providers: [Google({
        authorization: {
            params: {
                access_type: 'offline',
                prompt: 'consent',
                response_type: 'code',
            },
        },
    })],
    session: {strategy: "jwt"},
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
            }

            if (account) {
                token.accessToken = account.access_token;
                token.expiresAt = account.expires_at;
                token.refreshToken = account.refresh_token;
                token.idToken = account.id_token;
            }

            if (token.expiresAt && Date.now() < (token.expiresAt as number) * 1000) {
                return token;
            }

            if (token.refreshToken) {
                try {
                    return await refreshAccessToken(token);
                } catch {
                    return {...token, error: 'RefreshTokenError'};
                }
            }

            return token;
        },
        async session({ session, token }) {
            if (session.user && typeof token.id === 'string') {
                session.user.id = token.id;
            }

            session.accessToken = token.accessToken as string | undefined;
            session.idToken = token.idToken as string | undefined;
            session.error = token.error as string | undefined;

            return session;
        },
    },
})




