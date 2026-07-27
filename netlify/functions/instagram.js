const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const username = event.queryStringParameters?.username || 'hddtecnologiastore';
    const resp = await fetch(`https://www.instagram.com/${username}/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const html = await resp.text();
    const jsonMatch = html.match(/<script type="text\/javascript">window\.__INITIAL_STATE__\s*=\s*({.+?});<\/script>/);
    if (!jsonMatch) {
      const altMatch = html.match(/window\.__INITIAL_STATE__\s*=\s*({.+?});/);
      if (!altMatch) {
        return { statusCode: 404, body: JSON.stringify({ error: 'No se encontraron datos de Instagram' }) };
      }
      const data = JSON.parse(altMatch[1]);
      return processData(data, username);
    }
    const data = JSON.parse(jsonMatch[1]);
    return processData(data, username);
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};

function processData(data, username) {
  const entries = [];
  const items = data?.entry?.ProfilePage?.[0]?.graphql?.user?.edge_owner_to_timeline_media?.edges;
  if (items) {
    items.slice(0, 20).forEach((edge, i) => {
      const node = edge.node;
      entries.push({
        id: node.id,
        shortcode: node.shortcode,
        url: `https://www.instagram.com/p/${node.shortcode}/`,
        image: node.display_url,
        likes: node.edge_liked_by?.count || 0,
        comments: node.edge_media_to_comment?.count || 0,
        caption: node.edge_media_to_caption?.edges?.[0]?.node?.text?.slice(0, 120) || '',
        title: `Publicación ${i + 1}`,
        platform: 'ig',
        color: '#1a2a4a'
      });
    });
  }
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(entries)
  };
}
