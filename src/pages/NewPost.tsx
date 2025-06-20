import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import postApi from '@/services/api/post/postApi';
import toast from 'react-hot-toast';

const formSchema = z.object({
  content: z.string().min(1, {
    message: 'You must enter a title.',
  }),
  // image files array
  images: z
    .array(z.instanceof(File))
    .refine(
      (files) =>
        files.every((file) =>
          ['image/jpg', 'image/jpeg', 'image/png'].includes(file.type),
        ),
      'All files must be images',
    )
    .refine(
      (files) => files.every((file) => file.size <= 1024 * 1024 * 4),
      'Each file size must be less than 4MB',
    ),
});

function NewPost() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      images: []
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    await toast.promise(postApi.addPost(values), {
      loading: 'Creating post...',
      success: 'Post created successfully!',
      error: (error) => {
        console.error('Error creating post:', error);
        return error instanceof Error ? error.message : 'Failed to create post';
      },
    }).then((response) => {
      console.log('Post created successfully:', response);
      navigate(`/posts/${response.post_id}`);
    }).catch((error) => {
      console.error('Error creating post:', error);
    }).finally(() => {
      setLoading(false);
      form.reset();
    });
  }

  return (
    <div className="min-h-main p-4 lg:px-0">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="mb-2">New Post</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea className='min-h-32' placeholder="content" {...field} />
                  </FormControl>
                  <FormMessage className="font-normal text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document File</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      placeholder="document file..."
                      ref={field.ref}
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                          field.onChange(Array.from(files));
                        } else {
                          field.onChange([]);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={loading} className="w-full cursor-pointer" type="submit">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <span>Create Post</span>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default NewPost;
