import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col items-center gap-8 my-10'>
      <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
        The Complete Platform for Building the Web
      </h1>

      <div className='flex gap-2'>
        <Button onClick={() => navigate("signup")}>Sign up </Button>
        <Button onClick={() => navigate("signin")}>Sign in </Button>
      </div>

      <div className="flex flex-col w-1/2 p-2 mt-5 ">
        <Link className="text-xl font-bold leading-tight line-clamp-3 hover:underline" to="#">
          The Art of the Side Project
        </Link>
        <p className="text-gray-500 dark:text-gray-400">Posted on August 24, 2023</p>
        <p className="text-sm leading-loose line-clamp-3">
          We've all been there: you're working on a big project at work, and you're making great progress. But
          then, out of nowhere, you get hit with a brilliant idea for a side project. It's so exciting that you
          can't help but start working on it immediately.
        </p>
      </div>

      <div className="flex flex-col w-1/2 p-2 mt-5 ">
        <Link className="text-xl font-bold leading-tight line-clamp-3 hover:underline" to="#">
          The Art of the Side Project
        </Link>
        <p className="text-gray-500 dark:text-gray-400">Posted on August 24, 2023</p>
        <p className="text-sm leading-loose line-clamp-3">
          We've all been there: you're working on a big project at work, and you're making great progress. But
          then, out of nowhere, you get hit with a brilliant idea for a side project. It's so exciting that you
          can't help but start working on it immediately.
        </p>
      </div>

      <div className="flex flex-col w-1/2 p-2 mt-5 ">
        <Link className="text-xl font-bold leading-tight line-clamp-3 hover:underline" to="#">
          The Art of the Side Project
        </Link>
        <p className="text-gray-500 dark:text-gray-400">Posted on August 24, 2023</p>
        <p className="text-sm leading-loose line-clamp-3">
          We've all been there: you're working on a big project at work, and you're making great progress. But
          then, out of nowhere, you get hit with a brilliant idea for a side project. It's so exciting that you
          can't help but start working on it immediately.
        </p>
      </div>

      <div>
        Made with thought by Nirban Roy ❤️
      </div>
    </div>

  )
}

export default Home