import Link from "next/link";

const PokemonCard = ({ name, url }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md text-center">
      <h3 className="text-xl font-bold capitalize">{name}</h3>
      <Link href={`/${name}`} className="text-blue-500 underline">
        View Details
      </Link>
    </div>
  );
};

export default PokemonCard;
