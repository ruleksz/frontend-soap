// ✅ Import gambar dari folder assets
import gambar1Image from "../assets/gambar1.jpg";

export default function Home() {
  return (
    <section className="w-full">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[70vh]"
        style={{
          backgroundImage: `url(${gambar1Image})`,
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">*/
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            HOLLA...........
          </h1>
          
          <div className="bg-white rounded-full p-2 w-full max-w-xl flex items-center shadow-md">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="flex-1 px-4 py-2 rounded-full outline-none text-gray-700"
            />
            <button className="bg-cyan-500 text-white px-6 py-2 rounded-full hover:bg-cyan-600">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}