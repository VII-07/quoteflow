import Container from "@/components/layout/Container";
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
        <div className="flex justify-between border-t border-t-gray-300 py-4">
          <p className="text-sm text-gray-600">
            © {currentYear} QuoteFlow. Made for Bohdan. Oct 7. All rights
            reserved.
          </p>
          <ul className="flex justify-between gap-4">
            {navFooterItems.map((item) => (
              <li key={item.name}>
                <Link className="text-sm text-gray-600" href={item.href}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
};
