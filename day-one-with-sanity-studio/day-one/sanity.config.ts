import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { structure } from './structure'
import { defaultDocumentNode } from './defaultDocumentNode'

export default defineConfig({
  name: 'default',
  title: 'march-day-one',

  projectId: '4u1tajy3',
  dataset: 'production',

  plugins: [structureTool({structure, defaultDocumentNode}), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
