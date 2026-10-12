import { Container } from "@/components/layout/Container";
import { navFooterItems } from "@/lib/navigation";
import { cacheLife } from "next/cache";
import { FooterLink } from "@/components/layout/FooterLink";

const getYear = async () => {
  "use cache";
  cacheLife("days");

  return new Date().getFullYear();
};

export const Footer = async () => {
  const currentYear = await getYear();

  return (
    <footer>
      <Container>
        <div className="flex flex-col items-center gap-3 border-t py-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-muted-foreground">
            © {currentYear} QuoteFlow. All rights reserved.
          </p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              {navFooterItems.map((item) => (
                <li key={item.name}>
                  <FooterLink item={item} />
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
};
