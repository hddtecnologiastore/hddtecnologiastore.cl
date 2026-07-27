const PLACE_ID = 'ChIJC6Bso6XPYpYRk9egCQTftUE';

const mockReviews = [
  { author: 'Carlos Mendoza', rating: 5, text: 'Mi notebook dejó de encender y pensé que era pérdida total. Alejandro lo diagnosticó rápido, cambió la placa madre y quedó como nuevo. Llevo 3 meses sin problemas. 100% recomendado.', date: 'Hace 2 meses', avatarColor: '#2563eb' },
  { author: 'Paola Riquelme', rating: 5, text: 'Le hice mantenimiento a mi PC gaming. Limpieza profunda, cambio de pasta térmica y optimización. Quedó volando. Se nota que sabe lo que hace. Súper profesional y puntual.', date: 'Hace 1 semana', avatarColor: '#1d4ed8' },
  { author: 'Miguel Ángel Soto', rating: 5, text: 'Perdí todos mis archivos por un disco duro dañado. Alejandro recuperó toda la información en menos de 24 horas. Me salvó la vida laboral. Infinitamente agradecido.', date: 'Hace 3 semanas', avatarColor: '#3b82f6' },
  { author: 'Javiera Muñoz', rating: 5, text: 'Excelente servicio técnico. Me instaló un SSD y más RAM a mi notebook y quedó como nueva. Me explicó todo el proceso, respondió todas mis dudas. Muy recomendable.', date: 'Hace 1 mes', avatarColor: '#60a5fa' },
  { author: 'Francisco Lara', rating: 5, text: 'Contraté a Alejandro para el soporte TI de mi PYME. Responde rápido, los problemas los soluciona al tiro y sus precios son justos. Llevamos 2 años trabajando con él, cero atados.', date: 'Hace 2 semanas', avatarColor: '#1a2a4a' },
  { author: 'Gabriela Espinoza', rating: 5, text: 'Mi iMac no daba video. Alejandro diagnosticó el problema exacto, reparó la placa y quedó impecable. Además me dio tips para mantenerlo óptimo. Un verdadero profesional.', date: 'Hace 1 mes', avatarColor: '#0f2744' },
];

exports.handler = async () => {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (apiKey) {
    try {
      const resp = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}?fields=reviews`, {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'Content-Type': 'application/json',
        }
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data.reviews && data.reviews.length > 0) {
          const colors = ['#2563eb', '#1d4ed8', '#3b82f6', '#60a5fa', '#1a2a4a', '#0f2744'];
          const reviews = data.reviews.map((r, i) => ({
            author: r.authorAttribution?.displayName || 'Cliente',
            rating: r.rating || 5,
            text: r.text?.text || '',
            date: r.relativePublishTimeDescription || '',
            avatarColor: colors[i % colors.length],
          }));
          return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify(reviews),
          };
        }
      }
    } catch (e) {
      console.error('Error fetching Google reviews:', e.message);
    }
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(mockReviews),
  };
};
