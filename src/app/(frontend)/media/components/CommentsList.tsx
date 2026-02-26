type Comment = {
  id: string
  name?: string
  body?: string
  createdAt?: string
}

const formatDate = (value?: string) =>
  value ? new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value)) : ''

const CommentsList = ({ comments }: { comments: Comment[] }) => {
  if (!comments?.length) return null

  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-xl font-semibold">{comments.length} Comment{comments.length > 1 ? 's' : ''}</h3>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="font-semibold text-gray-900">{comment.name || 'Anonymous'}</span>
              <span>{formatDate(comment.createdAt)}</span>
            </div>
            <p className="mt-2 text-gray-700 whitespace-pre-line">{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentsList
