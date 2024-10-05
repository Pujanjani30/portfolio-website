import { Link } from "react-router-dom";
// import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  // const error = useRouteError();
  // console.log(error);

  return (
    <section className="flex items-center h-screen p-16 bg-zinc-900 text-white">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">Sorry, we could not find this page.</p>
          <p className="mt-4 mb-8 dark:text-gray-600">But dont worry, you can find plenty of other things on our homepage.</p>
          <Link to="/" className="px-8 py-3 font-semibold rounded bg-violet-600 text-gray-50">Back to homepage</Link>
          {/* <p>
            <i>{error.statusText || error.message}</i>
          </p> */}
        </div>
      </div>
    </section>
  )
}

export default ErrorPage;