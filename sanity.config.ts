import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { table } from '@sanity/table'
import {documentListWidget} from 'sanity-plugin-dashboard-widget-document-list'
import {
  dashboardTool,
  sanityTutorialsWidget,
  projectUsersWidget,
  projectInfoWidget,
} from "@sanity/dashboard";
import { myWidget } from './widgets/CheckinsToAdd.tsx'

export default defineConfig({
  name: 'default',
  title: 'Beers List',

  projectId: '75ecmzpn',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), dashboardTool({widgets:[myWidget()]})],

  schema: {
    types: schemaTypes,
  },
})
