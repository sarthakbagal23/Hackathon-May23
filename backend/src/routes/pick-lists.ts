import { Router } from 'express'
import type { Request, Response } from 'express'
import { isSupabaseConnected, supabase } from '../lib/supabase.js'

const router = Router()

let memoryPickLists: any[] = []

router.get('/', async (_req: Request, res: Response) => {
  try {
    if (isSupabaseConnected && supabase) {
      const { data, error } = await supabase.from('pick_lists').select('*').order('created_at', { ascending: false })
      if (error) throw error
      res.json({ pickLists: data || [] })
      return
    }
    res.json({ pickLists: memoryPickLists })
  } catch (err) {
    res.json({ pickLists: memoryPickLists, warning: 'Using demo mode' })
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const newList = { id: crypto.randomUUID(), ...req.body, created_at: new Date().toISOString() }
    if (isSupabaseConnected && supabase) {
      const { data, error } = await supabase.from('pick_lists').insert(newList).select()
      if (error) throw error
      res.json({ pickList: data?.[0] || newList })
      return
    }
    memoryPickLists.push(newList)
    res.json({ pickList: newList })
  } catch (err) {
    res.status(500).json({ error: 'Failed to create pick list' })
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (isSupabaseConnected && supabase) {
      const { error } = await supabase.from('pick_lists').delete().eq('id', id)
      if (error) throw error
      res.json({ success: true })
      return
    }
    memoryPickLists = memoryPickLists.filter(l => l.id !== id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete pick list' })
  }
})

export default router
