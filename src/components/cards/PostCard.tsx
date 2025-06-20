import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { EllipsisVertical, Heart, MessageCircle, Send, Trash } from 'lucide-react'
import type { Post } from '@/entities/post.types'
import { cn } from '@/lib/utils'
import React from 'react'
import { useAppSelector } from '@/app/hooks'
import toast from 'react-hot-toast'
import postApi from '@/services/api/post/postApi'
import { Link } from 'react-router'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

type PostCardProps = {
  post: Post
  onDeletePost: (postId: number) => void
} & React.HTMLAttributes<HTMLDivElement>

const PostCard = ({ post, onDeletePost, className, ...rest }: PostCardProps) => {
  const authState = useAppSelector((state) => state.auth);
  const [isLiked, setIsLiked] = React.useState<boolean>(post.is_liked || false)

  const handleLikePost = () => {
    if (!authState.authenticated) {
      toast.error('You need to be logged in to like a post.')
      return;
    }

    setIsLiked(!isLiked);
    postApi.likePost(post.id)
    post.likes_count = isLiked ? post.likes_count - 1 : post.likes_count + 1;
  }

  return (
    <Card className={cn('rounded-xl py-4', className)} {...rest}>
      <div className='flex items-center gap-2 px-4'>
        <Avatar className='h-12 w-12'>
          <AvatarImage src={`https://ui-avatars.com/api/?name=${post.user.username}&background=random`} />
          <AvatarFallback>{post.user.username[0]}</AvatarFallback>
        </Avatar>
        <CardHeader className='w-full px-0'>
          <CardTitle className='text-lg font-semibold'>{post.user.name}</CardTitle>
          <CardDescription className='text-sm text-muted-foreground'>@{post.user.username}</CardDescription>
          <CardAction>
            {authState.user?.id === post.user.id && <PostCardDropdown postId={post.id} onDeletePost={onDeletePost} />}
          </CardAction>
        </CardHeader>
      </div>
      <CardContent className='px-0'>
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {post.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div>
                    <img
                      src={image.image_url}
                      alt={`Post image ${index + 1}`}
                      className="w-full max-h-[700px] object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2">
              <Button variant='outline' size='icon'>
                <EllipsisVertical className='h-4 w-4' />
              </Button>
            </CarouselPrevious>
            <CarouselNext className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2">
              <Button variant='outline' size='icon'>
                <EllipsisVertical className='h-4 w-4' />
              </Button>
            </CarouselNext>
          </Carousel>
        </div>
        <div className='px-4 py-2'>
          <div className='mt-1 -ml-1.5 flex items-center gap-1'>
            <Button variant="ghost" size="icon" className='cursor-pointer' onClick={handleLikePost}>
              <Heart className={`!size-6 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Link to={`/posts/${post.id}`}>
              <Button variant="ghost" size="icon" className='cursor-pointer'>
                <MessageCircle className="!size-6" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className='cursor-pointer'>
              <Send className="!size-6" />
            </Button>
          </div>
          <p className='mt-1 text-muted-foreground font-medium text-sm'>
            {post.likes_count} {post.likes_count === 1 ? 'like' : 'likes'}
          </p>
          <p className='mt-2 text-base text-gray-800'><span className='font-medium cursor-pointer'>{post.user.username}</span> {post.content}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default PostCard

type PostCardDropdownProps = {
  postId: number;
  onDeletePost: (postId: number) => void;
}

const PostCardDropdown = ({ postId, onDeletePost }: PostCardDropdownProps) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon'>
            <EllipsisVertical className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem className="cursor-pointer focus:bg-red-50 focus:text-destructive group" onSelect={() => setIsDialogOpen(true)}>
            <Trash className='group-[focus]:text-destructive' />
            Delete Post
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Are you want to delete this post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-y-2">
            <DialogClose asChild>
              <Button size="sm" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button size="sm" onClick={() => onDeletePost(postId)} className="bg-red-500 text-white hover:bg-red-600">
              <Trash />
              Delete Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>

  )
}