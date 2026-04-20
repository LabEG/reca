import styled from "@emotion/styled";

export const DocArticle = styled("article")`
    line-height: 1.8;
    color: #333;
    max-width: 820px;

    h1 {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 12px;
        color: #111;
    }

    h2 {
        font-size: 1.4rem;
        font-weight: 600;
        margin-top: 40px;
        margin-bottom: 12px;
        color: #222;
        padding-bottom: 8px;
        border-bottom: 1px solid #eee;
    }

    h3 {
        font-size: 1.15rem;
        font-weight: 600;
        margin-top: 28px;
        margin-bottom: 8px;
        color: #333;
    }

    p {
        margin-bottom: 16px;
    }

    code {
        background: #f4f4f8;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 0.88em;
        font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    }

    pre {
        background: #1e1e2e;
        color: #cdd6f4;
        padding: 20px 24px;
        border-radius: 8px;
        overflow-x: auto;
        margin-bottom: 24px;
        font-size: 0.88rem;
        line-height: 1.6;

        code {
            background: none;
            padding: 0;
            color: inherit;
            font-size: inherit;
        }

        .token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata {
            color: #6c7086;
            font-style: italic;
        }

        .token.punctuation {
            color: #bac2de;
        }

        .token.property,
        .token.tag,
        .token.boolean,
        .token.number,
        .token.constant,
        .token.symbol {
            color: #fab387;
        }

        .token.selector,
        .token.attr-name,
        .token.string,
        .token.char,
        .token.builtin {
            color: #a6e3a1;
        }

        .token.operator,
        .token.entity,
        .token.url,
        .language-css .token.string,
        .style .token.string {
            color: #89dceb;
        }

        .token.atrule,
        .token.attr-value,
        .token.keyword {
            color: #cba6f7;
        }

        .token.function,
        .token.class-name {
            color: #89b4fa;
        }

        .token.regex,
        .token.important,
        .token.variable {
            color: #f9e2af;
        }

        .token.important,
        .token.bold {
            font-weight: bold;
        }

        .token.italic {
            font-style: italic;
        }

        .token.generic-method .token.function {
            color: #89b4fa;
        }
    }

    ul, ol {
        margin-bottom: 16px;
        padding-left: 24px;
    }

    li {
        margin-bottom: 8px;
    }

    blockquote {
        border-left: 4px solid #1976d2;
        padding: 12px 20px;
        background: #f0f7ff;
        margin-bottom: 16px;
        border-radius: 0 8px 8px 0;

        p:last-child {
            margin-bottom: 0;
        }
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 24px;
        font-size: 0.9rem;
    }

    th, td {
        border: 1px solid #e0e0e0;
        padding: 10px 14px;
        text-align: left;
    }

    th {
        background: #f5f5f5;
        font-weight: 600;
    }

    strong {
        font-weight: 600;
    }
`;
