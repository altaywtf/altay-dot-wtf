const entityMap: { [key: string]: string } = {
  '"': '&quot;',
  '&': '&amp;',
  "'": '&#39;',
  '/': '&#x2F;',
  '<': '&lt;',
  '>': '&gt;',
}

export const sanitizeHtml = (html: string) =>
  String(html).replace(/[&<>"']/g, (key) => entityMap[key])
