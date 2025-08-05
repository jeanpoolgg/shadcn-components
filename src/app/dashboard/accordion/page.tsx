import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"


const items = [
    {
        id: "item-1",
        name: "Product Information",
        paragraphs: [
            "Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability.",
            "Key features include advanced processing capabilities, and an intuitive user interface designed for both beginners and experts."
        ]
    },
    {
        id: "item-2",
        name: "Shipping Details",
        paragraphs: [
            "We offer worldwide shipping through trusted courier partners. Standard delivery takes 3-5 business days, while express shipping ensures delivery within 1-2 business days.",
            "All orders are carefully packaged and fully insured. Track your shipment in real-time through our dedicated tracking portal."
        ]
    },
    {
        id: "item-3",
        name: "Return Policy",
        paragraphs: [
            "We stand behind our products with a comprehensive 30-day return policy. If you&apos;re not completely satisfied, simply return the item in its original condition.",
            "Our hassle-free return process includes free return shipping and full refunds processed within 48 hours of receiving the returned item."
        ]
    }
]


export default function AccordionPage() {
    return (
        <>

<div className="h-8">
            V1
        </div>
            <Accordion
            type="multiple"
            className="w-full"
            defaultValue={["item-1"]}
        >
            {
                items.map(item => (
                    <AccordionItem value={item.id} key={item.id}>
                        <AccordionTrigger>{item.name}</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            {item.paragraphs.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                ))
            }

        </Accordion>
        <div className="h-8">
            V2
        </div>


        <Accordion
  type="single"
  collapsible
  className="w-full max-w-2xl mx-auto" // ancho fijo y centrado
  defaultValue="item-1"
>
  {items.map(item => (
    <AccordionItem value={item.id} key={item.id}>
      <AccordionTrigger className="w-full">{item.name}</AccordionTrigger>
      <AccordionContent className="w-full flex flex-col items-center justify-center gap-4 text-center break-words transition-all duration-300">
        {item.paragraphs.map((paragraph, index) => (
          <p key={index} className="max-w-prose">{paragraph}</p>
        ))}
      </AccordionContent>
    </AccordionItem>
  ))}
</Accordion>

        </>

        
    );
}