export const metadata = {
  title: 'Koor Fameus CMS',
  description: 'Content Management System voor Koor Fameus',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
