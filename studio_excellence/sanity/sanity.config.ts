import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { structure } from './structure'

export default defineConfig({
  name: 'default',
  title: 'studio-excellence',

  projectId: 'bc55xe4j',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
  },

  tools: (prev, {currentUser}) => {
    const isAdmin = currentUser?.roles?.some(role => role.name === 'administrator');

    if(isAdmin){
      return prev;
    }

    return prev.filter((tool) => tool.name === 'vision')
  }
})
