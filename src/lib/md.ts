import { marked } from 'marked'

export const parse = (m: string) => marked.parse(m) as string
