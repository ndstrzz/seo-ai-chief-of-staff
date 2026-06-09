import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function getSafeReturnTo(returnTo?: string) {
  if (!returnTo || !returnTo.startsWith("/") || returnTo.startsWith("//")) {
    return "/";
  }

  return returnTo;
}

function withSpotifyStatus(path: string, status: "connected" | "failed") {
  const [pathname, query = ""] = path.split("?");
  const params = new URLSearchParams(query);
  params.set("spotify", status);

  return `${pathname}?${params.toString()}`;
}

export async function GET(request: Request) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json(
      { error: "Spotify environment variables are missing." },
      { status: 500 },
    );
  }

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieStore = await cookies();
  const storedState = cookieStore.get("spotify_oauth_state")?.value;
  const returnTo = getSafeReturnTo(cookieStore.get("spotify_return_to")?.value);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || url.origin;

  if (!code || !state || !storedState || state !== storedState) {
    const response = NextResponse.redirect(
      `${appUrl}${withSpotifyStatus(returnTo, "failed")}`,
    );
    response.cookies.delete("spotify_oauth_state");
    response.cookies.delete("spotify_return_to");
    return response;
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();

    console.error(
      "Spotify token exchange failed:",
      tokenResponse.status,
      errorText,
    );

    const response = NextResponse.redirect(
      `${appUrl}${withSpotifyStatus(returnTo, "failed")}`,
    );
    response.cookies.delete("spotify_oauth_state");
    response.cookies.delete("spotify_return_to");
    return response;
  }

  const tokenData = (await tokenResponse.json()) as {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
    scope?: string;
  };

  console.log("Spotify token granted scopes:", tokenData.scope);

  const response = NextResponse.redirect(
    `${appUrl}${withSpotifyStatus(returnTo, "connected")}`,
  );

  response.cookies.set("spotify_access_token", tokenData.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: tokenData.expires_in,
  });

  if (tokenData.refresh_token) {
    response.cookies.set("spotify_refresh_token", tokenData.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  response.cookies.delete("spotify_oauth_state");
  response.cookies.delete("spotify_return_to");

  return response;
}