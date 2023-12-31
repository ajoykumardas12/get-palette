"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useImageStore } from "@/store/imageStore";
import { useCallback, useEffect, useRef, useState } from "react";
import ImageInput from "./ImageInput";
import { usePaletteStore } from "@/store/paletteStore";
import ColorThief from "colorthief";
import { colorThiefDataToPalette, rgbArrayToHex } from "@/lib/utils";
import ExportPaletteDialog from "./palette-exports/ExportPaletteDialog";
import { Skeleton } from "./ui/skeleton";
import NoOfColors from "./NoOfColors";
import { getStockImagesURL } from "@/lib/getStockImages";
import { useStockImageIndexStore } from "@/store/stockImageIndexStore";
import { useFetchColorNames } from "@/hooks/useFetchColorNames";

const ImagePaletteExtractor = () => {
  const image = useImageStore((state) => state.image);
  const setPalette = usePaletteStore((state) => state.setPalette);
  const [noOfCol, setNoOfCol] = useState(5);

  const imgRef = useRef<HTMLImageElement | null>(null);

  // function to get palette from color thief. Wrapped inside callback to prevent calling setPalette on rerenders
  const getPaletteFromImage = useCallback(() => {
    const colorthief = new ColorThief();
    const paletteData = colorthief.getPalette(imgRef.current, noOfCol);
    const newPalette = colorThiefDataToPalette(paletteData);
    setPalette(newPalette);
  }, [setPalette, noOfCol]);

  // call getPaletteFromImage when image is loaded
  useEffect(() => {
    if (imgRef.current?.complete) {
      getPaletteFromImage();
    } else {
      imgRef.current?.addEventListener("load", () => {
        getPaletteFromImage();
      });
    }
  }, [getPaletteFromImage, image, setPalette]);

  // hook to fetch color names data and set palette names
  useFetchColorNames();

  return (
    <div className="flex flex-col-reverse md:flex-row w-full sm:w-11/12 lg:w-10/12 max-w-7xl border border-stone-200 rounded-lg">
      <div className="md:w-5/12 flex flex-col px-8 py-4 md:py-6 gap-3">
        {/* File Image Input */}
        <ImageInput />

        {/* Stock Image Input */}
        <StockImage />

        <div className="mt-auto mb-6 md:mb-8">
          {/* Set No Of Colors */}
          <NoOfColors noOfCol={noOfCol} setNoOfCol={setNoOfCol} />

          {/* Result Color Palette */}
          <ColorPalette />
        </div>

        {/* Export Palette */}
        <ExportPaletteDialog />
      </div>
      <div className="md:w-7/12 p-4 md:p-6 flex items-center justify-center border-l border-l-stone-200">
        <Image
          ref={imgRef}
          src={image ? image : "/images/new-world.png"}
          width={400}
          height={300}
          alt="image"
          priority
          crossOrigin="anonymous"
          className="w-full aspect-video"
        />
      </div>
    </div>
  );
};

const StockImage = () => {
  const currentIndex = useStockImageIndexStore((state) => state.currentIndex);
  const increaseStockImageIndex = useStockImageIndexStore(
    (state) => state.increaseStockImageIndex
  );
  const setImage = useImageStore((state) => state.setImage);
  const palette = usePaletteStore((state) => state.palette);

  return (
    <Button
      variant="secondary"
      className="mb-6 md:mb-8"
      onClick={() => {
        setImage(getStockImagesURL(currentIndex));
        increaseStockImageIndex();
      }}
      disabled={!palette}
    >
      Try Stock Images
    </Button>
  );
};

const ColorPalette = () => {
  const palette = usePaletteStore((state) => state.palette);

  return (
    <div className="w-full flex rounded overflow-hidden">
      {palette ? (
        palette.map((color, index) => {
          const hex = rgbArrayToHex(color.rgb);
          return (
            <div
              key={index}
              className="h-10 flex-grow"
              style={{ background: `${hex}` }}
            ></div>
          );
        })
      ) : (
        <Skeleton className="w-full h-10" />
      )}
    </div>
  );
};

export default ImagePaletteExtractor;
