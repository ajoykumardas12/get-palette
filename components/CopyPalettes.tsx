"use client";
import { Separator } from "./ui/separator";
import CopyIcon from "./icons/CopyIcon";
import { Button } from "./ui/button";
import { usePaletteStore } from "@/store/paletteStore";
import { isHexBgDark, rgbArrayToHex } from "@/lib/utils";
import { useCopy } from "@/hooks/useCopy";
import { Skeleton } from "./ui/skeleton";
import CheckCircleIcon from "./icons/CheckCircleIcon";

const CopyPalettes = () => {
  const palette = usePaletteStore((state) => state.palette);

  return (
    <div className="flex w-full flex-wrap justify-center gap-4 sm:gap-6 md:my-4">
      {palette ? (
        palette.map((colorFromPalette, index) => {
          return <Color key={index} rgb={colorFromPalette.rgb} />;
        })
      ) : (
        <>
          <Skeleton className="h-20 w-20 rounded-lg xs:h-24 xs:w-24 sm:h-28 sm:w-28 md:h-[7.5rem] md:w-[7.5rem]" />
          <Skeleton className="h-20 w-20 rounded-lg xs:h-24 xs:w-24 sm:h-28 sm:w-28 md:h-[7.5rem] md:w-[7.5rem]" />
          <Skeleton className="h-20 w-20 rounded-lg xs:h-24 xs:w-24 sm:h-28 sm:w-28 md:h-[7.5rem] md:w-[7.5rem]" />
          <Skeleton className="h-20 w-20 rounded-lg xs:h-24 xs:w-24 sm:h-28 sm:w-28 md:h-[7.5rem] md:w-[7.5rem]" />
          <Skeleton className="h-20 w-20 rounded-lg xs:h-24 xs:w-24 sm:h-28 sm:w-28 md:h-[7.5rem] md:w-[7.5rem]" />
        </>
      )}
    </div>
  );
};

const Color = ({ rgb }: { rgb: number[] }) => {
  const hex = rgbArrayToHex(rgb);
  const [copied, copy, resetCopied] = useCopy();
  const isBgDark = isHexBgDark(hex.substring(1));

  return (
    <Button
      className="flex h-20 w-20 cursor-pointer flex-col items-center rounded-lg text-xs transition-transform hover:-translate-y-1 focus:-translate-y-1 xs:h-24 xs:w-24 sm:h-28 sm:w-28 md:h-[7.5rem] md:w-[7.5rem] md:text-sm"
      style={{ background: `${hex}` }}
      onClick={() => {
        copy(hex);

        resetCopied();
      }}
    >
      <div className="flex flex-grow items-center">
        {copied ? (
          <CheckCircleIcon
            iconClass={`w-5 h-5 sm:w-7 sm:h-7 ${
              isBgDark ? "stroke-light/90" : "stroke-dark/90"
            }`}
          />
        ) : (
          <CopyIcon
            iconClass={`w-5 h-5 sm:w-7 sm:h-7 ${
              isBgDark ? "stroke-light/90" : "stroke-dark/90"
            }`}
          />
        )}
      </div>
      <Separator
        className={`mt-auto ${isBgDark ? "bg-light/20" : "bg-dark/20"}`}
      />
      <div className={`p-1 ${isBgDark ? "text-light/90" : "text-dark/90"}`}>
        {copied ? "copied!" : hex}
      </div>
    </Button>
  );
};

export default CopyPalettes;
