import * as React from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import { cn } from "@/lib/utils";

export interface MarkdownComponents extends Components {
  // Allow extending with custom components
}

const defaultMarkdownComponents: Components = {
  h1: ({ children, className, ...props }) => (
    <h1
      className={cn(
        "text-3xl font-bold tracking-tight text-foreground mb-4 mt-6",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, className, ...props }) => (
    <h2
      className={cn(
        "text-2xl font-bold tracking-tight text-foreground mb-3 mt-8",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, className, ...props }) => (
    <h3
      className={cn(
        "text-xl font-bold tracking-tight text-foreground mb-2 mt-6",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, className, ...props }) => (
    <h4
      className={cn(
        "text-lg font-bold tracking-tight text-foreground mb-2 mt-4",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  ),
  h5: ({ children, className, ...props }) => (
    <h5
      className={cn(
        "text-base font-bold tracking-tight text-foreground mb-2 mt-4",
        className
      )}
      {...props}
    >
      {children}
    </h5>
  ),
  h6: ({ children, className, ...props }) => (
    <h6
      className={cn(
        "text-sm font-bold tracking-tight text-foreground mb-2 mt-4",
        className
      )}
      {...props}
    >
      {children}
    </h6>
  ),
  p: ({ children, className, ...props }) => (
    <p
      className={cn("leading-relaxed text-foreground mb-4", className)}
      {...props}
    >
      {children}
    </p>
  ),
  ul: ({ children, className, ...props }) => (
    <ul
      className={cn("list-disc pl-6 mb-4", className)}
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, className, ...props }) => (
    <ol
      className={cn("list-decimal pl-6 mb-4", className)}
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, className, ...props }) => (
    <li
      className={cn("my-1 text-foreground", className)}
      {...props}
    >
      {children}
    </li>
  ),
  strong: ({ children, className, ...props }) => (
    <strong
      className={cn("font-semibold text-foreground", className)}
      {...props}
    >
      {children}
    </strong>
  ),
  em: ({ children, className, ...props }) => (
    <em
      className={cn("italic text-foreground", className)}
      {...props}
    >
      {children}
    </em>
  ),
  a: ({ href, children, className, ...props }) => (
    <a
      href={href}
      className={cn(
        "text-primary no-underline hover:underline",
        className
      )}
      {...props}
    >
      {children}
    </a>
  ),
  blockquote: ({ children, className, ...props }) => (
    <blockquote
      className={cn(
        "border-l-4 border-primary pl-4 italic text-muted-foreground my-4",
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, className, ...props }) => (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className
      )}
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, className, ...props }) => (
    <pre
      className={cn(
        "overflow-x-auto rounded-lg bg-muted p-4 my-4",
        className
      )}
      {...props}
    >
      {children}
    </pre>
  ),
  hr: ({ className, ...props }) => (
    <hr
      className={cn("my-4 border-t border-border", className)}
      {...props}
    />
  ),
};

export interface MarkdownProps extends React.ComponentProps<"div"> {
  content: string;
  components?: Partial<MarkdownComponents>;
}

function Markdown({ content, components, className, ...props }: MarkdownProps) {
  const mergedComponents = React.useMemo(
    () => ({
      ...defaultMarkdownComponents,
      ...components,
    }),
    [components]
  );

  return (
    <div className={cn("max-w-none", className)} {...props}>
      <ReactMarkdown components={mergedComponents}>{content}</ReactMarkdown>
    </div>
  );
}

export { Markdown, defaultMarkdownComponents };

