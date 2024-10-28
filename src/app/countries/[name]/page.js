import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Globe, Users, MapPin, Calendar, Languages, Coins, Flag, Map } from "lucide-react";

async function getCountry(name) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
    if (!res.ok) return null;
    const data = await res.json();
    return data[0];
  } catch (error) {
    return null;
  }
}

export default async function CountryPage({ params }) {
  const country = await getCountry(params.name);
  
  if (!country) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <Link 
        href="/countries" 
        className="inline-flex items-center mb-6 text-primary hover:text-primary/80"
      >
        ← Back to Countries
      </Link>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Main Info Card */}
        <Card className="md:col-span-2">
          <CardHeader className="border-b bg-muted/50">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <Image
                src={country.flags.svg}
                alt={country.flags.alt || `Flag of ${country.name.common}`}
                width={200}
                height={120}
                className="rounded-lg shadow-md"
              />
              <div>
                <CardTitle className="text-4xl mb-2">{country.name.common}</CardTitle>
                <CardDescription className="text-lg">
                  {country.name.official}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Key Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Key Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <StatItem 
              icon={<Globe className="h-4 w-4" />}
              label="Region"
              value={`${country.subregion}, ${country.region}`}
            />
            <StatItem 
              icon={<MapPin className="h-4 w-4" />}
              label="Capital"
              value={country.capital?.[0] || 'N/A'}
            />
            <StatItem 
              icon={<Users className="h-4 w-4" />}
              label="Population"
              value={country.population.toLocaleString()}
            />
            <StatItem 
              icon={<Map className="h-4 w-4" />}
              label="Area"
              value={`${country.area.toLocaleString()} km²`}
            />
          </CardContent>
        </Card>

        {/* Languages and Currencies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5" />
              Languages & Currencies
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Languages className="h-4 w-4" />
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {Object.values(country.languages || {}).map((lang) => (
                  <Badge key={lang} variant="secondary">{lang}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Coins className="h-4 w-4" />
                Currencies
              </h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(country.currencies || {}).map(([code, currency]) => (
                  <Badge key={code}>
                    {currency.name} ({currency.symbol})
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Borders and Time Zones */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flag className="h-5 w-5" />
              Additional Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Bordering Countries</h3>
              <div className="flex flex-wrap gap-2">
                {country.borders?.map((border) => (
                  <Badge key={border} variant="outline">{border}</Badge>
                )) || 'Island Country'}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Time Zones
              </h3>
              <div className="flex flex-wrap gap-2">
                {country.timezones.map((timezone) => (
                  <Badge key={timezone} variant="secondary">{timezone}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Maps Link */}
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <a
              href={country.maps.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Map className="h-4 w-4" />
              View on Google Maps
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-medium text-muted-foreground">{label}:</span>
      </div>
      <span>{value}</span>
    </div>
  );
}
