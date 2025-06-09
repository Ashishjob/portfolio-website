import axios from 'axios';

export default async function handler(req, res) {
  const { DISCOGS_USERNAME, DISCOGS_TOKEN } = process.env;

  try {
    const releases = [];
    let page = 1;
    let totalPages = 1;

    while (page <= totalPages) {
      const apiRes = await axios.get(`https://api.discogs.com/users/${DISCOGS_USERNAME}/collection/folders/0/releases`, {
        headers: {
          Authorization: `Discogs token=${DISCOGS_TOKEN}`,
        },
        params: { page, per_page: 50 },
      });

      totalPages = apiRes.data.pagination.pages;

      apiRes.data.releases.forEach((item) => {
        releases.push({
          id: item.id,
          title: item.basic_information.title,
          artist: item.basic_information.artists?.[0]?.name ?? 'Unknown',
          cover: item.basic_information.cover_image,
          disk: '/vinyls/disks/placeholder.svg',
        });
      });

      page++;
    }

    res.status(200).json(releases);
  } catch (error) {
    console.error("API proxy error:", error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch Discogs collection' });
  }
}
