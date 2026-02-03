import { siteSettings } from './siteSettings'
import { page } from './page'
import { teamMember } from './teamMember'
import { koor } from './koor'
import { event } from './event'
import { blockContent } from './blockContent'

export const schemaTypes = [
  // Singletons
  siteSettings,
  // Documents
  page,
  teamMember,
  koor,
  event,
  // Objects
  blockContent,
]
