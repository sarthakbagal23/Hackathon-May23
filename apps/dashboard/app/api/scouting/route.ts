import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = getSupabase()
    if (!supabase) {
      return NextResponse.json({ entries: [] }, { status: 200 })
    }
    const { data, error } = await supabase
      .from('scouting_entries')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json({ entries: data || [] })
  } catch (err) {
    return NextResponse.json({ entries: [] }, { status: 200 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabase()
    if (!supabase) {
      // Parse body to return it back as a "stored" entry when Supabase isn't configured
      const body = (await req.json()) as Record<string, unknown>
      return NextResponse.json({
        entry: {
          id: crypto.randomUUID?.() ?? Math.random().toString(36),
          created_at: new Date().toISOString(),
          ...body,
        },
      })
    }
    const body = await req.json()
    const { data, error } = await supabase
      .from('scouting_entries')
      .insert([body])
      .select()

    if (error) throw error
    return NextResponse.json({ entry: data?.[0] })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
