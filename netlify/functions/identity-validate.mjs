export async function handler(event) {
  let raw = event.body || ''
  if (event.isBase64Encoded && raw) {
    try {
      raw = Buffer.from(raw, 'base64').toString('utf8')
    } catch {}
  }
  let email = ''
  try {
    const parsed = JSON.parse(raw)
    email = parsed.email || (parsed.user && parsed.user.email) || ''
  } catch {}
  if (!email) {
    const m = String(raw).match(/[\w.+-]+@[\w-]+\.[\w.-]+/)
    if (m) email = m[0]
  }
  if (!email && event.queryStringParameters && event.queryStringParameters.email) {
    email = event.queryStringParameters.email
  }
  email = String(email || '').toLowerCase()
  const allow = (process.env.IDENTITY_ALLOW_EMAILS || '')
    .toLowerCase()
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  console.log(`identity-validate: ${email || '(sin-email)'} -> ${email && allow.includes(email) ? 'permitido' : 'bloqueado'}`)
  if (email && allow.includes(email)) {
    return { statusCode: 200, body: '{}' }
  }
  return {
    statusCode: 403,
    body: JSON.stringify({
      msg: 'Registro cerrado. Contacta al administrador para una invitación.',
      debug: email ? 'not-allowed' : 'no-email',
    }),
  }
}
