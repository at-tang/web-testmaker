import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

export const {auth, handlers, signIn, signOut} = NextAuth({
    providers: [Google],
    session: {strategy: "jwt"},
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
            }

            if (account) {
                token.accessToken = account.access_token;
                token.idToken = account.id_token;
            }

            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string | undefined;
            }

            session.accessToken = token.accessToken as string | undefined;
            session.idToken = token.idToken as string | undefined;

            return session;
        },
    },
})




