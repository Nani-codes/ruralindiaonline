import { useEffect, useRef, useState } from 'react';

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
		<div className='wrapper'>
			<div className='flex flex-row relative'>
				{tabs.map((tab: any, i: number) => (
					<button
						key={tab.id}
						className={`${
							activeTab === tab.id ? 'text-white' : 'text-gray-3'
						} px-4 py-2 font-medium text-sm transition duration-300 ease-in-out bg-transparent z-[1] text-[12px]`}
						onClick={() => {
							setTimeout(() => {
								handleTabClick(tab.id);
							}, 100);
							tab?.onClick?.();
						}}
						ref={(el) => (ref.current[tab.id] = el)}>
						{tab.label}
					</button>
				))}
				<div
					className='floating-background'
					style={{
						transform: `translateX(${translateX}px)`,
						width,
						backgroundColor: tabColor ?? undefined,
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
		</div>
	);
}

export default Tabs;
