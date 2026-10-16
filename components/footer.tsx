export default function SideNav() {
  return (
    <div className="sticky bottom-0 left-0 z-0 flex h-80 w-full items-center justify-center bg-white">
      <div className="relative flex h-full w-full items-start justify-end overflow-hidden px-12 py-12 text-right text-[#ff5941]">
        <div className="sm:pace-x-16 flex flex-row space-x-12 text-sm sm:text-lg md:space-x-24 md:text-xl">
          <ul>
            <li className="cursor-pointer hover:underline">Home</li>
            <li className="cursor-pointer hover:underline">Docs</li>
            <li className="cursor-pointer hover:underline">Comps</li>
          </ul>
          <ul>
            <li className="cursor-pointer hover:underline">Github</li>
            <li className="cursor-pointer hover:underline">Instagram</li>
            <li className="cursor-pointer hover:underline">X (Twitter)</li>
          </ul>
        </div>
        <h2 className="font-calendas absolute bottom-0 left-0 translate-y-1/3 text-[80px] text-[#ff5941] sm:text-[192px]">
          fancy
        </h2>
      </div>
    </div>
  );
}
