'use client'

import React, { useEffect, useMemo, useState } from 'react'

type RefreshResponse = {
  accessToken?: string
  expiresIn?: number
  lastRefreshedAt?: string
  error?: string
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

const InstagramRefreshButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [lastRefreshedAt, setLastRefreshedAt] = useState<string | null>(null)

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/globals/instagram-settings', { method: 'GET' })
      if (!res.ok) return
      const data = await res.json()
      if (data?.lastRefreshedAt) {
        setLastRefreshedAt(data.lastRefreshedAt)
      }
    } catch (err) {
      // Silently ignore status fetch errors
      console.error('instagram status fetch error', err)
    }
  }

  useEffect(() => {
    fetchStatus()
  }, [])

  const onRefresh = async () => {
    setLoading(true)
    setError(null)
    setMessage(null)
    try {
      const res = await fetch('/api/instagram-refresh', { method: 'POST' })
      const data: RefreshResponse = await res.json()
      if (!res.ok || data?.error) {
        throw new Error(data?.error || 'Failed to refresh token')
      }
      setLastRefreshedAt(data.lastRefreshedAt ?? null)
      setMessage('Token refreshed successfully')
      // Also refresh form data displayed in admin
      fetchStatus()
    } catch (err) {
      console.error('instagram refresh error', err)
      setError(err instanceof Error ? err.message : 'Failed to refresh token')
    } finally {
      setLoading(false)
    }
  }

  const daysUntil50 = useMemo(() => {
    if (!lastRefreshedAt) return null
    const refreshed = new Date(lastRefreshedAt).getTime()
    if (Number.isNaN(refreshed)) return null
    const daysSince = Math.floor((Date.now() - refreshed) / (1000 * 60 * 60 * 24))
    return Math.max(0, 50 - daysSince)
  }, [lastRefreshedAt])

  return (
    <div className="field-type">
      <div className="label">Refresh Instagram Token</div>
      <div className="description">Use this to renew the long-lived token (valid ~60 days). Refresh every 50 days.</div>
      <div className="flex items-center gap-2" style={{ marginTop: '0.75rem', marginBottom: '0.25rem' }}>
        <button
          type="button"
          className="btn btn--style-primary"
          onClick={onRefresh}
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh token'}
        </button>
        {message && <span className="success" style={{ color: '#15803d' }}>{message}</span>}
        {error && <span className="error" style={{ color: '#b91c1c' }}>{error}</span>}
      </div>
      <div className="description" style={{ marginTop: '0.25rem' }}>
        {lastRefreshedAt ? (
          <>
            Last refreshed: {dateFormatter.format(new Date(lastRefreshedAt))}.{' '}
            {daysUntil50 !== null ? `Days until recommended renewal: ${daysUntil50}` : null}
          </>
        ) : (
          'No refresh recorded yet.'
        )}
      </div>
    </div>
  )
}

export default InstagramRefreshButton
