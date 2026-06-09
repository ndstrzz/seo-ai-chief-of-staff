export const dynamic = "force-dynamic";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type SpotifyUser = {
  id: string;
};

type SpotifyPlaylist = {
  id: string;
  external_urls: {
    spotify: string;
  };
};

const seedQueries = [
  "lofi jazz instrumental",
  "acoustic coffeehouse",
  "soft piano instrumental",
  "corporate lounge jazz",
  "chillhop instrumental",
  "ambient piano",
  "bossa nova instrumental",
  "soft acoustic instrumental",
];

async function spotifyFetch<T>(
  url: string,
  accessToken: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(
      `Spotify request failed: ${response.status} ${text || response.statusText}`,
    );
  }

  if (!text) {
    return {} as T;
  }

  return JSON.parse(text) as T;
}

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      message:
        "Spotify create-playlist route is alive. Use POST to create a playlist.",
    },
    { status: 200 },
  );
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("spotify_access_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Spotify is not connected.",
          connectUrl: "/api/spotify/login",
        },
        { status: 401 },
      );
    }

    const body = (await request.json().catch(() => ({}))) as {
      title?: string;
    };

    const user = await spotifyFetch<SpotifyUser>(
      "https://api.spotify.com/v1/me",
      accessToken,
    );

    const playlist = await spotifyFetch<SpotifyPlaylist>(
      `https://api.spotify.com/v1/users/${user.id}/playlists`,
      accessToken,
      {
        method: "POST",
        body: JSON.stringify({
          name: body.title || "SEO — Corporate LPA Seminar Playlist",
          description:
            "Created by SEO, your AI Chief of Staff. Warm, professional, low-distraction seminar playlist.",
          public: false,
        }),
      },
    );

    const trackUris: string[] = [];

    for (const query of seedQueries) {
      const search = await spotifyFetch<{
        tracks?: {
          items?: Array<{
            uri: string;
          }>;
        };
      }>(
        `https://api.spotify.com/v1/search?${new URLSearchParams({
          q: query,
          type: "track",
          limit: "3",
        }).toString()}`,
        accessToken,
      );

      for (const item of search.tracks?.items ?? []) {
        if (item.uri && !trackUris.includes(item.uri)) {
          trackUris.push(item.uri);
        }
      }
    }

    if (trackUris.length > 0) {
      await spotifyFetch(
        `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
        accessToken,
        {
          method: "POST",
          body: JSON.stringify({
            uris: trackUris.slice(0, 24),
          }),
        },
      );
    }

    return NextResponse.json({
      success: true,
      playlistUrl: playlist.external_urls.spotify,
      trackCount: trackUris.slice(0, 24).length,
    });
  } catch (error) {
    console.error("Spotify playlist creation failed:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create Spotify playlist.",
      },
      { status: 500 },
    );
  }
}