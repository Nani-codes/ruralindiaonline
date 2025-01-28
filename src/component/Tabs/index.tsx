import { useEffect, useRef, useState } from "react";

function Tabs({ tabs, active, tabColor }: any) {
  const [activeTab, setActiveTab] = useState(active);
  const [width, setWidth] = useState(tabs[0].id);
  const ref = useRef<any>({});
  const activeIndex = tabs.findIndex((tab: any) => tab.id === activeTab);
  let translateX = 0;
  for (let index = 0; index < activeIndex; index++) {
    const tabId = tabs[index]?.id;
    const element = ref.current?.[tabId];
    translateX += element?.offsetWidth;
  }

  const handleTabClick = (tabId: any) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    setActiveTab(active);
  }, [active]);

  useEffect(() => {
    setWidth(ref.current?.[activeTab]?.offsetWidth);
  }, [activeTab]);

  return (
    <div className="wrapper">
      <div className="tabs">
        {tabs.map((tab: any, i: number) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? "active" : ""}
            onClick={() => {
              setTimeout(() => {
                handleTabClick(tab.id);
              }, 100);
              tab?.onClick?.();
            }}
            ref={(el) => (ref.current[tab.id] = el)}
          >
            {tab.label}
          </button>
        ))}
        <div className="floating-background"
          style={{
            transform: `translateX(${translateX}px)`,
            width,
            backgroundColor: tabColor ?? undefined
          }}
        />
      </div>
      {/* <div className="tab-contents">
        {tabs.map((tab: any) => (
          <div
            key={tab.id}
            className={`tab-content ${activeTab === tab.id ? "active" : ""}`}
          >
            {tab.content}
          </div>
        ))}
      </div> */}

      <style jsx>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
        }
        .tabs {
          display: flex;
          position: relative;
          height: 40px;
          border-radius: 25px;
          background-color: var(--color-nav-bg);
          padding-left: 5px;
          padding-right: 5px;
        }

        button {
          background-color: transparent;
          border: none;
          padding: 9px 12px;
          font-size: 16px;
          color: var(--color-author);
          cursor: pointer;
          z-index: 1;
          transition: color 0.3s ease-in-out;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 160%;
          letter-spacing: -0.03em;
          gap: 8px;
        }

        button.active {
          color: #fff;
        }

        .floating-background {
          position: absolute;
          top: 5px;
          bottom: 5px;
          background-color: var(--color-primary-btn);
          transition: all 0.3s ease-in-out;
          z-index: 0;
          border-radius: 20px;
          height: 30px;
        }

        .tab-contents {
          position: relative;
          width: 100%;
        }

        .tab-content {
          opacity: 0;
          display: none;
          width: 100%;
          padding: 20px;
          transition: all 0.3s ease-in-out;
        }

        .tab-content.active {
          opacity: 1;
          display: block;
        }
      `}</style>
    </div>
  );
}

export default Tabs;
