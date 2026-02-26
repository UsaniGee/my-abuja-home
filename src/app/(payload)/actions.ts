'use server'

import { handleServerFunctions } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { importMap } from './admin/importMap'

export async function serverFunction(args: any) {
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}
