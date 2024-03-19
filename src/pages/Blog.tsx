import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/authHook';

type TBlog = {
	id: string,
	title: string,
	content: string
}
type TUser = {
	id: string,
	email: string,
	name: string
}

const Blog = () => {
	const [blogs, setBlogs] = useState<TBlog[]>([]);
	const [title, setTitle] = useState("")
	const [content, setContent] = useState("")
	const [publish, setPublish] = useState(false)
	const [user, setUser] = useState<TUser>()

	const auth = useAuth()

	const { toast } = useToast()

	async function handleDelete(id: string) {
		const response = await fetch("https://backend.nirban012.workers.dev/api/v1/blog/delpost", {
			method: "post",
			headers: {
				"Authorization": `Bearer ${auth?.token}`
			},
			body: JSON.stringify({ id })
		})
		const res = await response.json()

		toast({
			title: res.title,
			description: "This post was deleted",
		})
	}

	async function handleBlogSubmit() {
		const response = await fetch("https://backend.nirban012.workers.dev/api/v1/blog/newpost", {
			method: "post",
			headers: {
				"Authorization": `Bearer ${auth?.token}`
			},
			body: JSON.stringify({ title, content, publish })
		})
		const res = await response.json()
		const blogData = await fetchBlogs();
		setBlogs(blogData);
		toast({
			title: res.title,
			description: "Blog created",
		})
	}

	async function fetchBlogs() {
		try {
			const response = await fetch("https://backend.nirban012.workers.dev/api/v1/blog/user", {
				method: "get",
				headers: {
					"Authorization": `Bearer ${auth?.token}`
				}
			});
			const data = await response.json();
			// console.log(data)
			return data; // Return entire array of blogs
		} catch (error) {
			console.error('Error fetching blogs:', error);
			return []; // Return empty array in case of error
		}
	}
	async function fetchUser() {
		try {
			const response = await fetch("https://backend.nirban012.workers.dev/api/v1/user/verify", {
				method: "post",
				headers: {
					"Authorization": `Bearer ${auth?.token}`
				}
			});
			const data = await response.json();
			setUser(data)
			// console.log(data)
			return data; // Return entire array of blogs
		} catch (error) {
			console.error('Error fetching user:', error);
			return []; // Return empty array in case of error
		}
	}

	useEffect(() => {
		async function fetchData() {
			const blogData = await fetchBlogs();
			setBlogs(blogData);
		}

		fetchData();
		fetchUser()
	}, []);

	return (
		<div>
			<nav className="flex justify-between items-center m-10 ">
				<div className="p-2 font-customFont text-2xl">
					Medium
				</div>
				<div className='flex gap-2 items-center justify-between'>
					<HoverCard>
						<HoverCardTrigger>
							<Avatar>
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</HoverCardTrigger>
						<HoverCardContent >
							<p className='bg-slate-300 p-2 mb-2'>{user?.name}</p>
							<Button onClick={() => auth?.logOut()}>Log Out</Button>
						</HoverCardContent>
					</HoverCard>


				</div>
			</nav>

			<div className="flex flex-col w-4/5 md:w-1/2 gap-6 mx-auto m-8">
				<h2 className='text-xl font-bold leading-tight line-clamp-3 '>What are you thinking?</h2>
				<Input autoComplete='on' type='text' placeholder='Blog Title' onChange={(e) => { setTitle(e.target.value) }} />
				<Textarea onChange={(e) => { setContent(e.target.value) }} placeholder="Blog Content" />
				<div className='flex gap-2'>
					<Checkbox id='publish' onClick={() => { setPublish(!publish) }} />
					<label
						htmlFor="publish"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Publish
					</label>
				</div>
				<Button onClick={handleBlogSubmit}>Send message</Button>
			</div>

			{blogs.map(blog => (
				<div key={blog.id} className="flex flex-col p-2 mx-10 ">
					<Link className="text-xl font-bold leading-tight line-clamp-3 hover:underline" to="#">
						{blog.title}
					</Link>
					<p className="text-gray-500 dark:text-gray-400">Posted on August 24, 2023</p>
					<p className="text-sm leading-loose line-clamp-3">
						{blog.content}
					</p>
					<Button className='w-[200px]' size={"sm"} onClick={() => handleDelete(blog.id)}>
						<Trash2 className='p-1' /> Delete
					</Button>
				</div>
			))}
			<Toaster />
		</div>
	);
}

export default Blog;
