export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type SpotifyUser = {
  id: string;
  display_name?: string;
  product?: string;
};

type SpotifyPlaylist = {
  id: string;
  external_urls: {
    spotify: string;
  };
};

type SpotifySearchResponse = {
  tracks?: {
    items?: Array<{
      uri?: string;
      name?: string;
    }>;
  };
};

type PlaylistPayload = {
  id?: string;
  name?: string;
  description?: string;
  details?: string;
  seedQueries?: string[];
  tracks?: Array<{
    title?: string;
    searchQuery?: string;
  }>;
};

const fallbackSeedQueries = [
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
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const text = await response.text();

  if (!response.ok) {
    console.log("========== SPOTIFY DEBUG ==========");
    console.log("LABEL:", label);
    console.log("URL:", url);
    console.log("STATUS:", response.status);
    console.log("BODY:", text);
    console.log("===================================");

    throw new Error(
      `${label} failed: ${response.status} ${text || response.statusText}`,
    );
  }

  if (!text) {
    return {} as T;
  }

  return JSON.parse(text) as T;
}

function buildSearchQueries(playlist?: PlaylistPayload) {
  const trackQueries =
    playlist?.tracks
      ?.map((track) => track.searchQuery || track.title)
      .filter((query): query is string => Boolean(query)) ?? [];

  const seedQueries = playlist?.seedQueries ?? [];

  return Array.from(
    new Set([...trackQueries, ...seedQueries, ...fallbackSeedQueries]),
  ).slice(0, 10);
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

    console.log("Access token exists:", Boolean(accessToken));

    if (accessToken) {
      console.log("Access token preview:", `${accessToken.substring(0, 20)}...`);
    }

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
      playlist?: PlaylistPayload;
    };

    const selectedPlaylist = body.playlist;

    const user = await spotifyFetch<SpotifyUser>(
      "Get Spotify user",
      "https://api.spotify.com/v1/me",
      accessToken,
      {
        method: "GET",
      },
    );

    console.log("Spotify user:", user);

    if (!user.id) {
      throw new Error("Spotify user ID was not found.");
    }

    const playlistName =
      selectedPlaylist?.name || body.title || "SEO — Corporate Seminar Playlist";

    const playlistDescription =
      selectedPlaylist?.details ||
      selectedPlaylist?.description ||
      "Created by SEO, your AI Chief of Staff. Warm, professional, low-distraction seminar playlist.";

    const createdPlaylist = await spotifyFetch<SpotifyPlaylist>(
      "Create Spotify playlist",
      `https://api.spotify.com/v1/users/${encodeURIComponent(
        user.id,
      )}/playlists`,
      accessToken,
      {
        method: "POST",
        body: JSON.stringify({
          name: playlistName,
          description: playlistDescription.slice(0, 300),
          public: false,
          collaborative: false,
        }),
      },
    );

    const trackUris: string[] = [];
    const searchQueries = buildSearchQueries(selectedPlaylist);

    for (const query of searchQueries) {
      const searchParams = new URLSearchParams({
        q: query,
        type: "track",
        limit: "3",
        market: "SG",
      });

      const search = await spotifyFetch<SpotifySearchResponse>(
        `Search tracks: ${query}`,
        `https://api.spotify.com/v1/search?${searchParams.toString()}`,
        accessToken,
        {
          method: "GET",
        },
      );

      for (const item of search.tracks?.items ?? []) {
        if (item.uri && !trackUris.includes(item.uri)) {
          trackUris.push(item.uri);
        }
      }
    }

    const finalTrackUris = trackUris.slice(0, 18);

    if (finalTrackUris.length > 0) {
      await spotifyFetch(
        "Add tracks to playlist",
        `https://api.spotify.com/v1/playlists/${encodeURIComponent(
          createdPlaylist.id,
        )}/tracks`,
        accessToken,
        {
          method: "POST",
          body: JSON.stringify({
            uris: finalTrackUris,
            position: 0,
          }),
        },
      );
    }

    return NextResponse.json({
      success: true,
      playlistUrl: createdPlaylist.external_urls.spotify,
      playlistId: createdPlaylist.id,
      trackCount: finalTrackUris.length,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to create Spotify playlist.";

    return NextResponse.json(
      {
        success: false,
        error: message,
        hint:
          message.includes("403")
            ? "Check Spotify app Users and Access, reconnect Spotify, and confirm playlist-modify-private/public scopes were granted."
            : undefined,
      },
      { status: 500 },
    );
  }
}