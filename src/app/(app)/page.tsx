import Explore from "@/components/home/Explore/Explore";
import Features from "@/components/home/Features/Features";
import HeroSection from "@/components/home/HeroSection";

export default async function Home() {

	// const session = await getServerSession(authOptions);
	// const user = session?.user;
	// console.log("🚀 ~ Home ~ user:", user);

	return (
		<div>
			<HeroSection />
			<Explore />
			<Features />
		</div>
	);
}
