import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
async function getCountries() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();
  return data;
}

export default async function Countries() {
  const countries = await getCountries();
  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">World Countries</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {countries.map((country) => (
          <Link href={`/countries/${country.name.common}`} key={country.cca3}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <div className="flex items-center space-x-3">
                <Image
                  src={country.flags.svg}
                  alt={`Flag of ${country.name.common}`}
                  width={48}
                  height={36}
                  className="rounded shadow-sm"
                />
                <CardTitle className="text-2xl">{country.name.common}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-gray-600 mb-2">{country.name.official}</p>
              <Separator className="my-3" />
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="font-semibold">Capital</p>
                  <p>{country.capital?.[0] || 'N/A'}</p>
                </div>
                <div>
                  <p className="font-semibold">Region</p>
                  <p>{country.region}</p>
                </div>
                <div>
                  <p className="font-semibold">Languages</p>
                  <p>{Object.values(country.languages || {}).join(', ') || 'N/A'}</p>
                </div>
                <div>
                  <p className="font-semibold">Currency</p>
                  <p>{Object.values(country.currencies || {})[0]?.name || 'N/A'}</p>
                </div>
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between items-center">
                <Badge variant="secondary" className="text-xs">
                  {country.cca3}
                </Badge>
                <p className="text-sm font-medium">
                  Pop. {country.population.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
