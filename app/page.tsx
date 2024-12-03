import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black text-white h-screen w-full flex flex-col items-center relative overflow-hidden mx-auto py-10 md:py-0">
      {/* Spotlight effect in the left corner using radial gradient with increased opacity */}
      <div
        className="absolute inset-0 bg-black opacity-80 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at left top, rgba(255, 255, 255, 0.4), transparent 50%, black 100%)',
          backgroundSize: '150%',
        }}
      ></div>

      <div className="p-4 relative z-10 w-full text-center flex flex-col flex-grow">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 md:mb-10 pt-6 md:pt-8 text-glow">
          AI Image Generator
        </h1>
        <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-6 pt-4">
          &quot;AI Image Generator is an innovative platform that allows users to create unique, high-quality images from simple text prompts. Utilizing advanced artificial intelligence, the tool generates visually stunning artwork in seconds, offering endless creative possibilities for artists, designers, and content creators.&quot;
        </p>
        <div className="flex-grow"></div>
        <div className="mt-4 mb-40 flex justify-center">
          <Link href="/Generate">
            <p className="text-sm md:text-base font-semibold bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition transform hover:scale-105">
              Generate Image
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
