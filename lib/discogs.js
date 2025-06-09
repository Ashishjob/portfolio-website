import axios from "axios";

export async function getDiscogsCollection() {
  const username = process.env.DISCOGS_USERNAME;
  const token = process.env.DISCOGS_TOKEN;

  let allReleases = [];
  let page = 1;
  let totalPages = 1;

  console.log(`Fetching page ${page}...`);
  console.log("API response:", res.data);

  while (page <= totalPages) {
    const res = await axios.get(
      `https://api.discogs.com/users/${username}/collection/folders/0/releases`,
      {
        headers: { Authorization: `Discogs token=${token}` },
        params: { page, per_page: 50 },
      }
    );

    const pageReleases = res.data.releases.map((item) => {
      console.log("Item from API:", item);
      return {
        id: item.id,
        title: item.basic_information.title,
        artist: item.basic_information.artists?.[0]?.name ?? "Unknown",
        cover: item.basic_information.cover_image,
        disk: "/vinyls/disks/placeholder.svg",
      };
    });

    allReleases = [...allReleases, ...pageReleases];
    totalPages = res.data.pagination.pages;
    page++;
  }

  return allReleases;
}
