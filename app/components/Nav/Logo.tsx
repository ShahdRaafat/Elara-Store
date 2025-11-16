import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-baseline gap-1 font-bold text-3xl focus:outline-none rounded-sm mr-1"
      aria-label="Elara Store - Return to homepage"
    >
      <span className="bg-[#8c1c13] bg-clip-text text-transparent  group-hover:scale-105 group-focus:scale-105 transition-all duration-300 ease-out text-4xl">
        Elara
      </span>
      <span className="text-gray-700 dark:text-gray-300 text-xl font-medium tracking-wide self-end group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
        Store
      </span>
    </Link>
  );
}
//from-[#88527F] via-[#A64B7A] to-[#8F2D56]
