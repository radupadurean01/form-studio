import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="font-heading text-3xl sm:text-4xl mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-heading text-2xl sm:text-3xl mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading text-xl mt-8 mb-3">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="font-body text-muted leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="font-body text-muted leading-relaxed list-disc pl-6 mb-4 space-y-1">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="font-body text-muted leading-relaxed list-decimal pl-6 mb-4 space-y-1">
        {children}
      </ol>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-accent hover:text-accent-dark underline transition-colors">
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    ...components,
  };
}
