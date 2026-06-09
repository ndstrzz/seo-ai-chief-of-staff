import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function getSafeReturnTo(request: Request) {
  const url = new URL(request.url);
  const returnTo = url.searchParams.get("returnTo") || "/";

  if (!returnTo.startsWith("/") || returnTo.startsWith("//")) {
    return "/";
  }

  return returnTo;
}

export async function GET(request: Request) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      { error: "Spotify environment variables are missing." },
      { status: 500 },
    );
  }

  const returnTo = getSafeReturnTo(request);
  const state = crypto.randomUUID();

  const scope = [
    "playlist-modify-public",
    "playlist-modify-private",
    "user-read-email",
    "user-read-private",
  ].join(" ");

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope,
    redirect_uri: redirectUri,
    state,
    show_dialog: "true",
  });

  const response = NextResponse.redirect(
    `https://accounts.spotify.com/authorize?${params.toString()}`,
  );

  response.cookies.delete("spotify_access_token");
  response.cookies.delete("spotify_refresh_token");

  response.cookies.set("spotify_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });

  response.cookies.set("spotify_return_to", returnTo, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });

  return response;
}