import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

// Map document types to paths that should be revalidated
const typeToPath: Record<string, string[]> = {
  siteSettings: ['/'],
  page: ['/'],
  teamMember: ['/wie-zijn-wij'],
  koor: ['/koren', '/'],
  event: ['/evenementen'],
}

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string
      slug?: { current?: string }
    }>(req, process.env.SANITY_REVALIDATE_SECRET)

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 })
    }

    if (!body?._type) {
      return new NextResponse('Bad Request', { status: 400 })
    }

    const paths = typeToPath[body._type] || ['/']

    // Revalidate all relevant paths
    for (const path of paths) {
      revalidatePath(path)
    }

    // Also revalidate specific slug pages
    if (body.slug?.current) {
      if (body._type === 'koor') {
        revalidatePath(`/koren/${body.slug.current}`)
      } else if (body._type === 'page') {
        revalidatePath(`/${body.slug.current}`)
      }
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      paths,
    })
  } catch (err: unknown) {
    console.error(err)
    return new NextResponse(err instanceof Error ? err.message : 'Error', { status: 500 })
  }
}
