import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className="flex justify-center gap-4 flex-col items-center text-white h-[39vh]">
      <div className="font-bold flex items-center gap-2 text-3xl">Buy me a chai <span className=""><img src="/tea.png" className="invertImg" width={88} alt="" /></span></div>
        <p>
          A crowdfunding platform for creators . Get funded by your fans and followers . Start now!
        </p>
      <div>
        <Link href={"/login"}>
          <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
        </Link>
        <Link href={"/about"}>
          <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
        </Link>
      </div>
    </div>


    <div className="bg-white h-1 opacity-10"></div>


    <div className="text-white container mx-auto pb-32 pt-14">
      <h1 className="text-3xl my-2 font-bold text-center">Your fans can buy you a chai</h1>
      <div className="flex gap-5 justify-around">
      <div className="item space-y-3 flex flex-col items-center justify-center">
          <img width={88} className=" rounded-full p-2 text-black" src="/man.png" alt="" />
          <p className="font-bold">Fans want to help</p>
          <p className=" text-center">Your Fans are available to help you </p>
        </div>
        <div className="item space-y-3 flex flex-col items-center justify-center">
          <img width={88} className=" rounded-full p-2 text-black" src="/coin.png" alt="" />
          <p className="font-bold">Fans want to help</p>
          <p className=" text-center">Your Fans are available to help you </p>
        </div>
        <div className="item space-y-3 flex flex-col items-center justify-center">
          <img width={88} className=" rounded-full p-2 text-black" src="/people.png" alt="" />
          <p className="font-bold">Fans want to help</p>
          <p className=" text-center">Your Fans are available to help you </p>
        </div>
      </div>
    </div>


    <div className="bg-white h-1 opacity-10"></div>


    <div className="text-white container mx-auto pb-32 pt-14 flex flex-col items-center justify-center">
      <h2 className="text-3xl my-2 font-bold text-center">Learn more about us</h2>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/70_HcCD6cK0?si=R32UnewC1xuzfq1n" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
    </>
  );
}
