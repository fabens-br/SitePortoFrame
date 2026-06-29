import { Container } from "@/components/layout/container"
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const faqs = [
 {
 question: "O Wood Frame é homologado no Brasil?",
 answer: "Sim. O sistema construtivo Wood Frame é totalmente homologado pelas normas técnicas brasileiras, incluindo o Ministério das Cidades através do SiNAT. Ele atende ou supera todas as exigências da norma de desempenho ABNT NBR 15575."
 },
 {
 question: "As casas de madeira têm problemas com goteiras ou umidade?",
 answer: "Não. Diferente de casas de madeira antigas ou artesanais, as construções em Wood Frame utilizam um pacote de membranas inteligentes (barreiras de vapor e barreiras hidrófugas) que permitem a casa 'respirar' mas bloqueiam completamente a entrada de água líquida da chuva."
 },
 {
 question: "Qual o valor do metro quadrado?",
 answer: "O Wood Frame não deve ser comparado ao m² da alvenaria bruta, pois ele já engloba soluções térmicas, acústicas e acabamentos de altíssimo padrão. Em termos de custo-benefício (considerando agilidade da obra, precisão, conforto e retorno de investimento), o Wood Frame apresenta um custo final muito mais atrativo e blindado contra 'imprevistos'."
 },
 {
 question: "Pode ser construído em regiões litorâneas como Porto Seguro?",
 answer: "Absolutamente. É o sistema ideal para o litoral. Diferente do aço ou do concreto armado que oxidam ou estouram com a maresia, a estrutura de madeira seca tratada não sofre oxidação. Além disso, as construções Wood Frame mantêm o interior fresco mesmo no intenso verão baiano."
 },
 {
 question: "Posso usar revestimentos tradicionais como porcelanato?",
 answer: "Sim. Por fora, sua casa pode ser pintada, revestida com pedra, porcelanato ou siding. Por dentro, os banheiros recebem impermeabilização pesada e as paredes podem receber qualquer tipo de cerâmica, papel de parede ou pintura de alto padrão. Visualmente, é idêntica à alvenaria, porém muito mais reta e precisa."
 }
]

export function Faq() {
 return (
 <section className="py-24 md:py-32 bg-stone-50">
 <Container className="max-w-4xl">
 <div className="text-center mb-16 md:mb-20">
 <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground">
 Perguntas <span className="text-primary">Frequentes.</span>
 </h2>
 <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
 Ainda tem dúvidas? Separamos as questões mais comuns de nossos clientes para ajudar na sua decisão.
 </p>
 </div>

 <Accordion type="single" collapsible className="w-full">
 {faqs.map((faq, index) => (
 <AccordionItem key={index} value={`item-${index}`} className="border-b border-black/5 last:border-0">
 <AccordionTrigger className="text-left text-base md:text-xl font-bold text-stone-800 py-6 hover:no-underline hover:text-primary transition-colors">
 {faq.question}
 </AccordionTrigger>
 <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6 pr-8">
 {faq.answer}
 </AccordionContent>
 </AccordionItem>
 ))}
 </Accordion>
 
 <div className="mt-12 text-center">
 <p className="text-muted-foreground mb-4">Sua dúvida não está aqui?</p>
 <Link href="/contato">
 <Button variant="outline">Fale com um Especialista</Button>
 </Link>
 </div>
 </Container>
 </section>
 )
}
