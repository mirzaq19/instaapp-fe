import PostCard from "@/components/cards/PostCard"
import { Button } from "@/components/ui/button"
import type { Post } from "@/entities/post.types"
import type { BasePagination } from "@/services/api/api.types"
import postApi from "@/services/api/post/postApi"
import type { Pagination } from "@/types/pagination.types"
import React from "react"

const Home = () => {
  const [posts, setPosts] = React.useState<Post[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [pagination, setPagination] = React.useState<Pagination>({
    currentPage: 1,
  })
  const [canLoadMore, setCanLoadMore] = React.useState<boolean>(true)

  const fetchPosts = async (page: number = 1) => {
    setLoading(true)
    const posts = await postApi.getPosts({ page })
      .then(({ posts }) => posts)
      .catch((error) => {
        console.error("Failed to fetch posts:", error)
        return null
      })
      .finally(() => {
        setLoading(false)
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
      const initialPosts = await fetchPosts()
      if (initialPosts) handleSetPosts(initialPosts, 'add')
    }
    loadPost()
  }, [])

  const loadMorePosts = async () => {
    if (loading || !canLoadMore) return
    const nextPage = pagination.currentPage + 1
    const newPostPagination = await fetchPosts(nextPage)
    if (newPostPagination?.data.length) handleSetPosts(newPostPagination, 'append')
  }

  return (
    <div className="min-h-main max-w-xl mx-auto py-8">
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <Button
        className="mt-4 w-full"
        variant="outline"
        size="lg"
        onClick={loadMorePosts}
        disabled={loading || !canLoadMore}
      >
        {loading ? "Loading..." : canLoadMore ? "Load More" : "No More Posts"}
      </Button>
    </div>
  )
}

export default Home