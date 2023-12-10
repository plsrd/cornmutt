import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from '@/sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'cornmutt',

  projectId: 'k8p6uw8a',
  dataset: 'cornmutt-dev',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
