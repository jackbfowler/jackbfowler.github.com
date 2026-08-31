import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Extract project slugs to include in sitemap
const getProjectSlugs = () => {
  try {
    const projectsFile = fs.readFileSync(path.resolve(__dirname, 'src/data/projects.tsx'), 'utf-8')
    const slugRegex = /slug:\s*['"]([^'"]+)['"]/g
    const slugs = []
    let match
    while ((match = slugRegex.exec(projectsFile)) !== null) {
      slugs.push(`/projects/${match[1]}`)
    }
    return slugs
  } catch (e) {
    console.error('Failed to parse projects for sitemap', e)
    return []
  }
}

const dynamicRoutes = [
  '/projects', 
  '/resume',
  ...getProjectSlugs()
]

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://jackfowler.me',
      dynamicRoutes,
    })
  ],
  assetsInclude: ['**/*.mov', '**/*.pdf'],
})
