import { createContext, useContext, ReactNode, useState } from 'react';

type layoutContextType = {
	mobileMode: Boolean;
	listenMaxWidth: Function;
};

const LayoutContext = createContext<layoutContextType>({
	mobileMode: false,
	listenMaxWidth: () => { },
});

export function useLayout() {
	return useContext(LayoutContext);
}

type Props = {
	children: ReactNode;
};

export function LayoutProvider({ children }: Props) {
	const [mobileMode, setMobileMode] = useState<Boolean>(false);
	const [urlPath, setUrlPath] = useState<String>('/home');
	const listenMaxWidth = (window: Window) => {
		if (window.matchMedia('(max-width: 800px)').matches) setMobileMode(true);
		else setMobileMode(false);
	};



	const value = {
		mobileMode,
		listenMaxWidth,
	};

	return (
		<LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
	);
}
