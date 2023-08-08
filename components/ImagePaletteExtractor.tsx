"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { palette } from "@/data";
import { useImageStore } from "@/store/imageStore";
import { useEffect } from "react";
import ImageInput from "./ImageInput";

const ImagePaletteExtractor = () => {
  const image = useImageStore((state) => state.image);

  useEffect(() => {
    console.log(image);
  }, [image]);

  return (
    <div className="flex w-10/12 border border-stone-200 rounded-lg">
      <div className="w-5/12 flex flex-col px-8 py-6 gap-3">
        <ImageInput />
        <Button variant="secondary" className="mb-8">
          Try Stock Image
        </Button>
        <div className="mt-auto mb-8">
          <div className="mb-4 flex flex-col gap-3">
            <div className="text-sm">No of colors</div>
            <div>
              <Slider min={3} max={10} step={1} className="cursor-pointer" />
            </div>
          </div>
          <div className="w-full flex rounded overflow-hidden">
            {palette.map((color) => {
              return (
                <div
                  key={color.hex}
                  className="h-10 flex-grow"
                  style={{ background: `${color.hex}` }}
                ></div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button variant="secondary">Test Palette Live</Button>
          <Button>Export Palette</Button>
        </div>
      </div>
      <div className="w-7/12 p-6 flex items-center justify-center border-l border-l-stone-200">
        <Image
          src={image ? image : "/images/new-world.png"}
          width={400}
          height={300}
          alt="image"
          priority
          className="w-full aspect-video"
        />
      </div>
    </div>
  );
};

export default ImagePaletteExtractor;
