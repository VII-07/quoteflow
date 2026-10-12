import { Container } from "@/components/layout/Container";
import { navFooterItems } from "@/lib/navigation";
import { cacheLife } from "next/cache";
import Link from "next/link";

const getYear = async () => {
  "use cache";
  cacheLife("max");

  return new Date().getFullYear();
};

export const Footer = async () => {
  const currentYear = await getYear();

  return (
    <footer>
      <Container>
        <div className="flex justify-between border-t border-t-sidebar-ring py-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} QuoteFlow. All rights reserved.
          </p>
          <nav aria-label="Footer">
            <ul className="flex gap-4">
              {navFooterItems.map((item) => (
                <li key={item.name}>
                  <Link
                    className="text-sm text-muted-foreground hover:text-accent-foreground"
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
};
