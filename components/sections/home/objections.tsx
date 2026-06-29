import { Container } from "@/components/layout/container"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Droplets, Flame, Bug, Wind } from "lucide-react"
import Link from "next/link"
import { ImageFallback } from "@/components/ui/image-fallback"


const objections = [
 {
 icon: Flame,
 title: "Resistência ao Fogo",
 description: "A madeira recebe tratamento retardante e é encapsulada com placas de gesso acartonado (Drywall) resistentes ao fogo, superando o tempo de resistência da alvenaria comum segundo normas técnicas.",
 image: "/images/fogo.png"
 },
 {
 icon: Droplets,
 title: "Umidade e Maresia",
 description: "Sistema inteligente de multicamadas (OSB, Membrana Hidrófuga e Siding) que permite a 'respiração' da parede, bloqueando a água externa e impedindo condensação interna. Imune à maresia.",
 image: "/images/umidade_maresia.png"
 },
 {
 icon: Bug,
 title: "Cupins e Pragas",
 description: "O Pinus estrutural passa por tratamento industrial em autoclave sob alta pressão. A madeira torna-se toxica para organismos xilófagos (cupins e brocas), garantindo durabilidade secular.",
 image: "/images/cupins.png"
 },
 {
 icon: Wind,
 title: "Ventos e Tempestades",
 description: "Estrutura contraventada com chapas estruturais de OSB em todo o perímetro. O sistema trabalha de forma monolítica e flexível, resistindo a ventos superiores a 200km/h.",
 image: "/images/ventos.png"
 }
]

export function Objections() {
 return (
 <section className="pt-24 md:pt-32 pb-10 md:pb-16 bg-stone-50">
 <Container className="animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
 <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
 <div className="max-w-2xl">
 <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground">
 Desmistificando o <br className="hidden md:block" />
 <span className="text-primary">Wood Frame</span> no Brasil.
 </h2>
 <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
 A falta de informação gera dúvidas. Nós respondemos com engenharia, normas técnicas e anos de comprovação em países desenvolvidos.
 </p>
 </div>
 <Link href="/mitos-e-verdades" className="hidden md:flex">
 <Button variant="outline">
 Ver Todos os Mitos e Verdades
 </Button>
 </Link>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 md:gap-8">
 {objections.map((item, i) => (
 <Card key={i} className="overflow-hidden group hover:-translate-y-1 transition-all duration-500 hover:shadow-xl shadow-sm bg-white rounded-3xl h-full flex flex-col border-none">
                <div className="h-56 relative overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-900/50 dark:to-stone-800/50 flex flex-col items-center justify-center group-hover:from-stone-200 group-hover:to-stone-300 dark:group-hover:from-stone-800 dark:group-hover:to-stone-700 transition-colors duration-500">
                  
                  {/* Fallback pattern when image is missing */}
                  <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
                  
                  <ImageFallback
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 z-10 transition-transform duration-500"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="absolute top-4 left-4 z-30 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-black/5 dark:border-white/10 group-hover:scale-110 transition-transform duration-500">
                    <item.icon size={24} className="text-primary" />
                  </div>
                </div>
 <CardHeader className="pb-3 flex-1 pt-6">
 <CardTitle className="text-xl font-extrabold tracking-tight group-hover:text-primary transition-colors">{item.title}</CardTitle>
 <CardDescription className="text-[15px] leading-relaxed mt-3 text-muted-foreground font-medium">
 {item.description}
 </CardDescription>
 </CardHeader>
 <CardContent className="pt-0">
 <Link href="/mitos-e-verdades">
 <Button variant="link" className="px-0 text-primary group-hover:text-primary-dark">
 Saiba mais
 </Button>
 </Link>
 </CardContent>
 </Card>
 ))}
 </div>
 
 <div className="mt-8 flex justify-center md:hidden">
 <Link href="/mitos-e-verdades" className="w-full">
 <Button variant="outline" className="w-full">
 Ver Todos os Mitos e Verdades
 </Button>
 </Link>
 </div>
 </Container>
 </section>
 )
}
