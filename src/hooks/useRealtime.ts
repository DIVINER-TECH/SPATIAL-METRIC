import { useEffect, useRef } from 'react'
import { supabase } from '@/integrations/supabase/client'

type Callback<T = any> = (payload: T) => void

export function useRealtime<T = any>(
  table: string,
  callback: Callback<T>,
  opts?: { event?: 'INSERT' | 'UPDATE' | 'DELETE' | 'ALL'; filter?: string }
) {
  const subRef = useRef<any>(null)

  useEffect(() => {
    if (!supabase) return

    const event = opts?.event === 'ALL' ? '*' : opts?.event ?? '*'
    const channel = supabase.channel(`realtime:${table}`)

    const builder = channel.on(
      'postgres_changes',
      { event, schema: 'public', table, filter: opts?.filter },
      (payload) => {
        callback(payload)
      }
    )

    channel.subscribe()
    subRef.current = channel

    return () => {
      try {
        subRef.current?.unsubscribe()
      } catch (e) {
        // ignore
      }
    }
  }, [table, opts?.event, opts?.filter])
}

export default useRealtime
