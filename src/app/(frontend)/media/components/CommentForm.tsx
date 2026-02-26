'use client'

import React, { useState } from 'react'

type Props = {
  postId: string
}

const CommentForm: React.FC<Props> = ({ postId }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, name, email, body }),
      })
      const data = await res.json()
      if (!res.ok || data?.error) {
        throw new Error(data?.error || 'Unable to submit comment')
      }
      setStatus('Submitted for approval. Visible after admin review.')
      setName('')
      setEmail('')
      setBody('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit comment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-3">Leave a Comment</h3>
      {/* <p className="text-sm text-gray-600 mb-4">Comments will appear after admin approval.</p> */}
      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            required
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <textarea
          required
          placeholder="Write your comment"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-primary min-h-[140px]"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-fit rounded-full bg-primary text-white px-6 py-2 font-semibold hover:opacity-90 disabled:opacity-60"
        >
          {loading ? 'Submitting...' : 'Comment'}
        </button>
        {status && <p className="text-sm text-green-700">{status}</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    </div>
  )
}

export default CommentForm
