import AddPalette from "@/components/AddPalette";
import CopyPalettes from "@/components/CopyPalettes";
import ImagePaletteExtractor from "@/components/ImagePaletteExtractor";
import PaintingPaletteIcon from "@/components/icons/PaintingPaletteIcon";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between gap-16 p-6">
      <div className="mt-10 text-center ">
        <h1 className="text-4xl font-bold">Palette Extractor</h1>
        <p className="mt-3">Generate palettes from images</p>
      </div>
      <ImagePaletteExtractor />
      <CopyPalettes />
      <div className="my-8 md:my-10 flex flex-col gap-6">
        <AddPalette />
        <Link href="/browse" className="text-center link">
          <div className="p-1 md:text-lg font-medium text-darkest rounded">
            <PaintingPaletteIcon iconClass="w-5 h-5 mr-2" />
            <span className="">Explore community palettes</span>
          </div>
        </Link>
      </div>
    </main>
  );
}
