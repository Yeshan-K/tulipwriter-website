import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {getFirebaseAuth} from 'next-firebase-auth-edge/lib/auth';
import {refreshNextResponseCookies} from 'next-firebase-auth-edge/lib/next/cookies';
import {getTokens} from 'next-firebase-auth-edge/lib/next/tokens';
import { authConfig } from 'lib/config';


const {setCustomUserClaims, getUser} = getFirebaseAuth({
  serviceAccount: authConfig.serviceAccount,
  apiKey: authConfig.apiKey,
  enableCustomToken: authConfig.enableCustomToken
});

export async function POST(request: NextRequest) {
  const tokens = await getTokens(request.cookies, authConfig);

  if (!tokens) {
    throw new Error('Cannot update custom claims of unauthenticated user');
  }

  await setCustomUserClaims(tokens.decodedToken.uid, {
    someCustomClaim: {
      updatedAt: Date.now()
    }
  });

  const user = await getUser(tokens.decodedToken.uid);
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  const response = new NextResponse(
    JSON.stringify({
      customClaims: user?.customClaims
    }),
    {
      status: 200,
      headers
    }
  );

  return refreshNextResponseCookies(request, response, authConfig);
}