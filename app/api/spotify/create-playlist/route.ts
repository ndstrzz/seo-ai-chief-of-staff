export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type SpotifyPlaylist = {
  id: string;
  external_urls: {
    spotify: string;
  };
};

const seedQueries = [
  "lofi jazz instrumental",
  "acoustic coffeehouse instrumental",
  "soft piano instrumental",
  "corporate lounge jazz",
  "chillhop instrumental",
  "ambient piano",
];

async function spotifyFetch<T>(
  label: string,
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
      `${label} failed: ${response.status} ${text || response.statusText}`,
    );
  }

  if (!text) {
    return {} as T;
  }

  return JSON.parse(text) as T;
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message:
      "Spotify create-playlist route is alive. Use POST to create a playlist.",
  });
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

    const playlist = await spotifyFetch<SpotifyPlaylist>(
      "Create Spotify playlist",
      "https://api.spotify.com/v1/me/playlists",
      accessToken,
      {
        method: "POST",
        body: JSON.stringify({
          name: body.title || "SEO — Corporate Seminar Playlist",
          description:
            "Created by SEO, your AI Chief of Staff. Warm, professional, low-distraction seminar playlist.",
          public: true,
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
        `Search tracks: ${query}`,
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
        "Add tracks to playlist",
        `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
        accessToken,
        {
          method: "POST",
          body: JSON.stringify({
            uris: trackUris.slice(0, 18),
          }),
        },
      );
    }

    return NextResponse.json({
      success: true,
      playlistUrl: playlist.external_urls.spotify,
      trackCount: trackUris.slice(0, 18).length,
    });
  } catch (error) {
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
//