import { useAppSelector } from "@/app/hooks"
import PostCard from "@/components/cards/PostCard"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import type { Post } from "@/entities/post.types"
import type { BasePagination } from "@/services/api/api.types"
import postApi from "@/services/api/post/postApi"
import type { Pagination } from "@/types/pagination.types"
import React from "react"

const Home = () => {
  const { authenticated } = useAppSelector((state) => state.auth)
  const [posts, setPosts] = React.useState<Post[]>([])
  const [loading, setLoading] = React.useState({
    initial: true,
    more: false,
  })
  const [pagination, setPagination] = React.useState<Pagination>({
    currentPage: 1,
  })
  const [canLoadMore, setCanLoadMore] = React.useState<boolean>(true)

  const fetchPosts = async (page: number = 1) => {
    const posts = await postApi.getPosts({ page })
      .then(({ posts }) => posts)
      .catch((error) => {
        console.error("Failed to fetch posts:", error)
        return null
      })
    return posts
  }

  const handleSetPosts = (postPagination: BasePagination<Post>, mode: 'add' | 'append') => {
    setPosts(prev => {
      if (mode === 'add') return postPagination.data
      if (mode === 'append') return [...prev, ...postPagination.data]
      return prev
    })
    setPagination((prev) => ({
      ...prev,
      currentPage: postPagination.meta.current_page,
      lastPage: postPagination.meta.last_page,
      total: postPagination.meta.total,
      perPage: postPagination.meta.per_page,
    }))
    setCanLoadMore(postPagination.meta.current_page < postPagination.meta.last_page)
  }

  React.useEffect(() => {
    const loadPost = async () => {
      setPosts([])
      setCanLoadMore(true)
      setLoading((prev) => ({ ...prev, initial: true }))
      const initialPosts = await fetchPosts()
      if (initialPosts) handleSetPosts(initialPosts, 'add')
      setLoading((prev) => ({ ...prev, initial: false }))
    }
    loadPost()
  }, [authenticated])

  const loadMorePosts = async () => {
    if (loading.more || !canLoadMore) return
    setLoading((prev) => ({ ...prev, more: true }))
    const nextPage = pagination.currentPage + 1
    const newPostPagination = await fetchPosts(nextPage)
    if (newPostPagination?.data.length) handleSetPosts(newPostPagination, 'append')
    setLoading((prev) => ({ ...prev, more: false }))
  }

  return (
    <div className="min-h-main max-w-xl mx-auto py-8">
      {loading.initial && (
        // skeleton loading state
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
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
      {!loading.initial && posts.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <Button
            className="mt-4 w-full cursor-pointer"
            variant="outline"
            size="lg"
            onClick={loadMorePosts}
            disabled={loading.more || !canLoadMore}
          >
            {loading.more ? "Loading..." : canLoadMore ? "Load More" : "No More Posts"}
          </Button>
        </>
      )}

      {!loading.initial && posts.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No posts available. Please check back later or create a new post.
        </div>
      )}

    </div>
  )
}

export default Home