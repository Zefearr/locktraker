'use server'

export async function searchPlayerByName(query: string) {
  if (!query || query.trim().length < 2) return null;

  try {
    const res = await fetch(`https://api.deadlock-api.com/v1/players/search?name=${encodeURIComponent(query)}`);
    if (!res.ok) return null;

    const data = await res.json();

    if (data) {
      return {
        name: data.account_name || data.name,
        rank: data.rank || 'N/A'
      };
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}

