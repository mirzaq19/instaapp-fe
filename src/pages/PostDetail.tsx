import { useAppSelector } from '@/app/hooks'
import PostCard from '@/components/cards/PostCard'
import CommentBox from '@/components/forms/CommentBox'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import type { Comment } from '@/entities/comment.types'
import type { Post } from '@/entities/post.types'
import commentApi from '@/services/api/comment/commentApi'
import postApi from '@/services/api/post/postApi'
import React from 'react'
import toast from 'react-hot-toast'
import { Link, useParams } from 'react-router'

const PostDetail = () => {
  const { authenticated, user } = useAppSelector((state) => state.auth);
  const { postId } = useParams()
  const [loading, setLoading] = React.useState({
    initial: true,
    comments: false,
  })
  const [post, setPost] = React.useState<Post>()
  const [comments, setComments] = React.useState<Comment[]>([])

  const onCommentSubmit = async (comment: string) => {
    if (!authenticated) {
      console.error('User must be authenticated to comment')
      return
    }

    await commentApi.addComment(Number(postId), comment)
      .then((response) => {
        setComments((prev) => [{
          id: response.comment_id,
          content: comment,
          user: {
            id: user?.id || 0,
            username: user?.username || '',
            name: user?.name || '',
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, ...prev])
      })
      .catch((error) => {
        console.error('Failed to add comment:', error)
        toast.error(error.message || 'Failed to add comment')
      })
  };

  React.useEffect(() => {
    // Fetch post details using postId
    const fetchPost = async () => {
      // Simulate fetching post data
      setLoading((prev) => ({ ...prev, initial: true }))
      await postApi.getPost(Number(postId))
        .then((response) => {
          setPost(response.post)
        })
        .catch((error) => {
          console.error('Failed to fetch post:', error)
        })
      setLoading((prev) => ({ ...prev, initial: false }))

      // Fetch comments for the post
      setLoading((prev) => ({ ...prev, comments: true }))
      await commentApi.getPostComments(Number(postId))
        .then((response) => {
          setComments(response.comments)
        })
        .catch((error) => {
          console.error('Failed to fetch comments:', error)
        })
      setLoading((prev) => ({ ...prev, comments: false }))
    }

    fetchPost()
  }, [postId])

  return (
    <div className="min-h-main max-w-xl mx-auto py-8">
      {loading.initial && (
        // skeleton loading state
        <div className="space-y-4">
          {Array.from({ length: 1 }).map((_, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow">
              <div className="flex items-center gap-4 mb-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex flex-col">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-48 w-full mb-4" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading.initial && post && (
        <>
          <PostCard post={post} />

          {!authenticated && (
            <div className="bg-white p-4 rounded-lg mt-4">
              <p className="text-center text-slate-700">
                Please{' '}
                <Link className="hover:underline" to="/login">
                  <b>login</b>
                </Link>{' '}
                to comment
              </p>
            </div>
          )}
          {authenticated && (
            <CommentBox onCommentSubmit={onCommentSubmit} className="mt-4" />
          )}

          {loading.comments && (
            <div className="space-y-4 mt-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="p-4 bg-white rounded-lg shadow">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          )}

          {!loading.comments && comments.length > 0 && (
            <div className="bg-white mt-4 space-y-4 p-4 rounded-lg shadow">
              <h3>Comments ({comments.length})</h3>
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${comment.user.username}&background=random`} />
                    <AvatarFallback>{comment.user.username[0]}</AvatarFallback>
                  </Avatar>
                  <p className="text-sm">
                    <span className='font-medium'>{comment.user.username}</span>
                    {' ' + comment.content}
                  </p>
                </div>
              ))}
            </div>
          )}

          {!loading.comments && comments.length === 0 && (
            <div className="mt-4 bg-white text-center text-gray-500 p-4 rounded-lg shadow">
              No comments yet. Be the first to comment!
            </div>
          )}
        </>
      )}

      {!loading.initial && !post && (
        <div className="text-center text-gray-500">
          Post not found.
        </div>
      )}
    </div>
  )
}

export default PostDetail