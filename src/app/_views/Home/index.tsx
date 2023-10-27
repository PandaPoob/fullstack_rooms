function Home() {
  return (
    // skal kopieres over i notes index.tsx
    <div>
      <h1 className="text-4xl font-bold mt-4">New note</h1>
      <form
        method="POST"
        onSubmit={(e) => {
          e.preventDefault;
        }}
        className="w-auto max-w-min mx-auto space-y-6 flex flex-col items-stretch"
      >
        <input type="text" placeholder="Title" />
        <input type="text" placeholder="Text" />
      </form>
    </div>

    // <main>
    //   <h1>Home</h1>
    // </main>
  );
}
export default Home;
