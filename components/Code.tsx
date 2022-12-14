import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import styled from 'styled-components';

export const StyledCustomPre = styled.div`
  overflow: hidden;
  margin: 1.5em 0;

  .code-block__inner {
    display: flex;
    flex-direction: column;
    background: #121212;
    border: 1px solid #363636;
    border-radius: 4px;
    overflow: hidden;
  }

  .code-block__header {
    border-bottom: 1px solid #363636;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    padding: 6px 6px 6px 8px;
    font-size: 14px;
    color: var(--colors-white0);
    display: flex;
    justify-content: space-between;

    [class*='header-'] {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .code-block__filename {
      background-color: #363636;
      border-radius: 4px;
      border: 1px solid #1a1a1a;
    }
  }

  .code-block__header-text {
    font-weight: 700;
  }

  .code-block__content {
    max-height: 500px;
    overflow: auto;
  }

  code {
    --scrollbar-bg: #777;
  }

  @media screen and (max-width: 700px) {
    padding-left: 0 !important;
    padding-right: 0 !important;

    .code-block__inner {
      border-radius: 0;
      border-left: none;
      border-right: none;
    }
  }
`;

export function Code({
  content,
  language,
}: {
  children: string;
  content: string;
  language: string;
}) {
  return (
    <StyledCustomPre>
      <div className="code-block">
        <div className="code-block__inner">
          {/* <header className="code-block__header">
            <div className="header-start">
              <span className="code-block__header-text">
                {getDescriptiveLanguage(language)}
              </span>
            </div>
          </header> */}

          <main className="code-block__content">
            <CodeBlock {...{ language: language as Language }}>
              {content.trim()}
            </CodeBlock>
          </main>
        </div>
      </div>
    </StyledCustomPre>
  );
}

function CodeBlock({
  language,
  children,
}: {
  language: Language;
  children: string;
}) {
  return (
    <Highlight
      {...defaultProps}
      theme={undefined}
      code={children}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre
          className={['custom-scrollbar', className].filter(Boolean).join(' ')}
          style={style}
        >
          <LineNumbers className="line-numbers">
            <div className="line-numbers__container">
              {tokens.map((_, i) => (
                <span className="line-no">{i + 1}</span>
              ))}
            </div>
          </LineNumbers>
          <LineContent className="line-content">
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })} className="line">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </LineContent>
        </Pre>
      )}
    </Highlight>
  );
}

const Pre = styled.pre`
  display: flex;
  font: inherit;
  height: 100%;
`;

export const LineNumbers = styled.div`
  height: auto;
  display: flex;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;

  .line-numbers__container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    min-width: 38px;
    text-align: right;
    z-index: 1;
    padding: 16px 10px;
    min-height: 100%;
    user-select: none;
    letter-spacing: -1px;
    border-right: 1px solid #363636;
    background: #121212;
  }
`;

export const LineContent = styled.span`
  /* display: table; */
  position: relative;
  padding: 16px 10px 20px;
`;
