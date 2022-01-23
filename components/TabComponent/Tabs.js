import { useState } from 'react';
import styled from 'styled-components';

const TabsComponent = styled.section`
  grid-column: 1 / 13;
  background: ${(props) => props.theme.card};
  /* background-image: ${(props) => props.theme.backgroundGradientImage1}; */
  /* border-top: 2px solid ${(props) => props.theme.cardBorder}; */
  /* border-bottom: 2px solid ${(props) => props.theme.cardBorder}; */
  padding-bottom: 5rem;
  margin-bottom: 2rem;
  ul.nav {
    margin: 5rem auto 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    max-width: var(--maxWidth);
    padding: 1rem;
    button {
      position: relative;
      z-index: 2;
      min-width: 12rem;
      padding: 1rem 0rem;
      margin: 0 2rem;
      list-style: none;
      text-align: center;
      cursor: pointer;
      color: ${(props) => props.theme.textPrimary};
      font-size: var(--font-size-5);
      font-weight: var(--font-weight-5);
      background: none;
    }
    button::before {
      content: '';
      position: absolute;
      display: block;
      width: 100%;
      height: 0.4rem;
      border-radius: 50px;
      bottom: 0;
      left: 0;
      background-color: var(--grape-5);
      transform: scaleX(0);
      transition: transform 0.4s;
    }
    button:hover::before {
      transform: scaleX(0.5);
    }
    .active::before,
    .active:hover::before {
      transform: scaleX(1);
      background-color: var(--grape-5);
    }
  }
  /* &:before,
  &:after {
    content: '';
    position: absolute;
    z-index: 1;
    left: 0;
    pointer-events: none;
    width: 100%;
    height: 5em;
  }
  &:before {
    bottom: 100;
    background-image: linear-gradient(
      to top,
      ${(props) => props.theme.backgroundFade1},
      ${(props) => props.theme.body} 80%
    );
  }
  &:after {
    bottom: 100;
    background-image: linear-gradient(
      to bottom,
      ${(props) => props.theme.backgroundFade1},
      ${(props) => props.theme.body} 80%
    );
  } */
`;

const TabContent = styled.div`
  padding: 2rem 2rem 6rem;
  margin: 0 auto;
  max-width: var(--maxWidth);

  .tab-content {
    display: grid;
    grid-template-columns: 2fr 1.5fr;
    gap: 2rem;
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      h2 {
        font-size: calc(var(--font-size-7) * 2);
        font-weight: var(--font-weight-1);
        margin-bottom: 1rem;
        span {
          font-weight: var(--font-weight-7);
          background: ${(props) => props.theme.textGradient3};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      p {
        margin-top: 1rem;
        font-size: var(--font-size-6);
        font-weight: var(--font-weight-3);
      }
      &:first-child {
        padding-left: 2rem;
      }
      &:last-child {
        align-items: flex-end;
        padding: 3rem 4rem 0 0;
        svg {
          width: 70%;
          max-width: 400px;
          stroke-width: 0;
          fill: ${({ theme }) => theme.textPrimary};
        }
      }
    }
  }
`;

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState('tab-1');

  function handleTabs(e) {
    setActiveTab(e.target.id);
  }

  return (
    <TabsComponent className="Tabs">
      {/* Tab nav */}
      <ul className="nav">
        {children.map((child) => (
          <button
            key={`tab-${child.props.tab}`}
            id={`tab-${child.props.tab}`}
            type="button"
            className={activeTab === `tab-${child.props.tab}` ? 'active' : ''}
            onClick={(e) => handleTabs(e)}
          >
            {child.props.title}
          </button>
        ))}
      </ul>
      <TabContent>
        {children.map((child) => {
          if (`tab-${child.props.tab}` === activeTab) return child;
          return null;
        })}
      </TabContent>
    </TabsComponent>
  );
};
export default Tabs;
