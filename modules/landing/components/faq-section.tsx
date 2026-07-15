import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do you store our source code?",
    answer: "No. Privacy is our top priority. Our AI models only process the specific diffs of your pull requests in memory during the review. We never store your source code, and your code is never used to train any models."
  },
  {
    question: "Does it work with private repositories?",
    answer: "Yes, completely! Whether you are on the Free or Pro tier, the GitHub App can be installed on private repositories and works identically."
  },
  {
    question: "Which LLM is powering the reviews?",
    answer: "We use a combination of state-of-the-art models depending on the context. By default, we leverage advanced Claude and OpenAI models optimized specifically for code analysis and vulnerability detection."
  }
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg text-balance">
            Everything you need to know about security, privacy, and how PR Pilot works.
          </p>
        </div>

        <Accordion className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-lg font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
