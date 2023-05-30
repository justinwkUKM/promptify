

async function TestComponent() {

  const fetchPosts = async () => {
    const response = await fetch("/api/test", {
      cache: 'no-store',
    });
    const data = await response.json();
    console.log(JSON.parse(data))
  };

  fetchPosts();
  return (
    <div>
      <h1>Time</h1>
      {/* <p className="font-bold text-2xl">{JSON.stringify(time.datetime)}</p> */}
    </div>
  )
}

export default TestComponent