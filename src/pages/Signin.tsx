import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/authHook';
import { signinInput } from '@nirbanroy/common';

const Signin = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()

	const auth = useAuth()
	useEffect(() => {
		if (auth?.token) {
			navigate("/blog/bulk")
		}
	},)


	function handleSubmit(e: { preventDefault: () => void; }) {
		e.preventDefault();
		if (email !== "" && password !== "") {
			const { success } = signinInput.safeParse({ email, password })
			if (!success) {
				alert("please provide a valid input");
				return
			}
			auth?.loginAction({ email, password }, "signin");
			return;
		}
		alert("please provide a valid input");
	}

	return (
		<div className='h-screen items-center justify-center flex'>
			<form autoComplete='on' className='mx-auto w-80  max-w-sm m-4 flex flex-col gap-4 border border-black p-4 rounded-md'>
				<h1 className='text-4xl font-bold mb-4'>Sign In</h1>

				<label htmlFor='email'> Email</label>
				<Input id='email' autoComplete='on' type='text' placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />

				<label htmlFor='password'>Password</label>
				<Input id='password' autoComplete='on' type='password' placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} />

				<Button type='button' size={"lg"} onClick={handleSubmit}>Submit</Button>
				<Button type='button' size={"lg"} onClick={() => navigate("/signup")}>Signup</Button>
			</form>
		</div >
	)
}

export default Signin