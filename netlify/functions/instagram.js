const fetch = require('node-fetch');

const mockPosts = [
  { title: 'Reparación Premium', desc: 'Cambio de pantalla y teclado en tiempo récord. Resultado impecable.', likes: 1254, comments: 89, platform: 'ig', color: '#1a2a4a' },
  { title: 'Dato técnico', desc: '¿Tu PC está lenta? 3 señales de que necesita mantenimiento urgente.', likes: 2341, comments: 156, platform: 'ig', color: '#0a1628' },
  { title: 'Antes y después', desc: 'Limpieza profunda + cambio de pasta térmica. Resultado de nivel.', likes: 987, comments: 45, platform: 'ig', color: '#1e3a5f' },
  { title: 'Cliente 100% real', desc: '"Me salvaron los datos. Servicio premium de verdad" — Carlos M.', likes: 1876, comments: 123, platform: 'ig', color: '#0f2744' },
  { title: 'Nuevo servicio', desc: 'Soporte técnico remoto. Te ayudo sin salir de casa, rápido y seguro.', likes: 3421, comments: 234, platform: 'ig', color: '#2563eb' },
  { title: 'SSD vs HDD', desc: '¿Cuál elegir para tu PC? Te lo explico fácil y claro. Spoiler: SSD siempre.', likes: 1567, comments: 98, platform: 'ig', color: '#1a2a4a' },
];

exports.handler = async () => {
  try {
    const resp = await fetch('https://www.instagram.com/hddtecnologiastore/', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    const html = await resp.text();
    const sharedDataMatch = html.match(/<script type="text\/javascript">window\.__INITIAL_STATE__\s*=\s*({.+?});<\/script>/)
      || html.match(/window\.__INITIAL_STATE__\s*=\s*({.+?});/);
    if (sharedDataMatch) {
      const data = JSON.parse(sharedDataMatch[1]);
      const entries = [];
      const items = data?.entry?.ProfilePage?.[0]?.graphql?.user?.edge_owner_to_timeline_media?.edges;
      if (items && items.length > 0) {
        items.slice(0, 20).forEach((edge, i) => {
          const node = edge.node;
          entries.push({
            id: node.id, shortcode: node.shortcode,
            url: `https://www.instagram.com/p/${node.shortcode}/`,
            image: node.display_url,
            likes: node.edge_liked_by?.count || 0,
            comments: node.edge_media_to_comment?.count || 0,
            caption: node.edge_media_to_caption?.edges?.[0]?.node?.text?.slice(0, 120) || '',
            title: `Publicación ${i + 1}`,
            platform: 'ig', color: '#1a2a4a'
          });
        });
        return { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(entries) };
      }
    }
  } catch (_) {}
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(mockPosts)
  };
};
