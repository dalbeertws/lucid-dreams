import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="mx-auto max-w-[2500px] relative bg-[#F7F8FB] pb-20">
        <Image
          src="/images/graph.png"
          alt="graph image"
          className="w-full"
          width={5000}
          height={5000}
        />

      </div>
    </>
  );
}
