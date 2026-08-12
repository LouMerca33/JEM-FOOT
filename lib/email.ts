import { Resend } from 'resend';

const NOTIFY_TO = 'lmercadier1@gmail.com';

// Envoie une notification email quand un nouveau message de contact arrive.
// Best-effort : si ça échoue (clé absente, quota dépassé...), le message
// reste quand même bien enregistré en base et visible dans /admin/messages
// — l'email n'est qu'un plus, jamais un point de blocage.
export async function notifyNewContactMessage(data: {
  nom: string;
  email: string;
  objet: string | null;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY absente : notification email ignorée.');
    return;
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: 'J.E.M — Site web <onboarding@resend.dev>',
      to: NOTIFY_TO,
      replyTo: data.email,
      subject: `Nouveau message : ${data.objet ?? 'Contact'} — ${data.nom}`,
      text: `Nouveau message reçu via jem-foot.fr\n\nDe : ${data.nom} (${data.email})\nObjet : ${data.objet ?? '—'}\n\n${data.message}\n\n— Répondre directement à cet email pour contacter ${data.nom}.`,
    });
  } catch (err) {
    console.error('Échec envoi notification email:', err);
  }
}
