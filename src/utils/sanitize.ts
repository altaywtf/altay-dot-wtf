const entityMap: { [key: string]: string } = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
}

export const sanitizeHtml = (html: string) =>
  String(html).replace(/[&<>"']/g, (key) => entityMap[key])
